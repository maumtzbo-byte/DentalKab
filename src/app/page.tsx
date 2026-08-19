import Link from "next/link";
import { services } from "@/data/services";

const HERO_IMAGE =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_113640_ccf3cf97-d447-425b-a134-d7b09fc743fc.png&w=1280&q=85";

const arrowIconPath = "M1 7h12m0 0L8 2m5 5L8 12";

const features = [
  {
    title: "Odontología Avanzada",
    text: "Tratamientos con tecnología moderna y protocolos actualizados.",
    icon: (
      <path d="M12 3c-2.5 0-4 1.6-4 4.2 0 2.7 1 6.7 1.8 9.4.3 1 .6 1.9 1.4 1.9.9 0 1-1.6 1.2-2.6.2-1 .6-1.6 1.6-1.6s1.4.6 1.6 1.6c.2 1 .3 2.6 1.2 2.6.8 0 1.1-.9 1.4-1.9.8-2.7 1.8-6.7 1.8-9.4C20 4.6 18.5 3 16 3c-1.1 0-1.9.4-2.7.9-.5.3-.7.3-1.2 0-.8-.5-1.6-.9-2.7-.9Z" />
    ),
  },
  {
    title: "Equipo de Alta Calidad",
    text: "Instrumental y materiales certificados para tu seguridad.",
    icon: (
      <>
        <path d="M12 3 4.5 5.5v5.2c0 5 3.2 8.4 7.5 10.3 4.3-1.9 7.5-5.3 7.5-10.3V5.5L12 3Z" />
        <path d="m9 12 2.2 2.2L15.5 10" />
      </>
    ),
  },
  {
    title: "Personal Amable",
    text: "Un equipo cálido que te acompaña en cada visita.",
    icon: (
      <path d="M20.5 8.3c0-2.4-2-4.3-4.4-4.3-1.6 0-3 .9-3.7 2.2h-.8c-.7-1.3-2.1-2.2-3.7-2.2-2.4 0-4.4 1.9-4.4 4.3 0 5 8 10.4 8 10.4s8-5.4 8-10.4Z" />
    ),
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="pt-28 md:pt-36 px-4 md:px-8 pb-12 md:pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-cream-2 text-ochre-dark text-xs md:text-sm font-semibold mb-5 md:mb-6">
              Atención dental de calidad
            </span>
            <h1 className="text-[clamp(2.5rem,6vw,4.25rem)] font-bold leading-[1.05] text-ink-900 mb-5 md:mb-6">
              Tu sonrisa, en las mejores manos
            </h1>
            <p className="text-base md:text-lg text-ink-700 leading-relaxed mb-8 md:mb-10 max-w-md">
              Ofrecemos servicios dentales profesionales que van a la par de la tecnología actual, con un equipo
              dedicado a cuidar tu salud bucal.
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4">
              <Link
                href="/book"
                className="px-7 py-3.5 md:px-8 md:py-4 bg-peach rounded-full text-ink-900 text-sm md:text-base font-bold hover:bg-peach-dark hover:scale-105 transition-all"
              >
                Reservar Cita
              </Link>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Dental+Kab"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 md:px-8 md:py-4 rounded-full border border-ochre text-ink-900 text-sm md:text-base font-bold hover:bg-ink-900 hover:text-cream hover:border-ink-900 transition-colors"
              >
                Nuestra Ubicación
              </a>
            </div>
          </div>

          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden aspect-[4/3] md:aspect-square">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={HERO_IMAGE} alt="Paciente sonriendo" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 md:px-8 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-2xl bg-cream-2 p-6 md:p-8">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-ochre mb-4 md:mb-5"
              >
                {feature.icon}
              </svg>
              <h3 className="text-lg md:text-xl font-bold text-ink-900 mb-2">{feature.title}</h3>
              <p className="text-sm md:text-base text-ink-700 leading-relaxed">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="px-4 md:px-8 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8 md:mb-10">
            <div>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] text-ink-900 mb-2">
                Nuestros Servicios
              </h2>
              <p className="text-sm md:text-base text-ink-700">
                Tratamientos dentales completos para toda la familia.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm md:text-base font-semibold text-ink-900 hover:text-ochre transition-colors"
            >
              Ver todos los servicios
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="rotate-[-45deg]">
                <path d={arrowIconPath} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {services.map((service, i) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={`rounded-2xl p-6 md:p-7 flex flex-col justify-between min-h-[200px] hover:opacity-85 transition-opacity ${
                  i % 2 === 0 ? "bg-cream-2" : "bg-line"
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <h3 className="text-xl md:text-2xl font-bold leading-[1.1] text-ink-900">{service.name}</h3>
                  <span className="w-9 h-9 md:w-10 md:h-10 shrink-0 rounded-full border border-ink-900 flex items-center justify-center text-xs font-semibold text-ink-900">
                    {service.num}
                  </span>
                </div>
                <p className="text-sm font-semibold text-ink-700">{service.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="px-4 md:px-8 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto rounded-2xl md:rounded-3xl bg-ink-900 px-6 py-12 md:px-16 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-cream mb-2 md:mb-3">¿Listo para tu próxima cita?</h2>
            <p className="text-sm md:text-base text-cream/80">
              Agenda en línea y nuestro equipo confirmará tu horario.
            </p>
          </div>
          <Link
            href="/book"
            className="shrink-0 px-8 py-4 bg-peach rounded-full text-ink-900 text-base font-bold hover:bg-peach-dark hover:scale-105 transition-all"
          >
            Reservar Cita
          </Link>
        </div>
      </section>
    </main>
  );
}
