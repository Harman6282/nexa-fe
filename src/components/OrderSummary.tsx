import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { CartItems } from "@/lib/store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const OrderSummary = ({
  cartItems,
  originalTotal,
  discount,
  deliveryCharges,
  total,
  btnName,
  onPayNow,
  isDisabled = false,
}: {
  cartItems: CartItems[];
  originalTotal: number;
  discount?: number;
  deliveryCharges?: number;
  total: number;
  btnName: string;
  onPayNow?: () => void;
  isDisabled?: boolean;
}) => {
  const router = useRouter();

  const handleCheckoutClick = (e: React.MouseEvent) => {
    if (!cartItems || cartItems.length === 0) {
      e.preventDefault();
      toast.error(
        "Your cart is empty. Please add items to proceed to checkout."
      );
      return;
    }
    // Allow navigation to proceed
  };
  return (
    <>
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
          <h2 className="text-lg font-semibold mb-4">
            {btnName !== "checkout" ? "Subtotal" : "Order Summary"} (
            {cartItems?.length} items)
          </h2>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span>Total MRP</span>
              <span>₹{originalTotal!}</span>
            </div>
            <div className="flex justify-between">
              <span>Convenience Fee</span>
              <span className="text-green-600">FREE</span>
            </div>
            {btnName === "Checkout" ? (
              ""
            ) : (
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className={deliveryCharges === 0 ? "text-green-600" : ""}>
                  {deliveryCharges === 0 ? "FREE" : `₹${deliveryCharges}`}
                </span>
              </div>
            )}
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total Amount</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>

          {btnName === "Checkout" ? (
            <Link href="/checkout" onClick={handleCheckoutClick}>
              <Button
                className="w-full cursor-pointer py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors mb-4"
                disabled={!cartItems || cartItems.length === 0}
              >
                {btnName}
              </Button>
            </Link>
          ) : (
            <Button
              className="w-full cursor-pointer py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors mb-4"
              onClick={onPayNow}
              disabled={isDisabled}
            >
              {btnName}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
