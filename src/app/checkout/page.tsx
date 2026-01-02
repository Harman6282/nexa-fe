"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import {
  Plus,
  MapPin,
  Loader2,
  CheckCircle2,
  Lock,
  Clock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useCartStore, userStore } from "@/lib/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AddressShimmer from "@/components/shimmer/Address_shimmer";
import OrderSummary from "@/components/OrderSummary";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

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

const Checkout = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const { orderDetails, clearPersistedData } = useCartStore();

  const cartId = userStore((state) => state?.user?.cart?.[0]?.id);
  const cartItems = userStore((state) => state.cartItems);
  const { user } = userStore();

  const router = useRouter();

  // Validate checkout access
  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      toast.error(
        "Your cart is empty. Please add items to proceed to checkout."
      );
      router.push("/cart");
      return;
    }
    sessionStorage.setItem("checkoutAccess", "true");
  }, [cartItems, router]);

  const RazorpayLoadScript = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }
    setScriptLoaded(true);
  };

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
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/address`,
        newAddr,
        { withCredentials: true }
      );
      setAddresses((prev) => [...prev, res?.data?.address]);
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

  async function onPayNow() {
    RazorpayLoadScript();
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
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        data,
        { withCredentials: true }
      );

      console.log(res.data);

      const { razorpayOrder, key } = res.data.data;
      const paymentObject = new (window as any).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        order_id: razorpayOrder.id,
        name: "Nexa Fashion",
        description: "Order Payment",
        handler: async function (response: any) {
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
            sessionStorage.setItem("paymentSuccess", "true");
            sessionStorage.removeItem("checkoutAccess");
            router.push("/placed");
          } else {
            toast.error("Payment verification failed");
          }
        },
        theme: { color: "#493628" },
      });

      paymentObject.open();
    } catch (error) {
      console.error(error);
      toast.error("Payment failed. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-light">
      {/* Checkout Header */}
      <header className="sticky top-0 z-50 w-full bg-surface-light/95 backdrop-blur-md border-b border-[#D6C0B3] px-4 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-text-main">
            <div className="size-8 text-primary">
              <svg
                className="w-full h-full"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z"
                  fill="currentColor"
                />
                <path
                  clipRule="evenodd"
                  d="M39.998 12.236C39.9944 12.2537 39.9875 12.2845 39.9748 12.3294C39.9436 12.4399 39.8949 12.5741 39.8346 12.7175C39.8168 12.7597 39.7989 12.8007 39.7813 12.8398C38.5103 13.7113 35.9788 14.9393 33.7095 15.4811C30.9875 16.131 27.6413 16.5217 24 16.5217C20.3587 16.5217 17.0125 16.131 14.2905 15.4811C12.0012 14.9346 9.44505 13.6897 8.18538 12.8168C8.17384 12.7925 8.16216 12.767 8.15052 12.7408C8.09919 12.6249 8.05721 12.5114 8.02977 12.411C8.00356 12.3152 8.00039 12.2667 8.00004 12.2612C8.00004 12.261 8 12.2607 8.00004 12.2612C8.00004 12.2359 8.0104 11.9233 8.68485 11.3686C9.34546 10.8254 10.4222 10.2469 11.9291 9.72276C14.9242 8.68098 19.1919 8 24 8C28.8081 8 33.0758 8.68098 36.0709 9.72276C37.5778 10.2469 38.6545 10.8254 39.3151 11.3686C39.9006 11.8501 39.9857 12.1489 39.998 12.236ZM4.95178 15.2312L21.4543 41.6973C22.6288 43.5809 25.3712 43.5809 26.5457 41.6973L43.0534 15.223C43.0709 15.1948 43.0878 15.1662 43.104 15.1371L41.3563 14.1648C43.104 15.1371 43.1038 15.1374 43.104 15.1371L43.1051 15.135L43.1065 15.1325L43.1101 15.1261L43.1199 15.1082C43.1276 15.094 43.1377 15.0754 43.1497 15.0527C43.1738 15.0075 43.2062 14.9455 43.244 14.8701C43.319 14.7208 43.4196 14.511 43.5217 14.2683C43.6901 13.8679 44 13.0689 44 12.2609C44 10.5573 43.003 9.22254 41.8558 8.2791C40.6947 7.32427 39.1354 6.55361 37.385 5.94477C33.8654 4.72057 29.133 4 24 4C18.867 4 14.1346 4.72057 10.615 5.94478C8.86463 6.55361 7.30529 7.32428 6.14419 8.27911C4.99695 9.22255 3.99999 10.5573 3.99999 12.2609C3.99999 13.1275 4.29264 13.9078 4.49321 14.3607C4.60375 14.6102 4.71348 14.8196 4.79687 14.9689C4.83898 15.0444 4.87547 15.1065 4.9035 15.1529C4.91754 15.1762 4.92954 15.1957 4.93916 15.2111L4.94662 15.223L4.95178 15.2312ZM35.9868 18.996L24 38.22L12.0131 18.996C12.4661 19.1391 12.9179 19.2658 13.3617 19.3718C16.4281 20.1039 20.0901 20.5217 24 20.5217C27.9099 20.5217 31.5719 20.1039 34.6383 19.3718C35.082 19.2658 35.5339 19.1391 35.9868 18.996Z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-text-main">
              Nexa Fashion
            </h2>
          </Link>
          <div className="flex items-center gap-2 text-primary bg-surface-light px-3 py-1.5 rounded-full border border-primary/20">
            <Lock className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Secure Checkout
            </span>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-7xl mx-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
        {/* Left Column - Addresses */}
        <div className="lg:col-span-7 flex flex-col gap-6 pb-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm font-medium pt-2">
            <Link
              href="/cart"
              className="text-primary hover:text-primary-dark transition-colors flex items-center gap-1"
            >
              <CheckCircle2 className="h-4 w-4" />
              Cart
            </Link>
            <span className="text-text-secondary">/</span>
            <span className="text-text-main flex items-center gap-1">
              <span className="size-6 rounded-full bg-primary text-white flex items-center justify-center text-xs shadow-md">
                {cartItems?.length || 0}
              </span>
              Checkout
            </span>
            <span className="text-text-secondary">/</span>
            <span className="text-text-secondary">Confirmation</span>
          </nav>

          <h1 className="text-2xl lg:text-3xl font-bold text-text-main tracking-tight">
            Checkout
          </h1>

          {/* Contact Information */}
          <section className="bg-surface-light rounded-xl border border-[#D6C0B3]/20 p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold flex items-center gap-2 text-primary">
                <MapPin className="h-5 w-5" />
                Contact Information
              </h2>
              {!user && (
                <Link
                  href="/login"
                  className="text-sm font-medium text-primary hover:underline decoration-2 underline-offset-2"
                >
                  Log in
                </Link>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <label className="flex flex-col w-full">
                <span className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                  Email address
                </span>
                <Input
                  type="email"
                  placeholder="user@example.com"
                  defaultValue={user?.email || ""}
                  className="w-full rounded-lg bg-background-light border-[#D6C0B3]/20 text-text-main h-11 px-4 focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-text-secondary/50"
                />
              </label>
              <label className="flex items-center gap-3 cursor-pointer group mt-1">
                <input
                  type="checkbox"
                  className="size-4 rounded text-primary bg-background-light border-[#D6C0B3]/20 focus:ring-offset-0 focus:ring-primary"
                />
                <span className="text-sm text-text-secondary group-hover:text-text-main transition-colors">
                  Email me with news and offers
                </span>
              </label>
            </div>
          </section>

          {/* Shipping Address */}
          <section className="bg-surface-light rounded-xl border border-[#D6C0B3]/20 p-5 shadow-sm">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4 text-primary">
              <MapPin className="h-5 w-5" />
              Shipping Address
            </h2>

            {isFetching ? (
              <AddressShimmer />
            ) : (
              <Form {...checkoutForm}>
                {addresses && addresses.length > 0 ? (
                  <form className="space-y-3">
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
                            <label
                              key={address.id}
                              className={`relative flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                field.value === address.id
                                  ? "border-primary bg-background-light"
                                  : "border-[#D6C0B3]/20 hover:border-primary/50"
                              }`}
                            >
                              <RadioGroupItem
                                value={address.id}
                                id={address.id}
                                className="mt-0.5 mr-4"
                              />
                              <div className="flex-1">
                                <div className="font-bold text-text-main mb-1">
                                  {address.lineOne}
                                </div>
                                <div className="text-sm text-text-secondary">
                                  {address.lineTwo && (
                                    <>
                                      {address.lineTwo}
                                      <br />
                                    </>
                                  )}
                                  {address.city}, {address.state}{" "}
                                  {address.pincode}
                                  <br />
                                  {address.country}
                                </div>
                              </div>
                            </label>
                          ))}
                        </RadioGroup>
                      )}
                    />
                  </form>
                ) : (
                  <div className="text-center py-8 text-text-muted">
                    <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No address found</p>
                    <p className="text-sm">
                      Please add an address to continue with checkout
                    </p>
                  </div>
                )}
              </Form>
            )}

            {/* Add New Address Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full mt-4 h-12 rounded-lg border-2 border-[#D6C0B3]/30 text-text-main font-bold hover:border-primary hover:bg-background-light transition-all"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Address
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-white">
                <DialogHeader>
                  <DialogTitle className="text-text-main">
                    Add New Address
                  </DialogTitle>
                </DialogHeader>
                <Form {...addAddressForm}>
                  <form
                    onSubmit={addAddressForm.handleSubmit(onSubmitNewAddress)}
                    className="space-y-4"
                  >
                    <FormField
                      control={addAddressForm.control}
                      name="lineOne"
                      rules={{ required: "Required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                            Address Line 1
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="123 Fashion St"
                              className="rounded-lg bg-background-light border-[#D6C0B3]/20 text-text-main h-11 px-4 focus:ring-2 focus:ring-primary focus:border-transparent"
                              {...field}
                            />
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
                          <FormLabel className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                            Apartment, suite, etc. (optional)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Apt 4B"
                              className="rounded-lg bg-background-light border-[#D6C0B3]/20 text-text-main h-11 px-4 focus:ring-2 focus:ring-primary focus:border-transparent"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <FormField
                        control={addAddressForm.control}
                        name="city"
                        rules={{ required: "Required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                              City
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="City"
                                className="rounded-lg bg-background-light border-[#D6C0B3]/20 text-text-main h-11 px-4 focus:ring-2 focus:ring-primary focus:border-transparent"
                                {...field}
                              />
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
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                              State
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="State"
                                className="rounded-lg bg-background-light border-[#D6C0B3]/20 text-text-main h-11 px-4 focus:ring-2 focus:ring-primary focus:border-transparent"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <FormField
                        control={addAddressForm.control}
                        name="pincode"
                        rules={{ required: "Required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                              ZIP Code
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="10001"
                                className="rounded-lg bg-background-light border-[#D6C0B3]/20 text-text-main h-11 px-4 focus:ring-2 focus:ring-primary focus:border-transparent"
                                {...field}
                              />
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
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                              Country
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Country"
                                className="rounded-lg bg-background-light border-[#D6C0B3]/20 text-text-main h-11 px-4 focus:ring-2 focus:ring-primary focus:border-transparent"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button
                        type="submit"
                        className="flex-1 h-12 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 transition-all"
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
                        className="h-12 rounded-lg border-[#D6C0B3]/30"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </section>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-5 relative">
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
      </main>

      {/* Footer */}
      <footer className="mt-8 py-6 border-t border-[#D6C0B3]/20 bg-surface-light">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm font-medium text-text-secondary">
          <p>© 2024 Nexa Fashion. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-3 text-xs uppercase tracking-wide">
            <Link
              href="#"
              className="hover:text-primary transition-colors"
            >
              Refund Policy
            </Link>
            <Link
              href="#"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Checkout;
