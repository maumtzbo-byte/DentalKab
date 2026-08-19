import Link from "next/link";
import type { Metadata } from "next";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen w-full pt-28 md:pt-32 px-3 md:px-5 pb-1.5 md:pb-2">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[0.95] text-black mb-8 md:mb-12">Services</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 md:gap-2 pb-16 md:pb-20">
          {services.map((service, i) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className={`rounded-xl md:rounded-2xl p-6 md:p-10 flex flex-col justify-between min-h-[220px] md:min-h-[260px] ${
                i % 2 === 0 ? "bg-stone-50" : "bg-zinc-200"
              } hover:opacity-80 transition-opacity`}
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-2xl md:text-4xl font-bold leading-[1.05] text-black">{service.name}</h2>
                <span className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full border border-black flex items-center justify-center text-xs md:text-sm font-semibold text-black">
                  {service.num}
                </span>
              </div>
              <p className="text-sm md:text-base font-semibold text-black">{service.tagline}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
