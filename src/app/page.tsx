import Link from "next/link";
import { services } from "@/data/services";

const PHOTO_1 =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_113640_ccf3cf97-d447-425b-a134-d7b09fc743fc.png&w=1280&q=85";
const PHOTO_2 =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114219_414dfe80-f15c-4e25-bf52-b13721f4bd88.png&w=1280&q=85";
const PHOTO_3 =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114355_752ba9e6-0942-4abb-9047-5d9bb16632e9.png&w=1280&q=85";

const arrowIconPath = "M1 7h12m0 0L8 2m5 5L8 12";

const toothIcon = (
  <>
    <path d="M32 16C18 4 6 12 8 30c2 18 8 38 17 58 3 6 6 10 9 10 4 0 5-16 7-24 1-6 5-9 9-9s8 3 9 9c2 8 3 24 7 24 3 0 6-4 9-10 9-20 15-40 17-58 2-18-10-26-24-14-7 6-12 9-18 9s-13-3-20-9Z" />
    <path d="M39 42c4 8 18 8 22 0" />
  </>
);

const benefits = [
  {
    title: "Atención Personalizada",
    text: "Un plan de tratamiento pensado para tus necesidades.",
    bg: "bg-peach-light",
    icon: (
      <path d="M20.5 8.3c0-2.4-2-4.3-4.4-4.3-1.6 0-3 .9-3.7 2.2h-.8c-.7-1.3-2.1-2.2-3.7-2.2-2.4 0-4.4 1.9-4.4 4.3 0 5 8 10.4 8 10.4s8-5.4 8-10.4Z" />
    ),
  },
  {
    title: "Tecnología Moderna",
    text: "Equipo actualizado para tu comodidad y seguridad.",
    bg: "bg-cream-2",
    icon: (
      <path d="M12 3c-2.5 0-4 1.6-4 4.2 0 2.7 1 6.7 1.8 9.4.3 1 .6 1.9 1.4 1.9.9 0 1-1.6 1.2-2.6.2-1 .6-1.6 1.6-1.6s1.4.6 1.6 1.6c.2 1 .3 2.6 1.2 2.6.8 0 1.1-.9 1.4-1.9.8-2.7 1.8-6.7 1.8-9.4C20 4.6 18.5 3 16 3c-1.1 0-1.9.4-2.7.9-.5.3-.7.3-1.2 0-.8-.5-1.6-.9-2.7-.9Z" />
    ),
  },
  {
    title: "Horarios Flexibles",
    text: "Nos adaptamos a tu agenda para que siempre puedas venir.",
    bg: "bg-line",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
      </>
    ),
  },
  {
    title: "Personal Certificado",
    text: "Especialistas capacitados en cada área de la odontología.",
    bg: "bg-peach-light",
    icon: (
      <>
        <path d="M12 3 4.5 5.5v5.2c0 5 3.2 8.4 7.5 10.3 4.3-1.9 7.5-5.3 7.5-10.3V5.5L12 3Z" />
        <path d="m9 12 2.2 2.2L15.5 10" />
      </>
    ),
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="pt-28 md:pt-36 px-4 md:px-8 pb-14 md:pb-20 bg-cream-2">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-cream text-ochre-dark text-xs md:text-sm font-semibold mb-5 md:mb-6">
            Tratamientos Dentales
          </span>
          <h1 className="text-[clamp(2.25rem,5.5vw,3.75rem)] font-bold leading-[1.05] text-ink-900 mb-8 md:mb-10 max-w-3xl mx-auto">
            Cuidado dental para cada etapa de tu sonrisa
          </h1>

          <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:justify-center md:flex-wrap snap-x">
            {services.map((service, i) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="shrink-0 snap-start w-40 md:w-48 rounded-2xl bg-cream p-5 md:p-6 flex flex-col items-center text-center gap-4 hover:opacity-85 transition-opacity"
              >
                <span
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shrink-0 ${
                    i % 2 === 0 ? "bg-peach-light" : "bg-line"
                  }`}
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 100 108"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-ochre-dark"
                  >
                    {toothIcon}
                  </svg>
                </span>
                <span className="text-sm md:text-base font-bold text-ink-900 leading-tight">{service.name}</span>
              </Link>
            ))}
          </div>

          <Link
            href="/services"
            className="inline-block mt-6 md:mt-8 px-7 py-3.5 rounded-full border border-ink-900 text-ink-900 text-sm md:text-base font-bold hover:bg-ink-900 hover:text-cream transition-colors"
          >
            Ver todos los servicios
          </Link>
        </div>
      </section>

      {/* Cómo comenzar */}
      <section className="px-4 md:px-8 py-14 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <span className="block text-xs md:text-sm font-semibold text-ochre-dark mb-3">¿Cómo comenzar?</span>
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.1] text-ink-900 mb-4 md:mb-5">
            Agenda tu consulta inicial
          </h2>
          <p className="text-sm md:text-base text-ink-700 leading-relaxed mb-7 md:mb-9">
            Cuéntanos qué necesitas y nuestro equipo te ayudará a encontrar el tratamiento ideal para ti y tu
            familia.
          </p>
          <Link
            href="/book"
            className="inline-block px-8 py-4 bg-peach rounded-full text-ink-900 text-base font-bold hover:bg-peach-dark hover:scale-105 transition-all"
          >
            Reservar Cita
          </Link>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section id="nosotros" className="px-4 md:px-8 py-14 md:py-24 bg-cream-2 scroll-mt-24">
        <div className="max-w-5xl mx-auto text-center mb-10 md:mb-14">
          <span className="block text-xs md:text-sm font-semibold text-ochre-dark mb-3">¿Por qué elegir Dental Kab?</span>
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.1] text-ink-900 mb-6 md:mb-8 max-w-2xl mx-auto">
            Tu bienestar dental es nuestra prioridad
          </h2>
          <Link
            href="/book"
            className="inline-block px-8 py-4 bg-peach rounded-full text-ink-900 text-base font-bold hover:bg-peach-dark hover:scale-105 transition-all"
          >
            Reservar Cita
          </Link>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="rounded-2xl bg-cream p-6 md:p-7 flex gap-5 items-start">
              <span className={`w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-full flex items-center justify-center ${benefit.bg}`}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-ochre-dark"
                >
                  {benefit.icon}
                </svg>
              </span>
              <div>
                <h3 className="text-base md:text-lg font-bold text-ink-900 mb-1">{benefit.title}</h3>
                <p className="text-sm text-ink-700 leading-relaxed">{benefit.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand statement + photos */}
      <section className="px-4 md:px-8 py-14 md:py-24">
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-14">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] mb-2">
            <span className="text-ochre">Dental Kab</span> <span className="text-ink-900">para toda tu familia</span>
          </h2>
          <p className="text-sm md:text-base text-ink-700 leading-relaxed max-w-xl mx-auto mb-7 md:mb-9">
            Tratamientos dentales para cuidar la sonrisa de toda tu familia, con atención cercana y personalizada.
          </p>
          <Link
            href="/book"
            className="inline-block px-8 py-4 bg-peach rounded-full text-ink-900 text-base font-bold hover:bg-peach-dark hover:scale-105 transition-all"
          >
            Reservar Cita
          </Link>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-3 md:gap-4 h-64 md:h-96">
          <div className="rounded-2xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PHOTO_1} alt="Paciente sonriendo" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PHOTO_2} alt="Paciente feliz con su sonrisa" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PHOTO_3} alt="Paciente satisfecho" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Ubicación */}
      <section id="ubicacion" className="px-4 md:px-8 pb-14 md:pb-24 scroll-mt-24">
        <div className="max-w-5xl mx-auto rounded-2xl md:rounded-3xl bg-cream-2 px-6 py-10 md:px-14 md:py-14 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="block text-xs md:text-sm font-semibold text-ochre-dark mb-2">Ubicación</span>
            <h2 className="text-2xl md:text-3xl font-bold text-ink-900 mb-2">Ven a visitarnos</h2>
            <p className="text-sm md:text-base text-ink-700">Encuentra nuestra clínica en Google Maps.</p>
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Dental+Kab"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-peach rounded-full text-ink-900 text-base font-bold hover:bg-peach-dark hover:scale-105 transition-all"
          >
            Nuestra Ubicación
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="rotate-[-45deg]">
              <path d={arrowIconPath} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
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
