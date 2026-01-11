import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartItems } from "@/lib/store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { ShieldCheck, ArrowRight, Lock } from "lucide-react";

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
  };

  const subtotal = originalTotal - (discount || 0);
  const tax = subtotal * 0.1; // 10% tax estimate
  const finalTotal = total || subtotal + (deliveryCharges || 0) + tax;

  return (
    <div className="sticky top-24 bg-surface-light rounded-xl border border-[#D6C0B3]/20 shadow-xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-[#D6C0B3]/20 bg-background-light/30">
        <h2 className="text-lg font-bold text-primary">Order Summary</h2>
        <p className="text-xs font-medium text-text-secondary mt-0.5">
          Check your items before paying
        </p>
      </div>

      {/* Cart Items List */}
      <div className="p-5 max-h-[400px] overflow-y-auto flex flex-col gap-4">
        {cartItems?.map((item: any, index: number) => {
          const itemPrice = item.product.price;
          const itemDiscount = item.product.discount || 0;
          const discountedPrice =
            itemDiscount > 0
              ? itemPrice * (1 - itemDiscount / 100)
              : itemPrice;

          return (
            <div key={item.id || index} className="flex gap-4 group">
              <div className="relative size-16 rounded-lg overflow-hidden bg-white/30 border border-[#D6C0B3]/20 flex-shrink-0 group-hover:border-primary transition-colors">
                <Image
                  src={item.product.images?.[0]?.url || "/card1.jpg"}
                  alt={item.product.name || "Product"}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
                <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-bl-lg">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1 flex flex-col justify-center min-w-0">
                <h3 className="text-sm font-bold text-text-main line-clamp-1">
                  {item.product.name || "Product"}
                </h3>
                <p className="text-xs text-text-secondary mt-0.5">
                  Size: {item.variant?.size || "N/A"} • Color:{" "}
                  {item.variant?.color || "N/A"}
                </p>
              </div>
              <div className="flex flex-col justify-center items-end">
                <p className="text-sm font-bold text-text-main">
                  ₹{(discountedPrice * item.quantity).toFixed(2)}
                </p>
                {itemDiscount > 0 && (
                  <p className="text-xs text-text-secondary/50 line-through">
                    ₹{(itemPrice * item.quantity).toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Discount Code */}
      <div className="px-5 py-3 bg-background-light/50 border-y border-[#D6C0B3]/20">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Gift card or discount code"
            className="flex-1 rounded-lg bg-surface-light border-[#D6C0B3]/20 text-text-main h-10 px-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-text-secondary/50"
          />
          <Button
            className="px-4 h-10 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all disabled:opacity-50 shadow-sm"
            disabled
          >
            Apply
          </Button>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="p-5 flex flex-col gap-2.5">
        <div className="flex justify-between text-sm text-text-secondary">
          <span>Subtotal</span>
          <span className="font-bold text-text-main">
            ₹{subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-sm text-text-secondary">
          <span>Shipping</span>
          <span className="font-bold text-text-main">
            {deliveryCharges === 0 ? "Free" : `₹${deliveryCharges?.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-sm text-text-secondary">
          <span>Taxes (Estimated)</span>
          <span className="font-bold text-text-main">₹{tax.toFixed(2)}</span>
        </div>
        <div className="h-px bg-[#D6C0B3]/20 my-2 opacity-50" />
        <div className="flex justify-between items-end">
          <span className="text-base font-bold text-text-main">Total</span>
          <div className="flex items-end gap-2">
            <span className="text-xs font-bold text-text-secondary mb-1">
              INR
            </span>
            <span className="text-2xl font-bold text-primary tracking-tight">
              ₹{finalTotal.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Pay Button */}
        {btnName === "Checkout" ? (
          <Link href="/checkout" onClick={handleCheckoutClick}>
            <Button
              className="mt-4 w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold text-lg shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 group"
              disabled={!cartItems || cartItems.length === 0}
            >
              {btnName}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        ) : (
          <Button
            className="mt-4 w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold text-lg shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 group"
            onClick={onPayNow}
            disabled={isDisabled}
          >
            Pay ₹{finalTotal.toFixed(2)}
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        )}

        {/* Security Badges */}
        <div className="mt-4 flex justify-center gap-4 text-text-secondary">
          <div className="flex flex-col items-center gap-1">
            <Lock className="h-5 w-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Encrypted
            </span>
          </div>
          <div className="w-px h-8 bg-[#D6C0B3]/20 opacity-50" />
          <div className="flex flex-col items-center gap-1">
            <ShieldCheck className="h-5 w-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Trusted
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
