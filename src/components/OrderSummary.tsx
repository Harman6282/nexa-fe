import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { CartItems } from "@/lib/store";

const OrderSummary = ({
  cartItems,
  originalTotal,
  discount,
  deliveryCharges,
  total,
  btnName,
}: {
  cartItems: CartItems[];
  originalTotal: number;
  discount: number;
  deliveryCharges: number;
  total: number;
  btnName: string;
}) => {
  return (
    <>
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
          <h2 className="text-lg font-semibold mb-4">
            Price Details ({cartItems.length} items)
          </h2>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span>Total MRP</span>
              <span>₹{originalTotal!.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount on MRP</span>
              <span>-₹{discount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Convenience Fee</span>
              <span className="text-green-600">FREE</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span className={deliveryCharges === 0 ? "text-green-600" : ""}>
                {deliveryCharges === 0 ? "FREE" : `₹${deliveryCharges}`}
              </span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total Amount</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>

          <Link href="/checkout">
            <Button className="w-full cursor-pointer bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors mb-4">
              {btnName}
            </Button>
          </Link>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              You will save ₹{discount.toLocaleString()} on this order
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
