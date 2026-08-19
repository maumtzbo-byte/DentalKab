import { Link, Navigate, useParams } from "react-router-dom";
import { getServiceBySlug, services } from "../data/services";

const arrowIconPath = "M1 7h12m0 0L8 2m5 5L8 12";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const otherServices = services.filter((s) => s.slug !== service.slug);

  return (
    <main className="min-h-screen w-full pt-28 md:pt-32 px-3 md:px-5 pb-1.5 md:pb-2">
      <div className="max-w-5xl mx-auto">
        <Link to="/services" className="inline-block text-sm font-semibold text-black hover:text-neutral-500 mb-8">
          &larr; All Services
        </Link>

        <div className="rounded-xl md:rounded-2xl bg-stone-50 p-6 md:p-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-1.5 md:mb-2">
          <div>
            <span className="text-xs md:text-sm font-semibold text-black">{service.tagline}</span>
            <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[0.95] text-black mt-2 whitespace-pre-line">
              {service.name}
            </h1>
          </div>
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-black flex items-center justify-center text-sm md:text-base font-semibold text-black shrink-0">
            {service.num}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-1.5 md:gap-2 mb-1.5 md:mb-2">
          <div className="rounded-xl md:rounded-2xl bg-zinc-200 p-6 md:p-10">
            <p className="text-base md:text-xl font-semibold text-black leading-relaxed">{service.description}</p>
          </div>
          <div className="rounded-xl md:rounded-2xl bg-black p-6 md:p-10 flex flex-col justify-between">
            <p className="text-xs md:text-sm font-semibold text-white mb-4">What&apos;s included</p>
            <ul className="flex flex-col gap-3">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="text-sm md:text-base font-semibold text-white leading-snug">
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-xl md:rounded-2xl bg-stone-50 p-6 md:p-10 flex flex-wrap items-center justify-between gap-6 mb-8 md:mb-10">
          <div>
            <p className="text-xs md:text-sm font-semibold text-black mb-2">Consultation</p>
            <h3 className="text-xl md:text-3xl font-bold text-black leading-tight">
              Ready to get started
              <br />
              with {service.name.replace("\n", " ")}?
            </h3>
          </div>
          <Link
            to="/book"
            className="px-5 py-3 md:px-8 md:py-5 bg-black rounded-full text-white text-base md:text-xl font-bold hover:scale-105 transition-transform inline-flex items-center gap-2"
          >
            Book Online
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="rotate-[-45deg]">
              <path d={arrowIconPath} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="pb-16 md:pb-20">
          <h4 className="text-sm font-semibold text-black uppercase tracking-tight mb-4">Other services</h4>
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="px-5 py-3 rounded-full border border-black text-sm font-semibold text-black hover:bg-black hover:text-white transition-colors duration-200"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
