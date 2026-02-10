"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Star,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  ArrowLeft,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { ProductSchema, useProductStore, userStore } from "@/lib/store";
import ProductDetailsSkeleton from "@/components/shimmer/Prod_details_shimmer";

const ProductDetails = () => {
  const params = useParams();
  const [productData, setProductData] = useState<ProductSchema>();
  const [isLoading, setIsLoading] = useState(false);
  const products = useProductStore((state) => state.products);
  const { user } = userStore();

  const slug = Array.isArray(params?.search)
    ? params.search[0]
    : params?.search?.toString();
  const isUuid = (value: string | undefined) =>
    !!value &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value
    );
  const router = useRouter();

  function getProduct() {
    if (!slug) return;
    const item = products.find((item) => item.slug === slug || item.id === slug);
    setProductData(item);
  }

  const fetchProduct = async (value: string) => {
    try {
      setIsLoading(true);
      const endpoint = isUuid(value)
        ? `${process.env.NEXT_PUBLIC_API_URL}/products/${value}`
        : `${process.env.NEXT_PUBLIC_API_URL}/products/search?q=${value}`;
      const res = await axios.get(endpoint, {
        withCredentials: true,
      });
      const data = isUuid(value) ? res.data.data : res.data.data.products?.[0];
      setProductData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
    if (slug) {
      fetchProduct(slug);
    }
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
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-300 text-gray-300"
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
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/add`,
        data,
        {
          withCredentials: true,
        }
      );

      toast.success("Added to cart", {
        className: "bg-green-500 text-white border border-gray-200",
        action: {
          label: "View Cart",
          onClick: () => router.push("/cart"),
        },
      });
    } catch (_error) {
      toast.error("Failed to add to cart");
    } finally {
      setAddingState(false);
    }
  }

  const handleAddToWishlist = async (id: string) => {
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
      setIsWishlisted(!isWishlisted);
      toast.success(res?.data?.message || "Added to wishlist");
    } catch (error) {
      toast.error("Something went wrong, try again");
    }
  };

  const discount = productData?.discount || 0;
  const originalPrice = productData?.price || 0;
  const discountedPrice =
    discount > 0 ? originalPrice * (1 - discount / 100) : originalPrice;

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
            <li>
              <div className="flex items-center">
                <ChevronRight className="text-text-secondary text-sm mx-1 h-4 w-4" />
                <Link
                  href="/products"
                  className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
                >
                  Products
                </Link>
              </div>
            </li>
            {productData?.categoryName && (
              <li>
                <div className="flex items-center">
                  <ChevronRight className="text-text-secondary text-sm mx-1 h-4 w-4" />
                  <Link
                    href={`/products?category=${productData.categoryName.toLowerCase()}`}
                    className="text-sm font-medium text-text-secondary hover:text-primary transition-colors capitalize"
                  >
                    {productData.categoryName}
                  </Link>
                </div>
              </li>
            )}
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRight className="text-text-secondary text-sm mx-1 h-4 w-4" />
                <span className="text-sm font-bold text-text-main line-clamp-1">
                  {productData?.name || "Product"}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        {isLoading ? (
          <ProductDetailsSkeleton />
        ) : (
          productData && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Image Gallery */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square overflow-hidden rounded-lg bg-[#E4E0E1] shadow-sm border border-[#D6C0B3]/20 group">
                  <Image
                    src={productData.images[selectedImage]?.url || "/card1.jpg"}
                    alt={productData.name}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  {discount > 0 && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-[#D9534F] rounded-lg text-xs font-bold text-white uppercase shadow-sm">
                      -{discount}%
                    </div>
                  )}
                  {(productData as any)?.isNew && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-text-main rounded-lg text-xs font-bold text-white tracking-wider uppercase shadow-sm">
                      NEW
                    </div>
                  )}
                </div>

                {/* Thumbnail Images */}
                {productData.images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {productData.images.map((image, index) => (
                      <button
                        key={image.id}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 aspect-square w-20 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                          selectedImage === index
                            ? "border-text-main shadow-md"
                            : "border-[#D6C0B3]/30 hover:border-[#D6C0B3]"
                        }`}
                      >
                        <Image
                          src={image.url}
                          alt={`${productData.name} ${index + 1}`}
                          width={80}
                          height={80}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                {/* Brand & Title */}
                <div>
                  <div className="inline-flex items-center px-3 py-1 bg-accent/10 rounded-lg text-xs font-bold text-accent uppercase tracking-wider mb-3">
                    {productData.brand}
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-text-main mb-4">
                    {productData.name}
                  </h1>
                  {productData.ratings > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {renderStars(productData.ratings)}
                      </div>
                      <span className="text-sm text-text-muted font-medium">
                        ({productData.numReviews} reviews)
                      </span>
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  {discount > 0 ? (
                    <>
                      <span className="text-4xl md:text-5xl font-black text-[#D9534F]">
                        ₹{discountedPrice.toFixed(2)}
                      </span>
                      <span className="text-xl text-text-muted/50 line-through font-semibold">
                        ₹{originalPrice.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-4xl md:text-5xl font-black text-text-main">
                      ₹{originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Description */}
                <div className="pt-4 border-t border-[#D6C0B3]/20">
                  <p className="text-base text-text-muted leading-relaxed whitespace-pre-line">
                    {productData.description.split(",").join("\n")}
                  </p>
                </div>

                {/* Size Selection */}
                <div className="pt-4 border-t border-[#D6C0B3]/20">
                  <h3 className="font-bold text-text-main mb-4 text-lg">
                    Size
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {uniqueSizes.map((size) => {
                      const variant = productData.variants.find(
                        (v) => v.size === size
                      );
                      const isOutOfStock = variant?.stock === 0;
                      const isSelected = selectedSize === size;

                      return (
                        <button
                          key={size}
                          onClick={() => !isOutOfStock && setSelectedSize(size)}
                          disabled={isOutOfStock}
                          className={`px-6 py-3 rounded-lg text-sm font-bold transition-all duration-200 ${
                            isSelected
                              ? "bg-text-main text-white shadow-md"
                              : isOutOfStock
                              ? "bg-[#E4E0E1] text-text-muted/50 cursor-not-allowed border border-[#D6C0B3]/30"
                              : "bg-white border-2 border-[#D6C0B3]/30 text-text-main hover:border-text-main hover:shadow-sm"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                  {selectedSize && selectedVariant && (
                    <p
                      className={`text-sm font-semibold mt-3 ${
                        selectedVariant.stock > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {selectedVariant.stock > 0
                        ? `In Stock (${selectedVariant.stock} available)`
                        : "Out of Stock"}
                    </p>
                  )}
                  {!selectedSize && (
                    <p className="text-sm text-text-muted mt-3">
                      Please select a size
                    </p>
                  )}
                </div>

                {/* Quantity & Actions */}
                <div className="space-y-4 pt-4 border-t border-[#D6C0B3]/20">
                  {/* Quantity Selector */}
                  <div>
                    <h3 className="font-bold text-text-main mb-3 text-lg">
                      Quantity
                    </h3>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        className="size-10 rounded-lg border-2 border-[#D6C0B3]/30 hover:border-text-main hover:bg-white"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="font-bold text-lg w-12 text-center text-text-main">
                        {quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(quantity + 1)}
                        className="size-10 rounded-lg border-2 border-[#D6C0B3]/30 hover:border-text-main hover:bg-white"
                        disabled={
                          !selectedVariant || quantity >= selectedVariant.stock
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3">
                    <Button
                      className="w-full h-14 rounded-lg bg-text-main text-white font-bold text-base hover:bg-accent transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      disabled={
                        !selectedSize ||
                        !selectedVariant ||
                        selectedVariant.stock === 0 ||
                        addingState
                      }
                      onClick={handleAddToCart}
                    >
                      {addingState ? (
                        <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                      ) : (
                        <ShoppingCart className="mr-3 h-5 w-5" />
                      )}
                      {addingState ? "Adding..." : "Add to Cart"}
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full h-14 rounded-lg border-2 border-[#D6C0B3]/30 text-text-main font-bold hover:bg-[#E4E0E1] hover:border-text-main transition-all"
                      onClick={() => handleAddToWishlist(productData.id)}
                    >
                      <Heart
                        className={`mr-3 h-5 w-5 transition-all duration-200 ${
                          isWishlisted
                            ? "fill-red-500 text-red-500 scale-110"
                            : ""
                        }`}
                      />
                      {isWishlisted
                        ? "Remove from Wishlist"
                        : "Add to Wishlist"}
                    </Button>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="pt-4 border-t border-[#D6C0B3]/20 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <span className="font-semibold text-text-main">
                      Category:
                    </span>
                    <Link
                      href={`/products?category=${productData.categoryName?.toLowerCase()}`}
                      className="hover:text-text-main transition-colors capitalize"
                    >
                      {productData.categoryName}
                    </Link>
                  </div>
                  {productData.brand && (
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <span className="font-semibold text-text-main">
                        Brand:
                      </span>
                      <span>{productData.brand}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </main>
  );
};

export default ProductDetails;
