import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { redirect } from "next/navigation";

type ProductCardProps = {
  id: string;
  slug: string;
  title: string;
  image: string[];
  brand: string;
  price: number;
  discount: number;
  className?: string;
};

export const ProductCard = ({
  slug,
  id,
  title,
  image,
  brand,
  price,
  discount,
  className,
}: ProductCardProps) => {
  return (
    <Card
      onClick={() => {
        redirect(`/products/${slug}`);
      }}
      className={`rounded-md border py-0 border-gray-200/70 hover:border-gray-300 bg-white transition-all cursor-pointer overflow-hidden hover:shadow-lg ${className}`}
    >
      {/* Image */}
      <div className="relative w-full h-2/3 aspect-[4/5] bg-gray-50">
        <Image
          src={image[0]}
          alt={brand}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          priority={false}
        />
      </div>

      {/* Content */}
      <CardContent className="px-2 py-0">
        <h3 className="text-[12px] font-semibold tracking-tight text-gray-900 line-clamp-1">
          {brand}
        </h3>
        <h1 className="text-[12px] text-gray-700 line-clamp-2">{title}</h1>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-1">
          <p className="text-sm font-bold text-black">Rs. {price}</p>
          <p className="text-[10px] text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded-sm">
            {discount}% OFF
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
