"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Plus, MapPin, CreditCard, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useCartStore, userStore } from "@/lib/store";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
import AddressShimmer from "@/components/shimmer/Address_shimmer";
import OrderSummary from "@/components/OrderSummary";

export interface Address {
  id: string;
  lineOne: string;
  lineTwo?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

interface CheckoutForm {
  selectedAddress: string;
}

export interface AddAddressForm {
  lineOne: string;
  lineTwo?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

const Checkout = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const { orderDetails, clearPersistedData } = useCartStore();

  // const userAddresses = userStore((state) => state.user?.address);
  const cartId = userStore((state) => state?.user?.cart[0].id);
  const cartItems = userStore((state) => state.cartItems);

  const router = useRouter();

  // Validate checkout access
  useEffect(() => {
    // Check if user has cart items
    if (!cartItems || cartItems.length === 0) {
      toast.error("Your cart is empty. Please add items to proceed to checkout.");
      router.push("/cart");
      return;
    }

    // Set a flag in session storage to track valid checkout access
    sessionStorage.setItem("checkoutAccess", "true");
  }, [cartItems, router]);

  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js").then(
      (loaded) => {
        setScriptLoaded(!!loaded);
      }
    );
  }, []);

  const getAddresses = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/address`,
        {
          withCredentials: true,
        }
      );
      setAddresses(response.data.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getAddresses();
  }, []);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // main checkout form
  const checkoutForm = useForm<CheckoutForm>({
    defaultValues: {
      selectedAddress: "",
    },
  });

  const addAddressForm = useForm<AddAddressForm>({
    defaultValues: {
      lineOne: "",
      lineTwo: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    },
  });

  const onSubmitNewAddress = async (data: AddAddressForm) => {
    const newAddr: AddAddressForm = {
      lineOne: data.lineOne.trim(),
      lineTwo: data.lineTwo?.trim(),
      city: data.city.trim(),
      state: data.state.trim(),
      pincode: data.pincode.trim(),
      country: data.country.trim(),
    };
    console.log(newAddr);
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/address`,
        newAddr,
        { withCredentials: true }
      );
      setAddresses((prev) => [...prev, res?.data?.address]);
      console.log(res.data.address);
      toast.success(res?.data?.message || "Address added successfully");
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to add address");
      setIsLoading(false);
    }
    addAddressForm.reset();
    setIsDialogOpen(false);
  };

  const subtotal = 89.99;
  const shipping = 9.99;
  const tax = 7.2;
  const total = subtotal + shipping + tax;

  async function onPayNow() {
    const selectedId = checkoutForm.getValues("selectedAddress");
    const data = {
      cartId: cartId,
      addressId: selectedId,
    };

    if (!data.cartId || !data.addressId) {
      toast.error("Please select an address");
      return;
    }

    try {
      // 1️⃣ Create order on backend
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        data,
        { withCredentials: true }
      );

      const { razorpayOrder, key } = res.data.data;

      // 2️⃣ Initialize Razorpay payment
      const paymentObject = new (window as any).Razorpay({
        key, // use backend key
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        order_id: razorpayOrder.id, // from backend
        name: "NexaBuy",
        description: "Order Payment",
        handler: async function (response: any) {
          // 3️⃣ Verify payment on backend
          const verificationResponse = await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/orders/verify-payment`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            { withCredentials: true }
          );

          if (verificationResponse.data.success) {
            toast.success("Payment successful");
            clearPersistedData();
            // Set flag for valid placed page access
            sessionStorage.setItem("paymentSuccess", "true");
            sessionStorage.removeItem("checkoutAccess");
            router.push("/placed");
          } else {
            toast.error("Payment verification failed");
          }
        },
        theme: { color: "#3399cc" },
      });

      // 4️⃣ Open Razorpay modal
      paymentObject.open();
    } catch (error) {
      console.error(error);
      toast.error("Payment failed. Please try again.");
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
          <p className="text-muted-foreground mt-2">Complete your order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isFetching ? (
                  <AddressShimmer />
                ) : (
                  <Form {...checkoutForm}>
                    {addresses && addresses.length > 0 ? (
                      <form className="space-y-4">
                        <FormField
                          control={checkoutForm.control}
                          name="selectedAddress"
                          rules={{ required: true }}
                          render={({ field }) => (
                            <RadioGroup
                              value={field.value}
                              onValueChange={field.onChange}
                              className="space-y-3"
                            >
                              {addresses.map((address) => (
                                <div
                                  key={address.id}
                                  className="flex items-start space-x-3"
                                >
                                  <RadioGroupItem
                                    value={address.id}
                                    id={address.id}
                                    className="mt-1"
                                  />
                                  <Label
                                    htmlFor={address.id}
                                    className="flex-1 cursor-pointer"
                                  >
                                    <div className="p-4 border rounded-lg hover:bg-accent transition-colors">
                                      <div className="font-medium flex items-center gap-2">
                                        {address.lineOne}
                                        {/* {address.isDefault && (
                                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                                        Default
                                      </span>
                                    )} */}
                                      </div>
                                      <div className="text-sm text-muted-foreground mt-1">
                                        {address.lineTwo}
                                        <br />
                                        {address.city}, {address.state}{" "}
                                        {address.pincode}
                                        <br />
                                        {address.country}
                                      </div>
                                    </div>
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          )}
                        />
                      </form>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">No address found</p>
                        <p className="text-sm">
                          Please add an address to continue with checkout
                        </p>
                      </div>
                    )}
                  </Form>
                )}

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full bg-black text-white mt-4"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Address
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md bg-white">
                    <DialogHeader>
                      <DialogTitle>Add New Address</DialogTitle>
                    </DialogHeader>
                    <Form {...addAddressForm}>
                      <form
                        onSubmit={addAddressForm.handleSubmit(
                          onSubmitNewAddress
                        )}
                        className="space-y-4 bg-white text-black p-5"
                      >
                        <FormField
                          control={addAddressForm.control}
                          name="lineOne"
                          rules={{ required: "Required" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Line one</FormLabel>
                              <FormControl>
                                <Input placeholder="Home / Office" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={addAddressForm.control}
                          name="lineTwo"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Line two <span>(optional)</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="123 Main Street"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={addAddressForm.control}
                            name="city"
                            rules={{ required: "Required" }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input placeholder="City" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={addAddressForm.control}
                            name="state"
                            rules={{ required: "Required" }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                  <Input placeholder="State" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={addAddressForm.control}
                            name="pincode"
                            rules={{ required: "Required" }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>ZIP Code</FormLabel>
                                <FormControl>
                                  <Input placeholder="10001" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={addAddressForm.control}
                            name="country"
                            rules={{ required: "Required" }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                  <Input placeholder="country" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex gap-2 pt-4 items-center mt-4">
                          <Button
                            type="submit"
                            className="flex-1 bg-black text-white "
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <Loader2 className="animate-spin" />
                            ) : (
                              "Add Address"
                            )}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <OrderSummary
            cartItems={orderDetails?.cartItems!}
            originalTotal={orderDetails?.originalTotal!}
            discount={orderDetails?.discount}
            deliveryCharges={orderDetails?.deliveryCharges}
            total={orderDetails?.total || 0}
            btnName="Pay now"
            onPayNow={onPayNow}
            isDisabled={
              !checkoutForm.watch("selectedAddress") ||
              (addresses.length === 0 && !scriptLoaded)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
