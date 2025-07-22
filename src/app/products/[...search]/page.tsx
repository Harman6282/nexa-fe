"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star, Heart, ShoppingCart, Minus, Plus } from "lucide-react";

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

// Sample product data
const productData: Product = {
  id: "ad861846-008c-44ca-b335-f284aab3279e1",
  name: "Premium Cotton Dress Shirt",
  slug: "premium-cotton-dress-shirt-COJMEwSP",
  description:
    "Classic slim fit dress shirt made from premium cotton. Perfect for business meetings and formal occasions. Features modern tailoring with exceptional comfort and durability.",
  price: 1300,
  discount: 50,
  brand: "H&M",
  categoryId: "5968739b-866a-4e21-8585-d5c0c97a8205",
  ratings: 4.5,
  numReviews: 124,
  createdAt: "2025-06-25T17:03:43.542Z",
  updatedAt: "2025-06-25T17:03:43.542Z",
  category: {
    id: "5968739b-866a-4e21-8585-d5c0c97a8205",
    name: "all",
  },
  images: [
    {
      id: "cdc89231-1a86-4aab-bf0f-d4cad3e68d7d",
      publicId: "images/xmurc6bwo7giylnprkok",
      url: "https://res.cloudinary.com/drr5mq41s/image/upload/v1750871022/images/xmurc6bwo7giylnprkok.jpg",
      productId: "ad861846-008c-44ca-b335-f284aab3279e",
    },
    {
      id: "23e4c88c-eff4-4357-ba1f-2c3fe46c6d35",
      publicId: "images/ftntjsine5skf4qbwonl",
      url: "https://res.cloudinary.com/drr5mq41s/image/upload/v1750871022/images/ftntjsine5skf4qbwonl.jpg",
      productId: "ad861846-008c-44ca-b335-f284aab3279e",
    },
  ],
  variants: [
    {
      id: "5bbb21a7-98e6-47dd-921b-e7d23b0f16ac",
      productId: "ad861846-008c-44ca-b335-f284aab3279e",
      size: "S",
      color: "Red",
      stock: 10,
    },
    {
      id: "b7bff4f1-d1f7-4d2a-b6c4-cdd8ed569a28",
      productId: "ad861846-008c-44ca-b335-f284aab3279e",
      size: "M",
      color: "Blue",
      stock: 8,
    },
  ],
};

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discountedPrice = productData.price * (1 - productData.discount / 100);
  const savings = productData.price - discountedPrice;

  const uniqueSizes = [...new Set(productData.variants.map((v) => v.size))];
  const uniqueColors = [...new Set(productData.variants.map((v) => v.color))];

  const selectedVariant = productData.variants.find(
    (v) => v.size === selectedSize && v.color === selectedColor
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "fill-muted text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={productData.images[selectedImage]?.url}
                alt={productData.name}
                className="h-full w-full object-cover object-top transition-transform hover:scale-105"
              />
            </div>
            <div className="flex space-x-2">
              {productData.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square w-20 overflow-hidden rounded-md border-2 transition-colors ${
                    selectedImage === index ? "border-primary" : "border-muted"
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
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {productData.brand}
              </Badge>
              <h1 className="text-3xl font-bold text-foreground">
                {productData.name}
              </h1>
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex">{renderStars(productData.ratings)}</div>
                <span className="text-sm text-muted-foreground">
                  ({productData.numReviews} reviews)
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-foreground">
                  ${discountedPrice.toFixed(2)}
                </span>
                {productData.discount > 0 && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      ${productData.price.toFixed(2)}
                    </span>
                    <Badge variant="destructive">
                      {productData.discount}% OFF
                    </Badge>
                  </>
                )}
              </div>
              {savings > 0 && (
                <p className="text-sm text-green-600">
                  You save ${savings.toFixed(2)}!
                </p>
              )}
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{productData.description}</p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {uniqueSizes.map((size) => (
                  <Button
                    key={size}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                    className={
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-white text-black border-1"
                    }
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold mb-3">Color</h3>
              <div className="flex flex-wrap gap-2">
                {uniqueColors.map((color) => (
                  <Button
                    key={color}
                    className={
                      selectedColor === color
                        ? "bg-black text-white"
                        : "bg-white text-black border-1"
                    }
                    size="sm"
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            {selectedSize && selectedColor && (
              <div>
                {selectedVariant && selectedVariant.stock === 0 ? (
                  <span className="text-red-600 font-semibold">
                    Out of Stock
                  </span>
                ) : null}
                {!selectedVariant && (
                  <span className="text-red-600 font-semibold">
                    Out of Stock
                  </span>
                )}
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-medium w-8 text-center">{quantity}</span>
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
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                className="w-full"
                size="lg"
                disabled={
                  !selectedSize ||
                  !selectedColor ||
                  !selectedVariant ||
                  selectedVariant.stock === 0
                }
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                className="w-full"
                size="lg"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart
                  className={`mr-2 h-5 w-5 ${
                    isWishlisted ? "fill-current text-red-500" : ""
                  }`}
                />
                {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>
            </div>

            {/* Product Features */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Product Features</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Premium cotton fabric</li>
                  <li>• Slim fit design</li>
                  <li>• Machine washable</li>
                  <li>• Wrinkle resistant</li>
                  <li>• Professional styling</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
