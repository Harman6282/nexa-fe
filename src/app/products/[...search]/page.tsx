"use client";

import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation"; // 🚨 Import router
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  ArrowLeft,
} from "lucide-react";
import { useParams } from "next/navigation";
import axios from "axios";

interface ProductImage {
  id: string;
  publicId: string;
  url: string;
  productId: string;
}

interface ProductVariant {
  id: string;
  productId: string;
  size: string;
  color: string;
  stock: number;
}

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discount: number;
  brand: string;
  categoryId: string;
  ratings: number;
  numReviews: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
  images: ProductImage[];
  variants: ProductVariant[];
}

const ProductDetails = () => {
  const params = useParams();
  const [productData, setProductData] = useState<Product>();

  const slug = params?.search?.toString();
  console.log(slug);

  const getProduct = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products/search?q=${slug}`
    );
    console.log(res.data.data[0]);
    setProductData(res.data.data[0]);
  };

  useEffect(() => {
    getProduct();
  }, []);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discountedPrice = productData
    ? productData.price * (1 - productData.discount / 100)
    : 0;
  const savings = productData ? productData.price - discountedPrice : 0;

  const uniqueSizes = productData
    ? [...new Set(productData.variants.map((v) => v.size))]
    : [];
  const uniqueColors = productData
    ? [...new Set(productData.variants.map((v) => v.color))]
    : [];

  const selectedVariant = productData
    ? productData.variants.find(
        (v) => v.size === selectedSize && v.color === selectedColor
      )
    : undefined;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "fill-muted text-muted-foreground"
        }`}
      />
    ));
  };

  async function handleAddToCart() {
    console.log(productData?.id);
    console.log("variant id : ", selectedVariant);
    console.log("quantity: ", quantity);
  }

  return (
    productData && (
      <div className="min-h-screen bg-background relative">
        {/* Go Back Button */}
        <Button
          variant="outline"
          className="absolute top-5 left-5 flex items-center gap-2"
          onClick={() => redirect("/products")}
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </Button>

        <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-20 xl:px-36 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-5">
              <div className="aspect-square overflow-hidden rounded-xl bg-muted shadow-md">
                <img
                  src={productData.images[selectedImage]?.url}
                  alt={productData.name}
                  className="h-full w-full object-cover object-top transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="flex space-x-3">
                {productData.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square w-20 overflow-hidden rounded-lg border-2 transition-colors duration-200 ${
                      selectedImage === index ? "border-black" : "border-muted"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${productData.name} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <Badge variant="secondary" className="mb-3">
                  {productData.brand}
                </Badge>
                <h1 className="text-4xl font-bold text-foreground">
                  {productData.name}
                </h1>
                <div className="flex items-center space-x-2 mt-3">
                  <div className="flex">{renderStars(productData.ratings)}</div>
                  <span className="text-sm text-muted-foreground">
                    ({productData.numReviews} reviews)
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-4">
                  <span className="text-4xl font-bold text-foreground">
                    ₹{discountedPrice.toFixed(2)}
                  </span>
                  {productData.discount > 0 && (
                    <>
                      <span className="text-lg text-muted-foreground line-through">
                        ₹{productData.price.toFixed(2)}
                      </span>
                      <Badge variant="destructive">
                        {productData.discount}% OFF
                      </Badge>
                    </>
                  )}
                </div>
                {savings > 0 && (
                  <p className="text-sm text-green-600">
                    You save ₹{savings.toFixed(2)}!
                  </p>
                )}
              </div>

              <Separator />

              <p className="text-base text-muted-foreground">
                {productData.description}
              </p>

              {/* Size Selection */}
              <div>
                <h3 className="font-semibold mb-3">Size</h3>
                <div className="flex flex-wrap gap-3">
                  {uniqueSizes.map((size) => (
                    <Button
                      key={size}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-full px-4 py-1 text-sm transition-all duration-200 ${
                        selectedSize === size
                          ? "bg-black text-white"
                          : "bg-white text-black border"
                      }`}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="font-semibold mb-3">Color</h3>
                <div className="flex flex-wrap gap-3">
                  {uniqueColors.map((color) => (
                    <Button
                      key={color}
                      size="sm"
                      onClick={() => setSelectedColor(color)}
                      className={`rounded-full px-4 py-1 text-sm transition-all duration-200 ${
                        selectedColor === color
                          ? "bg-black text-white"
                          : "bg-white text-black border"
                      }`}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Stock Info */}
              {selectedSize && selectedColor ? (
                selectedVariant ? (
                  selectedVariant.stock > 0 ? (
                    <p className="text-sm text-green-600">
                      In stock: {selectedVariant.stock}
                    </p>
                  ) : (
                    <p className="text-sm text-red-600 font-semibold">
                      Out of stock
                    </p>
                  )
                ) : (
                  <p className="text-sm text-red-600">out of stock</p>
                )
              ) : (
                <p className="text-sm text-muted-foreground">
                  Select size and color
                </p>
              )}

              {/* Quantity & Actions */}
              <div className="space-y-5">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="font-medium text-lg w-8 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={
                      !selectedVariant || quantity >= selectedVariant.stock
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  className="w-full py-5 text-lg bg-black text-white cursor-pointer"
                  disabled={
                    !selectedSize ||
                    !selectedColor ||
                    !selectedVariant ||
                    selectedVariant.stock === 0
                  }
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-3 h-5 w-5" />
                  Add to Cart
                </Button>

                <Button
                  variant="outline"
                  className="w-full py-5 text-lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart
                    className={`mr-3 h-5 w-5 transition-transform duration-200 ${
                      isWishlisted ? "fill-current text-red-500 scale-125" : ""
                    }`}
                  />
                  {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductDetails;
