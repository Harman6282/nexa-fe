"use client";
import React, { useEffect, useState } from "react";
import {
  Minus,
  Plus,
  X,
  ShoppingBag,
  ArrowLeft,
  Heart,
  Truck,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProductSchema, useProductStore, userStore } from "@/lib/store";
import axios from "axios";
import Image from "next/image";
import { toast } from "sonner";

export default function Cart() {
  const { setCartItems } = userStore();
  const cartItems = userStore((state) => state.cartItems);
  const { removeFromCart, increaseQuantity, decreaseQuantity } = userStore();

  const subtotal = cartItems?.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const originalTotal = cartItems?.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const discount =
    cartItems?.reduce(
      (sum, item) => sum + (item.product.discount ?? 0) * item.quantity,
      0
    ) ?? 0;
  const deliveryCharges = subtotal! > 1500 ? 0 : 99;
  const total = subtotal! + deliveryCharges - discount;

  const getCart = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
      withCredentials: true,
    });
    setCartItems(res.data.data.items);
  };
  useEffect(() => {
    getCart();
  }, []);
  console.log("cartItems: ", cartItems);

  async function removeItem(id: string) {
    removeFromCart(id);
    toast.success("Item removed");

    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/cart/delete/${id}`,
      {
        withCredentials: true,
      }
    );
  }

  async function increaseItemQty(
    itemId: string,
    qty: number,
    variantId: string
  ) {
    increaseQuantity(itemId);
    // console.log(qty + 1, variantId);
    let data = {
      quantity: qty + 1,
      variantId,
    };
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/cart/update/${itemId}`,
      data,
      {
        withCredentials: true,
      }
    );

    console.log(res.data);
  }
  async function decreaseItemQty(
    itemId: string,
    qty: number,
    variantId: string
  ) {
    decreaseQuantity(itemId);
    let data = {
      quantity: qty - 1,
      variantId,
    };
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/cart/update/${itemId}`,
      data,
      {
        withCredentials: true,
      }
    );

    console.log(res.data);
  }

  if (cartItems?.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center mb-8">
            <ArrowLeft className="w-6 h-6 mr-4 cursor-pointer" />
            <h1 className="text-2xl font-bold">Shopping Bag</h1>
          </div>

          <div className="flex flex-col items-center justify-center py-16">
            <ShoppingBag className="w-24 h-24 text-gray-300 mb-6" />
            <h2 className="text-2xl font-semibold mb-2">Your bag is empty</h2>
            <p className="text-gray-600 mb-6">Add items to it now.</p>
            <Button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors">
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return cartItems ? (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <ArrowLeft className="w-6 h-6 mr-4 cursor-pointer hover:text-gray-600" />
          <h1 className="text-2xl font-bold">Shopping Bag</h1>
          <span className="text-gray-600 ml-2">
            ({cartItems?.length} items)
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-600 mb-6">
                  <Truck className="w-4 h-4 mr-2" />
                  <span>Get it by </span>
                  <span className="font-semibold ml-1">Mon, Jan 29</span>
                </div>

                <div className="space-y-6">
                  {cartItems.map((item: any, index) => (
                    <div
                      key={item.product.id + index}
                      className="flex gap-4 pb-6 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="w-20 h-28 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          width={100}
                          height={100}
                          src={item.product.images[0].url}
                          alt={"images"}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {item.product.brand}
                            </h3>
                            <p className="text-sm text-gray-600 mb-1">
                              {item.product.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              Size: {item.variant.size} | Color:{" "}
                              {item.variant.color}
                            </p>
                          </div>
                          <Button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-gray-600 p-1"
                          >
                            <X className="w-5 h-5" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-lg font-bold">
                              ₹{item.product.price}
                            </span>
                            {/* <span className="text-sm text-gray-500 line-through ml-2">
                                ₹{item.originalPrice}
                              </span>
                              <span className="text-sm text-green-600 ml-2">
                                {Math.round(
                                  ((item.product.price - item.product.price) /
                                    item.product.price) *
                                    100
                                )}
                                % OFF
                              </span> */}
                          </div>
                        </div>

                        <div className="flex items-center  justify-between mt-4">
                          <div className="flex items-center border rounded-lg">
                            <Button
                              onClick={() =>
                                decreaseItemQty(
                                  item.id,
                                  item.quantity,
                                  item.variantId
                                )
                              }
                              className="p-2 hover:bg-gray-100 disabled:opacity-50"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="px-4 py-2 font-semibold">
                              {item.quantity}
                            </span>
                            <Button
                              onClick={() =>
                                increaseItemQty(
                                  item.id,
                                  item.quantity,
                                  item.variantId
                                )
                              }
                              disabled={item.quantity === item.variant.stock}
                              className="p-2 hover:bg-gray-100"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="flex gap-4">
                            <Button
                              // onClick={() => moveToWishlist(item.id)}
                              className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                            >
                              <Heart className="w-4 h-4 mr-1" />
                              <span className="hidden md:inline">WISHLIST</span>
                            </Button>
                            <Button
                              onClick={() => removeItem(item.id)}
                              className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              <span className="hidden md:inline">REMOVE</span>
                            </Button>
                          </div>
                        </div>

                        {!item.variant.stock && (
                          <div className="mt-3 p-3 bg-red-50 rounded-lg">
                            <p className="text-sm text-red-600">
                              <span className="font-semibold">
                                Out of Stock!
                              </span>{" "}
                              This item is currently unavailable.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Price Summary */}
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
                  <span
                    className={deliveryCharges === 0 ? "text-green-600" : ""}
                  >
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
                  CHECKOUT
                </Button>
              </Link>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  You will save ₹{discount.toLocaleString()} on this order
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
