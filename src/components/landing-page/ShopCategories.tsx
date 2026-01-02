"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";

const categories = [
  {
    title: "ACCESSORIES",
    link: "/products?category=accessories",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAkSCTkgrt65xkqn-hOg9LNr1EriJA1LM26K23Sp0RbZ7rQkZ9laDhuPjr3YEpldB7ZHJ0zZoIqGGn-rOFxdjYgpJQdyM4m6n3nKs1U-s8IkgjTyGqDH_j2B47OoXuZolRIJsGMTSIq1ySCixICLiLVwncN5BDRl6ukuQxlOLFzvK98TDtvTtqYs1dFlrnSnscokx4vreKCgMRMemnCUzC7r0ACxvxJN-6L4c8F9oNbVZBHO0Q-mV-YaMmQ2kXj0_UtUee7SPd_R-mc",
  },
  {
    title: "SALE ITEMS",
    link: "/products?category=sale",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDlmFJEF_DsQS-p4z1hBnrxiHs-fDMFLAz2g0tjHUhNuVhA1SL0C9ax6zEKjlqqVoDhkr_wJ4jn7V92WeE-hEwTx5JDIXmXfJyudVKysyeVHMXqOlyOPKj73ycWDxwyFdgYNjSAcmBiDnFz8Izik8Ctp6pJIUk2THZJ8dKzNYGGkDXrA2O8LVEsjcfMs_Bh-Q1Ef0-ZydRRXy_XoB9gjCL2OUfwkSbLZ0zeRKAqxBKi2E3cUY-Mq3lR1Is5Z6PNnKAFyAM5OqrKysY6",
  },
  {
    title: "SUMMER VIBES",
    link: "/products?category=summer",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCueq4G6fHzgYHzHSMQHg_S3EQoUYuXqqezUvmHxnqxEYzia-C1mOigsKVw26WtgmN87LoLwPc-xdR7xQ-PB49YrRO9eh3KLESZThUMt6CjQ47f2v1mUcyLNbj6diCGei5iJrVbzphBqLS9AbtMQ-CQv20Fuxbatm2Ta3D3hag0ofjwN39W1eHLxaWtjhGwqISGuI-ZPhSllPa9iWiNtLReBSIQSS1XlA95DVSBvSbytPQfLC3viK0SItQ9zPUQXW8-K_lA05u-Yqv_",
  },
];

export default function ShopCategories() {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }
  }, [api]);

  return (
    <section className="py-12 bg-white border-y border-[#D6C0B3]">
      <div className="px-4 md:px-8 max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black tracking-tight text-text-main uppercase">
            Shop Categories
          </h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => api?.scrollPrev()}
              className="size-10 rounded-lg border border-[#D6C0B3] hover:border-text-main flex items-center justify-center text-text-main hover:bg-text-main hover:text-white transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => api?.scrollNext()}
              className="size-10 rounded-lg bg-text-main border border-text-main flex items-center justify-center text-white hover:bg-white hover:text-text-main transition-all"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
          setApi={setApi}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {categories.map((category, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <Link href={category.link} className="group block">
                  <div className="relative h-96 rounded-lg overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-shadow">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#493628]/70 to-transparent z-10" />
                    <div
                      className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url("${category.image}")` }}
                    />
                    <div className="absolute bottom-8 left-8 z-20 text-white">
                      <h3 className="text-4xl font-black mb-3 uppercase drop-shadow-sm">
                        {category.title}
                      </h3>
                      <div className="flex items-center gap-2 group/btn">
                        <span className="text-sm font-bold uppercase tracking-widest text-white">
                          Shop Now
                        </span>
                        <ArrowRight className="text-sm h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
