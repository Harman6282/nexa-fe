"use client";

import { useEffect, useState } from "react";
import { redirect, usePathname, useRouter } from "next/navigation"; // 🚨 Import router
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Star,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { useParams } from "next/navigation";
import axios from "axios";
import { ProductSchema, useProductStore } from "@/lib/store";

const ProductDetails = () => {
  const params = useParams();
  const [productData, setProductData] = useState<ProductSchema>();
  const products = useProductStore((state) => state.products);

  const slug = params?.search?.toString();

  function getProduct() {
    const item = products.find((item) => item.slug == slug);
    setProductData(item);
  }

  useEffect(() => {
    getProduct();
  }, []);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addingState, setAddingState] = useState(false);

  const uniqueSizes = productData
    ? [...new Set(productData.variants.map((v) => v.size))]
    : [];

  const selectedVariant = productData
    ? productData.variants.find((v) => v.size === selectedSize)
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

  const data = {
    productId: productData?.id,
    variantId: selectedVariant?.id,
    quantity: quantity,
  };

  async function handleAddToCart() {
    setAddingState(true);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/cart/add`,
      data,
      {
        withCredentials: true,
      }
    );
    toast.success("Added to cart", {
      className: "bg-red text-black border border-gray-200",
    });

    setAddingState(false);
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
                    ₹{productData.price.toFixed(2)}
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
                {productData.discount > 0 && (
                  <p className="text-sm text-green-600">
                    You save ₹
                    {(
                      productData.price * (productData.discount / 100)
                    ).toFixed(2)}
                    !
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

              {/* Stock Info */}
              {selectedSize ? (
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
                <p className="text-sm text-muted-foreground">Select size</p>
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
                    !selectedVariant ||
                    selectedVariant.stock === 0 ||
                    addingState
                  }
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-3 h-5 w-5" />
                  {addingState ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    " Add to Cart"
                  )}
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
