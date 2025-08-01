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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, MapPin, CreditCard } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { userStore } from "@/lib/store";
import axios from "axios";

interface Address {
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

interface AddAddressForm {
  lineOne: string;
  lineTwo?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

const Checkout = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);

  const userAddresses = userStore((state) => state.user?.address);
  const cartId = userStore((state) => state?.user?.cart[0].id);

  useEffect(() => {
    if (userAddresses) {
      setAddresses(userAddresses);
    }
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

  const onSubmitNewAddress = (data: AddAddressForm) => {
    const newAddr: Address = {
      id: Date.now().toString(),
      ...data,
    };
    setAddresses((prev) => [...prev, newAddr]);
    checkoutForm.setValue("selectedAddress", newAddr.id);
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

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/orders`,
      data,
      { withCredentials: true }
    );

    console.log(res.data.data);
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
                <Form {...checkoutForm}>
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
                </Form>

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
                          >
                            Add Address
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
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-black text-white"
                  size="lg"
                  disabled={!checkoutForm.watch("selectedAddress")}
                  onClick={() => onPayNow()}
                >
                  Pay Now
                </Button>

                {!checkoutForm.watch("selectedAddress") && (
                  <p className="text-sm text-muted-foreground text-center">
                    Please select a shipping address to continue
                  </p>
                )}

                <div className="pt-4 space-y-2">
                  <div className="text-xs text-muted-foreground">
                    • Secure SSL encryption
                  </div>
                  <div className="text-xs text-muted-foreground">
                    • 30-day money-back guarantee
                  </div>
                  <div className="text-xs text-muted-foreground">
                    • Free returns on all orders
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
