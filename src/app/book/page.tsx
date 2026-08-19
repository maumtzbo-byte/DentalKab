"use client";

import { useState, type FormEvent } from "react";
import { services } from "@/data/services";
import { supabase } from "@/lib/supabase";

type Status = "idle" | "submitting" | "success" | "error";

export default function BookPage() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = new FormData(event.currentTarget);
    const { error } = await supabase.from("appointments").insert({
      full_name: form.get("full_name"),
      phone: form.get("phone"),
      email: form.get("email") || null,
      service: form.get("service"),
      preferred_date: form.get("preferred_date") || null,
      message: form.get("message") || null,
    });

    if (error) {
      setStatus("error");
      return;
    }

    setStatus("success");
    event.currentTarget.reset();
  }

  return (
    <main className="min-h-screen w-full pt-28 md:pt-32 px-3 md:px-5 pb-16 md:pb-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[0.95] text-ink-900 mb-3">Reservar Cita</h1>
        <p className="text-sm md:text-base font-semibold text-ink-900 mb-8 md:mb-12">
          Solicita un horario y nuestro equipo confirmará tu cita.
        </p>

        <form onSubmit={handleSubmit} className="rounded-xl md:rounded-2xl bg-cream-2 p-6 md:p-10 flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <label className="flex flex-col gap-2 text-sm font-semibold text-ink-900">
              Nombre completo
              <input
                name="full_name"
                type="text"
                required
                placeholder="Tu nombre"
                className="rounded-lg border border-line bg-cream px-4 py-3 text-base font-normal text-ink-900 outline-none focus:border-ochre"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-ink-900">
              Teléfono
              <input
                name="phone"
                type="tel"
                required
                placeholder="(000) 000-0000"
                className="rounded-lg border border-line bg-cream px-4 py-3 text-base font-normal text-ink-900 outline-none focus:border-ochre"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2 text-sm font-semibold text-ink-900">
            Correo electrónico
            <input
              name="email"
              type="email"
              placeholder="tucorreo@ejemplo.com"
              className="rounded-lg border border-line bg-cream px-4 py-3 text-base font-normal text-ink-900 outline-none focus:border-ochre"
            />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <label className="flex flex-col gap-2 text-sm font-semibold text-ink-900">
              Servicio
              <select
                name="service"
                required
                defaultValue=""
                className="rounded-lg border border-line bg-cream px-4 py-3 text-base font-normal text-ink-900 outline-none focus:border-ochre"
              >
                <option value="" disabled>
                  Selecciona un servicio
                </option>
                {services.map((service) => (
                  <option key={service.slug} value={service.name.replace("\n", " ")}>
                    {service.name.replace("\n", " ")}
                  </option>
                ))}
                <option value="Consulta General">Consulta General</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-ink-900">
              Fecha preferida
              <input
                name="preferred_date"
                type="date"
                className="rounded-lg border border-line bg-cream px-4 py-3 text-base font-normal text-ink-900 outline-none focus:border-ochre"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2 text-sm font-semibold text-ink-900">
            Mensaje (opcional)
            <textarea
              name="message"
              rows={3}
              placeholder="Cuéntanos un poco sobre lo que necesitas"
              className="rounded-lg border border-line bg-cream px-4 py-3 text-base font-normal text-ink-900 outline-none focus:border-ochre resize-y"
            />
          </label>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-2 px-8 py-4 bg-peach rounded-full text-ink-900 text-base font-bold hover:scale-[1.02] hover:bg-peach-dark transition-transform disabled:opacity-50 disabled:hover:scale-100"
          >
            {status === "submitting" ? "Enviando..." : "Solicitar Cita"}
          </button>

          {status === "success" ? (
            <p className="text-sm font-semibold text-ink-900 bg-cream rounded-lg px-4 py-3 border border-line">
              Gracias — tu solicitud fue enviada. Te contactaremos para confirmar tu cita.
            </p>
          ) : null}
          {status === "error" ? (
            <p className="text-sm font-semibold text-red-700 bg-cream rounded-lg px-4 py-3 border border-red-200">
              Algo salió mal al enviar tu solicitud. Por favor intenta de nuevo.
            </p>
          ) : null}
        </form>
      </div>
    </main>
  );
}
