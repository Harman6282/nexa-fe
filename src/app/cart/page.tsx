"use client";
import React, { useEffect, useRef } from "react";
import {
  Minus,
  Plus,
  X,
  ShoppingBag,
  ArrowLeft,
  Heart,
  Truck,
  Trash2,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  CartItems,
  useCartStore,
  userStore,
} from "@/lib/store";
import axios from "axios";
import Image from "next/image";
import { toast } from "sonner";
import CartShimmer from "@/components/shimmer/Cart_shimmer";
import OrderSummary from "@/components/OrderSummary";
import { useRouter } from "next/navigation";

export default function Cart() {
  const cartItems = userStore((state) => state.cartItems);
  const router = useRouter();
  const {
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    setCartItems,
  } = userStore();
  const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { setOrderDetails } = useCartStore();

  const originalTotal =
    cartItems?.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    ) ?? 0;

  const discount =
    cartItems?.reduce((sum, item) => {
      const price = item.product.price ?? 0;
      const discountPercent = item.product.discount ?? 0;
      const discountAmount = (price * discountPercent) / 100;
      return sum + discountAmount * item.quantity;
    }, 0) ?? 0;

  const subtotal = originalTotal - discount;

  const deliveryCharges = subtotal > 500 ? 0 : 60;

  const total = subtotal + deliveryCharges;

  const getCart = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
        withCredentials: true,
      });
      setCartItems(res.data.data.items);
    } catch (_error) {
      // Optionally show a toast: toast.error("Failed to load cart");
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const orderDetails = {
    cartItems,
    originalTotal: originalTotal ?? 0,
    discount,
    deliveryCharges,
    total,
  };

  useEffect(() => {
    if (
      cartItems?.length &&
      originalTotal !== null &&
      discount !== null &&
      deliveryCharges !== null &&
      total !== null
    ) {
      setOrderDetails(orderDetails);
    }
  }, [
    cartItems,
    originalTotal,
    discount,
    deliveryCharges,
    total,
    setOrderDetails,
  ]);

  async function removeItem(id: string) {
    removeFromCart(id);
    toast.success("Item removed");

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/delete/${id}`,
        {
          withCredentials: true,
        }
      );
    } catch (_error) {
      // Optionally show a toast: toast.error("Failed to remove item");
    }
  }

  function increaseItemQty(itemId: string, qty: number, variantId: string) {
    const previousQty = qty;
    const newQty = qty + 1;
    increaseQuantity(itemId, newQty);
    let data = {
      quantity: newQty,
      variantId,
    };
    if (timeRef.current) clearTimeout(timeRef.current);
    timeRef.current = setTimeout(async () => {
      try {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/cart/update/${itemId}`,
          data,
          {
            withCredentials: true,
          }
        );
      } catch (_error) {
        increaseQuantity(itemId, previousQty);
      }
    }, 1300);
  }

  function decreaseItemQty(itemId: string, qty: number, variantId: string) {
    const previousQty = qty;
    const newQty = qty - 1;
    decreaseQuantity(itemId, newQty);
    let data = {
      quantity: newQty,
      variantId,
    };
    if (timeRef.current) clearTimeout(timeRef.current);
    timeRef.current = setTimeout(async () => {
      try {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/cart/update/${itemId}`,
          data,
          {
            withCredentials: true,
          }
        );
        console.log(res.data);
      } catch (_error) {
        increaseQuantity(itemId, previousQty);
      }
    }, 1300);
  }

  if (cartItems === null || cartItems === undefined) {
    return <CartShimmer />;
  }

  if (cartItems?.length === 0) {
    return (
      <main className="flex-1 bg-background-light min-h-screen">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex mb-6">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link
                  href="/"
                  className="inline-flex items-center text-sm font-medium text-text-secondary hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <ChevronRight className="text-text-secondary text-sm mx-1 h-4 w-4" />
                  <span className="text-sm font-bold text-text-main">
                    Shopping Cart
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="flex flex-col items-center justify-center py-16 md:py-24">
            <div className="size-24 md:size-32 bg-[#E4E0E1] rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-12 h-12 md:w-16 md:h-16 text-text-muted" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-text-main mb-3">
              Your bag is empty
            </h2>
            <p className="text-text-muted mb-8 text-center max-w-md">
              Add items to your cart to continue shopping.
            </p>
            <Button
              asChild
              className="h-12 px-8 rounded-lg bg-text-main text-white font-bold hover:bg-accent transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Link href="/products">Shop Now</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const handleAddToWishlist = async (id: string) => {
    if (id) {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/wishlist`,
          {
            productId: id,
          },
          {
            withCredentials: true,
          }
        );
        toast.success(res?.data?.message || "Added to wishlist");
      } catch (error) {
        toast.error("Something went wrong, try again");
      }
    }
  };

  return cartItems ? (
    <main className="flex-1 bg-background-light min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex mb-6">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <Link
                href="/"
                className="inline-flex items-center text-sm font-medium text-text-secondary hover:text-primary transition-colors"
              >
                Home
              </Link>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRight className="text-text-secondary text-sm mx-1 h-4 w-4" />
                <span className="text-sm font-bold text-text-main">
                  Shopping Cart
                </span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-text-main uppercase">
              Shopping Bag
            </h1>
            <p className="text-text-muted text-sm mt-2 font-medium">
              {cartItems?.length} {cartItems?.length === 1 ? "item" : "items"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-[#D6C0B3]/20">
              <div className="p-6 md:p-8">
                <div className="flex items-center text-sm text-text-muted mb-6 pb-4 border-b border-[#D6C0B3]/20">
                  <Truck className="w-4 h-4 mr-2 text-accent" />
                  <span>Get it by </span>
                  <span className="font-bold text-text-main ml-1">
                    Mon, Jan 29
                  </span>
                </div>

                <div className="space-y-6">
                  {cartItems.map((item: any, index) => {
                    const itemPrice = item.product.price;
                    const itemDiscount = item.product.discount || 0;
                    const discountedPrice =
                      itemDiscount > 0
                        ? itemPrice * (1 - itemDiscount / 100)
                        : itemPrice;

                    return (
                      <div
                        key={item.product.id + index}
                        className="flex gap-4 pb-6 border-b border-[#D6C0B3]/20 last:border-b-0 last:pb-0"
                      >
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="w-24 h-32 md:w-28 md:h-36 bg-[#E4E0E1] rounded-lg overflow-hidden flex-shrink-0 group"
                        >
                          <Image
                            width={112}
                            height={144}
                            src={item.product.images[0]?.url || "/card1.jpg"}
                            alt={item.product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </Link>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1 min-w-0 pr-4">
                              <Link
                                href={`/products/${item.product.slug}`}
                                className="block"
                              >
                                <h3 className="font-bold text-text-main mb-1 hover:text-accent transition-colors line-clamp-1">
                                  {item.product.brand}
                                </h3>
                                <p className="text-sm text-text-muted mb-2 line-clamp-2">
                                  {item.product.name}
                                </p>
                                <p className="text-xs text-text-muted">
                                  Size: {item.variant.size}
                                </p>
                              </Link>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="flex-shrink-0 size-8 rounded-lg hover:bg-[#E4E0E1] text-text-main transition-all flex items-center justify-center"
                              aria-label="Remove item"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-baseline gap-2">
                              {itemDiscount > 0 ? (
                                <>
                                  <span className="text-lg font-black text-[#D9534F]">
                                    ${(discountedPrice * item.quantity).toFixed(2)}
                                  </span>
                                  <span className="text-sm text-text-muted/50 line-through">
                                    ${(itemPrice * item.quantity).toFixed(2)}
                                  </span>
                                </>
                              ) : (
                                <span className="text-lg font-black text-text-main">
                                  ${(itemPrice * item.quantity).toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center border-2 border-[#D6C0B3]/30 rounded-lg">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  decreaseItemQty(
                                    item.id,
                                    item.quantity,
                                    item.variantId
                                  );
                                }}
                                className="size-8 rounded-l-lg rounded-r-none hover:bg-[#E4E0E1] disabled:opacity-50"
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="px-4 py-2 font-bold text-text-main min-w-[3rem] text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  increaseItemQty(
                                    item.id,
                                    item.quantity,
                                    item.variantId
                                  )
                                }
                                disabled={item.quantity === item.variant.stock}
                                className="size-8 rounded-r-lg rounded-l-none hover:bg-[#E4E0E1] disabled:opacity-50"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-2 text-xs font-semibold border-[#D6C0B3]/30 hover:border-accent hover:bg-[#E4E0E1]"
                                onClick={() => handleAddToWishlist(item.product.id)}
                              >
                                <Heart className="w-4 h-4" />
                                <span className="hidden sm:inline">Wishlist</span>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-2 text-xs font-semibold border-[#D6C0B3]/30 hover:border-red-500 hover:bg-red-50 hover:text-red-600"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                                <span className="hidden sm:inline">Remove</span>
                              </Button>
                            </div>
                          </div>

                          {!item.variant.stock && (
                            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                              <p className="text-sm text-red-600 font-semibold">
                                Out of Stock! This item is currently unavailable.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <OrderSummary
            cartItems={cartItems}
            originalTotal={originalTotal!}
            discount={discount}
            deliveryCharges={deliveryCharges}
            total={total}
            btnName="Checkout"
          />
        </div>
      </div>
    </main>
  ) : (
    <CartShimmer />
  );
}
