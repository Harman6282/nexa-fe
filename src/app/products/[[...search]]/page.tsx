"use client";
import { ProductCard } from "@/components/product-listing/ProductCard";
import Sidebar from "@/components/product-listing/Sidebar";
import { data } from "@/lib/data";
import { useParams } from "next/navigation";

export default function Products() {
  const params = useParams<{ search?: string }>();
  return (
    <div className="flex gap-1">
      <Sidebar className="hidden sm:inline-block w-1/4" />

      <div className="flex flex-wrap w-11/12 ps-5 md:gap-4 mx-auto justify-start my-3 pb-10">
        {data.map((product) => (
          <ProductCard
            key={product.id}
            title={product.name}
            image={product.images.map((img) => img.url)}
            price={product.price}
            discount={product.discount}
            brand={product.brand}
            className="w-1/2 sm:w-1/2 md:w-[30%] lg:w-1/5 p-2"
          />
          // <div key={product.id} className="border p-4 mb-4">
          //   <h2 className="text-xl font-bold">{product.name}</h2>
          //   <p className="text-gray-700">{product.description}</p>
          //   <p className="text-green-600 font-semibold">
          //     ${product.price.toFixed(2)}
          //   </p>
          //   <p className="text-gray-500">Category: {product.category.name}</p>
          //   <p className="text-gray-500">Brand: {product.brand}</p>
          //   <p className="text-gray-500">Discount: {product.discount}%</p>
          //   <p className="text-gray-500">Ratings: {product.ratings} </p>
          //   <p className="text-gray-500">Reviews: {product.numReviews}</p>
          //   <p className="text-gray-500">
          //     Created At: {new Date(product.createdAt).toLocaleDateString()}
          //   </p>
          //   <p className="text-gray-500">Slug: {product.slug}</p>
          //   <p className="text-gray-500">ID: {product.id}</p>
          //   <p className="text-gray-500">Category ID: {product.categoryId}</p>
          //   <p className="text-gray-500">
          //     Updated At: {new Date(product.updatedAt).toLocaleDateString()}
          //   </p>
          //   {/* Display images */}

          //   <div className="flex flex-wrap gap-2 mt-4">
          //     {/* images */}
          //     {product.images.map((image) => (
          //       <img
          //         key={image.id}
          //         src={image.url}
          //         alt={product.name}
          //         className="w-32 h-32 object-cover mb-2"
          //       />
          //     ))}
          //   </div>
          // </div>
        ))}
      </div>
    </div>
  );
}
