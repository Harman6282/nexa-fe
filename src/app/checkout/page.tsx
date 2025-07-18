import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

export default function page() {
  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* Left Side - Shipping Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">Checkout</h1>
          <h2 className="text-lg font-semibold mb-2">Shipping Information</h2>
          <RadioGroup defaultValue="delivery" className="flex space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="delivery" id="delivery" />
              <Label htmlFor="delivery">Delivery</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pickup" id="pickup" />
              <Label htmlFor="pickup">Pick up</Label>
            </div>
          </RadioGroup>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="name">Full name *</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div>
              <Label htmlFor="email">Email address *</Label>
              <Input id="email" placeholder="Enter your email" />
            </div>
            <div>
              <Label htmlFor="phone">Phone number *</Label>
              <Input id="phone" placeholder="Enter your phone number" />
            </div>
            <div>
              <Label htmlFor="country">Country *</Label>
              <Select>
                <SelectTrigger id="country">Choose country</SelectTrigger>
                <SelectContent>
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="usa">USA</SelectItem>
                  <SelectItem value="uk">UK</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Enter city" />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input id="state" placeholder="Enter state" />
              </div>
              <div>
                <Label htmlFor="zip">ZIP Code</Label>
                <Input id="zip" placeholder="Enter ZIP code" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">I have read and agree to the Terms and Conditions.</Label>
            </div>
          </div>
        </div>

        {/* Right Side - Order Summary */}
        <Card className="bg-gray-100 border border-gray-300 rounded-xl p-6">
          <CardContent>
            <h2 className="text-lg font-semibold mb-4">Review your cart</h2>
            <div className="flex justify-between mb-2">
              <span>DuoComfort Sofa Premium</span>
              <span>$20.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>IronOne Desk</span>
              <span>$25.00</span>
            </div>
            <div className="flex items-center mt-4 mb-4">
              <Input placeholder="Discount code" className="mr-2" />
              <Button className="bg-black text-white hover:bg-gray-800">Apply</Button>
            </div>
            <Separator className="mb-4" />
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$45.00</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$5.00</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>-$10.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total</span>
              <span>$40.00</span>
            </div>
            <Button className="w-full mt-4 bg-black text-white hover:bg-gray-800">Pay Now</Button>
            <div className="flex items-center space-x-2 text-sm text-gray-600 mt-4">
              <span>🔒</span>
              <span>Secure Checkout - SSL Encrypted</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
