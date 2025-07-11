"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

type ProductCardProps = {
  title: string;
  image: string[];
  brand: string;
  price: number;
  discount: number;
  className?: string;
};

export const ProductCard = ({
  title,
  image,
  brand,
  price,
  discount,
  className,
}: ProductCardProps) => {
  return (
    <Card
      className={`rounded-sm border-0 py-0 hover:shadow-md transition-all overflow-hidden ${className}`}
    >
      {/* Image */}
      <div className="relative h-60">
        <Image
          src={image[0]}
          alt={brand}
          fill
          className="object-cover object-center "
          sizes="(max-width: 768px) 100vw, 256px"
        />
      </div>

      {/* Content */}
      <CardContent className="p-2 pt-0">
        <h3 className="text-sm font-semibold">{brand}</h3>
        <h1 className="text-sm text-gray-700">{title}</h1>

        {/* Price */}
        <div className="flex gap-3 items-center mt-1">
          <p className="text-md font-bold text-black">Rs. {price}</p>
          <p className="text-orange-500 text-sm">(Rs. {discount} OFF)</p>
        </div>
      </CardContent>
    </Card>
  );
};
