import Image from "next/image";
import { Leaf, Globe, ArrowUpRight } from "lucide-react";

export default function InfoSection() {
  return (
    <section className="w-full mx-auto flex flex-col md:flex-row items-stretch gap-4 md:gap-6 mb-8">
      {/* Left - Image card */}
      <div className="w-full md:w-1/2">
        <div className="relative h-full min-h-[320px] rounded-3xl overflow-hidden bg-white shadow-md">
          <Image
            src="https://i.pinimg.com/736x/7d/6a/d1/7d6ad172cf49e45040c1791b7a8fdf00.jpg"
            alt="Model wearing hat"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />

          <button className="group absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white text-black shadow-lg px-6 py-3 text-sm font-semibold">
            LEARN MORE
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>

      {/* Right - Content card */}
      <div className="w-full md:w-1/2 bg-[#5b7040] text-black rounded-3xl p-5 md:p-8 flex flex-col justify-between shadow-md">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6 md:mb-8">
          WE’RE CHANGING
          <br />
          THE WAY THINGS
          <br />
          GET MADE
        </h1>

        <div className="mt-2 rounded-2xl border border-black/15 bg-black/0 p-4 md:p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Sustainability */}
            <div className="flex items-start gap-4">
              <span className="mt-1 inline-grid h-10 w-10 place-items-center rounded-full bg-black text-white">
                <Leaf className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-extrabold">SUSTAINABILITY</h3>
                <p className="text-sm font-medium leading-relaxed">
                  We’re challenging conventional retail, putting an end to dead stock,
                  unconventional waste and more fantastic.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="flex items-start gap-4">
              <span className="mt-1 inline-grid h-10 w-10 place-items-center rounded-full bg-black text-white">
                <Globe className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-extrabold">MISSION</h3>
                <p className="text-sm font-medium leading-relaxed">
                  We’re on a mission to empower, create independence in a commercial
                  world and incredible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
