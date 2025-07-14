import * as React from "react";
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
import { Star } from "lucide-react";

// Defining the TypeScript interfaces for our product data
interface Image {
  id: string;
  publicId: string;
  url: string;
  productId: string;
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
  images: Image[];
  variants: any[]; // Assuming variants can be of any type for now
}

// The product data provided
const productData: Product = {
  id: "4665f3cd-fa47-49b1-aa8e-981ef45d37cet",
  name: "Printed t-shirt ",
  slug: "printed-t-shirt-mKO_7Wiu",
  description: "A colurful printed tshirt for mens",
  price: 2000,
  discount: 50,
  brand: "Adidas",
  categoryId: "5968739b-866a-4e21-8585-d5c0c97a8205",
  ratings: 4.5, // Assuming a rating for demonstration
  numReviews: 120, // Assuming a number of reviews for demonstration
  createdAt: "2025-06-06T15:36:43.344Z",
  updatedAt: "2025-06-06T15:36:43.344Z",
  category: {
    id: "5968739b-866a-4e21-8585-d5c0c97a8205",
    name: "all",
  },
  images: [
    {
      id: "28b81780-3a38-4535-a911-c48dcd8ec66a",
      publicId: "images/mhdawccg9qln730lokoc",
      url: "https://res.cloudinary.com/drr5mq41s/image/upload/v1749224200/images/mhdawccg9qln730lokoc.webp",
      productId: "4665f3cd-fa47-49b1-aa8e-981ef45d37ce",
    },
    {
      id: "1befb25c-99b4-4ec6-8508-d327e1ceed42",
      publicId: "images/lk04yewtbzistjetducy",
      url: "https://res.cloudinary.com/drr5mq41s/image/upload/v1749224201/images/lk04yewtbzistjetducy.jpg",
      productId: "4665f3cd-fa47-49b1-aa8e-981ef45d37ce",
    },
    {
      id: "17a29ea2-77f8-4afd-aae4-de16d70dd739",
      publicId: "images/w91bqviimw8ofuwlccmx",
      url: "https://res.cloudinary.com/drr5mq41s/image/upload/v1749224202/images/w91bqviimw8ofuwlccmx.png",
      productId: "4665f3cd-fa47-49b1-aa8e-981ef45d37ce",
    },
  ],
  variants: [],
};

export default function ProductDetailsPage() {
  const discountedPrice =
    productData.price - (productData.price * productData.discount) / 100;

  return (
    <div className="bg-white md:w-full text-black min-h-screen p-4 md:p-8">
      <Card className="bg-white border-0 rounded-lg overflow-hidden lg:overflow-visible w-full max-w-6xl mx-auto">
        <div className="md:grid md:grid-cols-2 ">
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

            <div className="flex items-center mb-4">
              <div className="flex items-center">
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

            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-3xl font-bold">₹{discountedPrice}</span>
              <span className="text-xl text-gray-500 line-through">
                ₹{productData.price}
              </span>
              <Badge className="bg-black text-white">
                {productData.discount}% OFF
              </Badge>
            </div>

            <Button size="lg" className="w-full bg-black text-white">
              Add to Cart
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
