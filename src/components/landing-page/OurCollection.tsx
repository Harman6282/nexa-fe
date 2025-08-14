import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";

const CollectionSection = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products/collection`,
    { withCredentials: true }
  );
  const products = data.data;
  console.log(products)
  return (
    products && (
      <section className="max-w-7xl mx-auto px-4 py-12">
        {/* Title */}
        <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
          <h2 className="text-4xl md:text-5xl font-extrabold">
            OUR COLLECTION
          </h2>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <div
              key={product.id}
              className="relative group rounded-lg overflow-hidden border border-gray-200"
            >
              <Image
                src={product?.images[0]?.url}
                alt={product.name}
                width={400}
                height={400}
                className="object-cover object-top w-full h-64 lg:h-80 group-hover:scale-105 transition-transform duration-300"
              />
              {/* Hover Buttons */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
                <Button className="w-32">Add to Cart</Button>
                <Button
                  variant="outline"
                  className="w-32 text-black cursor-pointer bg-white hover:bg-gray-100"
                >
                  View
                </Button>
              </div>
              {/* Product Info */}
              <div className="px-4 py-2 flex justify-between items-center">
                <p className="text-sm">{product.name}</p>
                <p className="font-semibold">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  );
};

export default CollectionSection;
