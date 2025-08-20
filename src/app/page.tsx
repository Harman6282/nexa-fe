import Banner from "@/components/landing-page/Banner";
import InfoSection from "@/components/landing-page/InfoSection";
import CollectionSection from "@/components/landing-page/OurCollection";
import PromoAndNewsletter from "@/components/landing-page/PromoAndNewsletter";
import Wrapper from "@/components/Wrapper";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Asterisk } from "lucide-react";

export default function Home() {
  return (
    <Wrapper>
      <div className="w-full min-h-screen ">
        {/* Hero */}
        <section className="px-4 md:px-8 lg:px-16 py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Left column */}
            <div className="space-y-4 md:space-y-6">
              {/* Big statement card */}
              <div className="rounded-3xl bg-neutral-100 p-6 md:p-8 lg:p-10 text-black shadow-sm">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight">
                  FOR
                  <br />
                  EVERYONE BUT
                  <br />
                  NOT ANYONE
                </h1>
                <p className="mt-4 md:mt-6 text-xs md:text-sm text-neutral-600 max-w-xl">
                  We establish personal relationships with our boutiques, to
                  make sure each is vetted for a stress-free shopping
                  experience.
                </p>
              </div>

              {/* Three small image chips */}
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                  <Image
                    src="/card1.jpg"
                    alt="#RIPSTOP"
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 1024px) 20vw, 30vw"
                  />
                  <span className="absolute bottom-3 left-3 rounded-md bg-white/90 px-2 py-1 text-xs font-semibold">
                    #RIPSTOP
                  </span>
                </div>
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                  <Image
                    src="/card2.jpg"
                    alt="#INSULATED"
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 1024px) 20vw, 30vw"
                  />
                  <span className="absolute bottom-3 left-3 rounded-md bg-white/90 px-2 py-1 text-xs font-semibold">
                    #INSULATED
                  </span>
                </div>
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                  <Image
                    src="/card3.jpg"
                    alt="#WATERPROOF"
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 1024px) 20vw, 30vw"
                  />
                  <span className="absolute bottom-3 left-3 rounded-md bg-white/90 px-2 py-1 text-xs font-semibold">
                    #WATERPROOF
                  </span>
                </div>
              </div>
            </div>

            {/* Right column - big image with CTAs */}
            <div className="relative rounded-3xl overflow-hidden min-h-[360px] md:min-h-[520px]">
              <Image
                src="/model.jpg"
                alt="Featured model"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />

              {/* Shop now bubble */}
              <button className="absolute right-4 top-4 h-20 w-20 rounded-full bg-white/90 text-black text-xs font-semibold backdrop-blur-sm shadow-md">
                <span className="absolute inset-0 grid place-items-center">
                  SHOP
                  <br />
                  NOW
                </span>
              </button>

              {/* Bottom controls */}
              <div className="absolute left-4 right-4 bottom-4 flex items-center justify-center gap-3">
                <Link
                  href="/products"
                  className="rounded-full bg-white text-black px-5 py-3 text-sm font-semibold shadow-md inline-flex items-center gap-2"
                >
                  SEE ALL
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <button className="grid h-11 w-11 place-items-center rounded-full bg-black text-white shadow-md">
                  <ArrowDown className="h-4 w-4" />
                </button>
                <Link
                  href="/contact"
                  className="rounded-full border border-white/70 text-white px-5 py-3 text-sm font-semibold inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm"
                >
                  CONTACT US
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Scrolling Banner */}
        <Banner />

        {/* Statement section */}
        <section className="px-4 md:px-8 lg:px-16 py-8 md:py-14">
          <div className="relative max-w-5xl mx-auto text-center">
            {/* floating avatars */}
            <Image
              src="/card1.jpg"
              alt="avatar-1"
              width={64}
              height={64}
              className="hidden md:block absolute -top-6 left-1/4 rounded-full object-cover"
            />
            <Image
              src="/card3.jpg"
              alt="avatar-2"
              width={64}
              height={64}
              className="hidden md:block absolute -bottom-6 left-8 rounded-full object-cover"
            />
            <Image
              src="/card2.jpg"
              alt="avatar-3"
              width={64}
              height={64}
              className="hidden md:block absolute -bottom-6 right-8 rounded-full object-cover"
            />

            <p className="text-2xl md:text-4xl lg:text-5xl leading-snug md:leading-snug font-extrabold tracking-tight text-black">
              Puremod clothing for Elevated Everyday Life. Styles change
              <span className="inline-flex items-center gap-2 mx-2 align-middle rounded-full border border-black px-3 py-1">
                <Asterisk className="h-5 w-5" /> with seasons
              </span>
              united by the liberating essence of travel-inspired
              lightheartedness
            </p>
          </div>
        </section>

        {/* Product Collection */}
        <CollectionSection />

        <InfoSection />

        <PromoAndNewsletter />
      </div>
    </Wrapper>
  );
}
