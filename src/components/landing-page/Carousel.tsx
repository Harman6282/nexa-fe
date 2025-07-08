"use client";

import React, { useState } from "react";
import Image from "next/image";

const carouselImages = [
  "https://i.pinimg.com/736x/f3/81/3e/f3813e522f948e15adac759acf87464a.jpg",
  "https://i.pinimg.com/736x/1f/08/65/1f0865ae231cd9efe9bdd7147a92d4a1.jpg",
  "https://i.pinimg.com/736x/f5/bf/35/f5bf35dc3b635bc57fdea3f1f35bdcdc.jpg",
];

const Carousel = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handlePrev = () => {
    setCarouselIndex((prev) =>
      prev === 0 ? carouselImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCarouselIndex((prev) =>
      prev === carouselImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div>
      <div className="flex flex-col items-center my-8">
        <div className="relative w-full max-w-2xl">
          <Image
            src={carouselImages[carouselIndex]}
            alt={`Carousel ${carouselIndex + 1}`}
            width={800}
            height={350}
            className="rounded-xl w-full h-56 sm:h-80 object-cover"
          />
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100 transition"
            aria-label="Previous"
          >
            &#8592;
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100 transition"
            aria-label="Next"
          >
            &#8594;
          </button>
        </div>
        <div className="flex gap-2 mt-3">
          {carouselImages.map((_, idx) => (
            <span
              key={idx}
              className={`h-2 w-2 rounded-full ${
                idx === carouselIndex ? "bg-pink-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
