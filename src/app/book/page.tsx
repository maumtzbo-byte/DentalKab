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
        <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[0.95] text-ink-900 mb-3">Book Online</h1>
        <p className="text-sm md:text-base font-semibold text-ink-900 mb-8 md:mb-12">
          Request a time and our team will confirm your appointment.
        </p>

        <form onSubmit={handleSubmit} className="rounded-xl md:rounded-2xl bg-cream-2 p-6 md:p-10 flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <label className="flex flex-col gap-2 text-sm font-semibold text-ink-900">
              Full name
              <input
                name="full_name"
                type="text"
                required
                placeholder="Your name"
                className="rounded-lg border border-line bg-cream px-4 py-3 text-base font-normal text-ink-900 outline-none focus:border-ochre"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-ink-900">
              Phone
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
            Email
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="rounded-lg border border-line bg-cream px-4 py-3 text-base font-normal text-ink-900 outline-none focus:border-ochre"
            />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <label className="flex flex-col gap-2 text-sm font-semibold text-ink-900">
              Service
              <select
                name="service"
                required
                defaultValue=""
                className="rounded-lg border border-line bg-cream px-4 py-3 text-base font-normal text-ink-900 outline-none focus:border-ochre"
              >
                <option value="" disabled>
                  Select a service
                </option>
                {services.map((service) => (
                  <option key={service.slug} value={service.name.replace("\n", " ")}>
                    {service.name.replace("\n", " ")}
                  </option>
                ))}
                <option value="General Consultation">General Consultation</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-ink-900">
              Preferred date
              <input
                name="preferred_date"
                type="date"
                className="rounded-lg border border-line bg-cream px-4 py-3 text-base font-normal text-ink-900 outline-none focus:border-ochre"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2 text-sm font-semibold text-ink-900">
            Message (optional)
            <textarea
              name="message"
              rows={3}
              placeholder="Tell us a bit about what you need"
              className="rounded-lg border border-line bg-cream px-4 py-3 text-base font-normal text-ink-900 outline-none focus:border-ochre resize-y"
            />
          </label>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-2 px-8 py-4 bg-peach rounded-full text-ink-900 text-base font-bold hover:scale-[1.02] hover:bg-peach-dark transition-transform disabled:opacity-50 disabled:hover:scale-100"
          >
            {status === "submitting" ? "Sending..." : "Request Appointment"}
          </button>

          {status === "success" ? (
            <p className="text-sm font-semibold text-ink-900 bg-cream rounded-lg px-4 py-3 border border-line">
              Thanks — your request was sent. We&apos;ll contact you to confirm your appointment.
            </p>
          ) : null}
          {status === "error" ? (
            <p className="text-sm font-semibold text-red-700 bg-cream rounded-lg px-4 py-3 border border-red-200">
              Something went wrong sending your request. Please try again.
            </p>
          ) : null}
        </form>
      </div>
    </main>
  );
}
