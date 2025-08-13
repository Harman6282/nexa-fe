import Banner from "@/components/landing-page/Banner";
import CollectionSection from "@/components/landing-page/OurCollection";
import PromoAndNewsletter from "@/components/landing-page/PromoAndNewsletter";
import Wrapper from "@/components/Wrapper";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Home() {
  return (
    <Wrapper>
      <div className="w-full min-h-screen ">
        {/* Image Carousel */}

        <section className="flex flex-col md:flex-row items-center justify-between  bg-white px-6 md:px-20 py-10 md:py-20">
          {/* Left Content */}
          <div className="md:w-1/2">
            <h1 className="text-5xl md:text-9xl font-bold text-black ">
              NEXA FASHION
            </h1>
            <p className="mt-6 text-gray-700 text-sm">
              Discover a fashion experience that not only mirrors your unique
              personality but amplifies it. At Nexa, every piece is crafted to
              elevate your confidence, celebrate your individuality, and empower
              you to stand out effortlessly in any setting.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href={"/products"}
                className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
              >
                Shop Now
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center">
            <div className="rounded-3xl overflow-hidden">
              <Image
                src={"/hero.png"}
                alt="Nexa Fashion Models"
                width={600}
                height={600}
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Scrolling Banner */}
        <Banner />

        {/* Product Collection */}

        <CollectionSection />

        {/* Dark Section */}
        <section className="bg-black text-white rounded-2xl flex flex-col lg:flex-row items-center gap-8 px-8 sm:px-8 py-10 my-12">
          <Image
            src="/img2.avif"
            alt="Clothing Collection"
            width={500}
            height={380}
            className="sm:w-56 sm:h-80 md:w-2/3 lg:w-2/4 lg:h-96 object-cover rounded-xl shadow-2xl"
          />
          <div className="max-w-md w-full">
            <div className="text-2xl sm:text-3xl font-extrabold mb-4">
              CLOTHING COLLECTION
            </div>
            <div className="text-gray-300 text-base sm:text-lg mb-4">
              Explore our curated selection of premium clothing for every
              occasion. From casual wear to formal attire, find your perfect fit
              and style.
            </div>
            <Link
              href="/products"
              className="mt-2 px-6 py-3 rounded-lg bg-white text-black font-bold hover:bg-gray-200 transition"
            >
              Explore Products
            </Link>
          </div>
        </section>

        <PromoAndNewsletter />
      </div>
    </Wrapper>
  );
}
