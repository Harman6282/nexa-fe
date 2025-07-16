"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowLeft } from "lucide-react";

// Interfaces
interface Variant {
  id: string;
  productId: string;
  size: string;
  color: string;
  stock: number;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discount: number;
  brand: string;
  ratings: number;
  numReviews: number;
  images: { id: string; url: string }[];
  variants: Variant[];
}

const productData: Product = {
  id: "4665f3cd-fa47-49b1-aa8e-981ef45d37cet",
  name: "Printed t-shirt ",
  slug: "printed-t-shirt-mKO_7Wiu",
  description: "A colourful printed t-shirt for men",
  price: 2000,
  discount: 50,
  brand: "Adidas",
  ratings: 4.5,
  numReviews: 120,
  images: [
    {
      id: "1",
      url: "https://res.cloudinary.com/drr5mq41s/image/upload/v1749224200/images/mhdawccg9qln730lokoc.webp",
    },
    {
      id: "2",
      url: "https://res.cloudinary.com/drr5mq41s/image/upload/v1749224201/images/lk04yewtbzistjetducy.jpg",
    },
    {
      id: "3",
      url: "https://res.cloudinary.com/drr5mq41s/image/upload/v1749224202/images/w91bqviimw8ofuwlccmx.png",
    },
  ],
  variants: [
    {
      id: "732e34a0-b8d7-4f91-8564-336c5b2f3209",
      productId: "4665f3cd-fa47-49b1-aa8e-981ef45d37cet",
      size: "S",
      color: "Red",
      stock: 10,
    },
    {
      id: "24eca498-0804-401f-9c3d-f3ae9a791a69",
      productId: "4665f3cd-fa47-49b1-aa8e-981ef45d37cet",
      size: "M",
      color: "Blue",
      stock: 4,
    },
  ],
};

export default function ProductDetailsPage() {
  const router = useRouter();

  const discountedPrice =
    productData.price - (productData.price * productData.discount) / 100;

  // State for selected variant
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Find variant based on selection
  const selectedVariant = productData.variants.find(
    (variant) =>
      variant.size === selectedSize && variant.color === selectedColor
  );

  return (
    <div className="bg-white md:w-full text-black min-h-screen p-4 md:p-8 relative">
      {/* Go Back Button */}
      <Button
        variant="outline"
        size="sm"
        className="absolute top-4 left-4 flex items-center gap-1 border border-gray-300"
        onClick={() => router.push("/products")}
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>

      <Card className="bg-white border-0 rounded-lg overflow-hidden lg:overflow-visible w-full max-w-6xl mx-auto mt-8">
        <div className="md:grid md:grid-cols-2 items-start">
          {/* Images */}
          <div className="p-4">
            <Carousel className="w-full md:w-3/4 mx-auto lg:w-4/5">
              <CarouselContent className="border-0">
                {productData.images.map((image) => (
                  <CarouselItem key={image.id} className="border-0">
                    <div className="p-1">
                      <Card className="bg-white border-0">
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <img
                            src={image.url}
                            alt={productData.name}
                            className="w-full h-full object-contain"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="text-white bg-black" />
              <CarouselNext className="text-white bg-black" />
            </Carousel>
          </div>

          {/* Product Details */}
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <Badge
              variant="outline"
              className="border-black text-black w-fit mb-2"
            >
              {productData.brand}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {productData.name}
            </h1>
            <p className="text-lg text-gray-700 mb-4">
              {productData.description}
            </p>

            {/* Ratings */}
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(productData.ratings)
                        ? "text-black fill-current"
                        : "text-gray-400"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                ({productData.numReviews} reviews)
              </span>
            </div>

            {/* Variant Selector */}
            <div className="space-y-4">
              {/* Size */}
              <div>
                <h3 className="text-sm font-medium mb-2">Select Size:</h3>
                <div className="flex gap-2 flex-wrap">
                  {[...new Set(productData.variants.map((v) => v.size))].map(
                    (size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </Button>
                    )
                  )}
                </div>
              </div>

              {/* Color */}
              <div>
                <h3 className="text-sm font-medium mb-2">Select Color:</h3>
                <div className="flex gap-2 flex-wrap">
                  {[...new Set(productData.variants.map((v) => v.color))].map(
                    (color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          selectedColor === color
                            ? "border-black"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color.toLowerCase() }}
                      />
                    )
                  )}
                </div>
              </div>

              {/* Stock Info */}
              {selectedSize && selectedColor && (
                <p
                  className={`text-sm font-medium ${
                    selectedVariant?.stock ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {selectedVariant?.stock
                    ? `In Stock: ${selectedVariant.stock}`
                    : "Out of Stock"}
                </p>
              )}
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-4 mt-6 mb-6">
              <span className="text-3xl font-bold">₹{discountedPrice}</span>
              <span className="text-xl text-gray-500 line-through">
                ₹{productData.price}
              </span>
              <Badge className="bg-black text-white">
                {productData.discount}% OFF
              </Badge>
            </div>

            {/* Add to Cart */}
            <Button
              size="lg"
              disabled={!selectedVariant || selectedVariant?.stock === 0}
              className="w-full bg-black text-white hover:bg-gray-800 disabled:bg-gray-400"
              onClick={() =>
                alert(`Added ${selectedSize} - ${selectedColor} to cart!`)
              }
            >
              {selectedVariant?.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
