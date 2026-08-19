import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getServiceBySlug, services } from "@/data/services";

const arrowIconPath = "M1 7h12m0 0L8 2m5 5L8 12";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return { title: service.name.replace("\n", " ") };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const otherServices = services.filter((s) => s.slug !== service.slug);

  return (
    <main className="min-h-screen w-full pt-28 md:pt-32 px-3 md:px-5 pb-1.5 md:pb-2">
      <div className="max-w-5xl mx-auto">
        <Link href="/services" className="inline-block text-sm font-semibold text-ink-900 hover:text-ochre mb-8">
          &larr; Todos los servicios
        </Link>

        <div className="rounded-xl md:rounded-2xl bg-cream-2 p-6 md:p-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-1.5 md:mb-2">
          <div>
            <span className="text-xs md:text-sm font-semibold text-ink-900">{service.tagline}</span>
            <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[0.95] text-ink-900 mt-2 whitespace-pre-line">
              {service.name}
            </h1>
          </div>
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-ink-900 flex items-center justify-center text-sm md:text-base font-semibold text-ink-900 shrink-0">
            {service.num}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-1.5 md:gap-2 mb-1.5 md:mb-2">
          <div className="rounded-xl md:rounded-2xl bg-line p-6 md:p-10">
            <p className="text-base md:text-xl font-semibold text-ink-900 leading-relaxed">{service.description}</p>
          </div>
          <div className="rounded-xl md:rounded-2xl bg-ink-900 p-6 md:p-10 flex flex-col justify-between">
            <p className="text-xs md:text-sm font-semibold text-white mb-4">Qué incluye</p>
            <ul className="flex flex-col gap-3">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="text-sm md:text-base font-semibold text-white leading-snug">
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-xl md:rounded-2xl bg-cream-2 p-6 md:p-10 flex flex-wrap items-center justify-between gap-6 mb-8 md:mb-10">
          <div>
            <p className="text-xs md:text-sm font-semibold text-ink-900 mb-2">Consulta</p>
            <h3 className="text-xl md:text-3xl font-bold text-ink-900 leading-tight">
              ¿Listo para comenzar
              <br />
              con {service.name.replace("\n", " ")}?
            </h3>
          </div>
          <Link
            href="/book"
            className="px-5 py-3 md:px-8 md:py-5 bg-peach rounded-full text-ink-900 text-base md:text-xl font-bold hover:scale-105 hover:bg-peach-dark transition-transform inline-flex items-center gap-2"
          >
            Reservar
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="rotate-[-45deg]">
              <path d={arrowIconPath} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="pb-16 md:pb-20">
          <h4 className="text-sm font-semibold text-ink-900 uppercase tracking-tight mb-4">Otros servicios</h4>
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="px-5 py-3 rounded-full border border-ochre text-sm font-semibold text-ink-900 hover:bg-ink-900 hover:text-cream hover:border-ink-900 transition-colors duration-200"
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
