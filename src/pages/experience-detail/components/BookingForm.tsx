import { useEffect, useMemo, useState } from "react";

import type { ChangeEvent, FormEvent } from "react";

import { useTranslation } from "react-i18next";

import { experiencePricing } from "@/mocks/experiences";

import ExperienceCard from "@/pages/experience-detail/components/booking/ExperienceCard";

import ScheduleCard from "@/pages/experience-detail/components/booking/ScheduleCard";

import GuestCounter from "@/pages/experience-detail/components/booking/GuestCounter";

import BookingSummary from "@/pages/experience-detail/components/booking/BookingSummary";

import {
  formatScheduleDate,
  formatScheduleTime,
} from "@/pages/experience-detail/components/booking/formatSchedule";

import { useCreateBooking } from "@/hooks/useCreateBooking";

import { useCreateStripeCheckout } from "@/hooks/useCreateStripeCheckout";

const WHATSAPP_HREF = "https://wa.me/56923895542";

const GENERIC_ERROR = "We could not start your booking. Please try again.";

interface BookingFormProps {
  exp?: any;
}

const BENEFITS = [
  {
    icon: "ri-translate-2",
    title: "Bilingual host",
    desc: "Spanish and English assistance.",
  },
  {
    icon: "ri-group-line",
    title: "Small groups",
    desc: "Personalized cultural experiences.",
  },
];

const inputClass =
  "w-full px-4 py-3 bg-surface/70 border border-gray-200 rounded-lg text-primary text-sm placeholder-gray-400 focus:outline-none focus:border-accent transition-colors";

const labelClass =
  "block text-gray-500 text-xs font-medium uppercase tracking-wider mb-2";

export default function BookingForm({ exp }: BookingFormProps) {
  const { t } = useTranslation();

  const [errorMsg, setErrorMsg] = useState("");

  const [guests, setGuests] = useState(1);

  const [email, setEmail] = useState("");

  const createBookingMutation = useCreateBooking();

  const createStripeCheckoutMutation = useCreateStripeCheckout();

  const schedule = useMemo(() => {
    const schedules = exp?.schedules;

    if (!schedules?.length) {
      console.log("No schedules found");

      return null;
    }

    const availableSchedule = schedules.find(
      (item: any) => item.status === "AVAILABLE",
    );

    return availableSchedule ?? null;
  }, [exp]);

  const maxGuests = Math.max(1, schedule?.capacity ?? 0);

  const pricePerPerson = exp?.price;

  const currency = exp?.currency ?? "USD";

  const isLoading =
    createBookingMutation.isPending || createStripeCheckoutMutation.isPending;

  useEffect(() => {
    setGuests(1);
    setEmail("");
    setErrorMsg("");
  }, [exp?.id]);

  useEffect(() => {
    setGuests((current) => Math.min(Math.max(1, current), maxGuests));
  }, [maxGuests]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const honeypot = String(formData.get("website_alt") || "").trim();

    if (honeypot) {
      return;
    }

    if (!schedule) {
      setErrorMsg("No schedule is currently available.");

      return;
    }

    setErrorMsg("");

    try {
      // 1. Crear reserva
      const booking = await createBookingMutation.mutateAsync({
        scheduleId: schedule.id,

        contactName: String(formData.get("contactName") || "").trim(),

        contactEmail: email.trim(),

        contactPhone:
          String(formData.get("contactPhone") || "").trim() || undefined,

        peopleCount: guests,

        specialRequests:
          String(formData.get("specialRequests") || "").trim() || undefined,
      });

      // 2. Crear Checkout de Stripe
      const checkout = await createStripeCheckoutMutation.mutateAsync(
        booking.id,
      );

      if (!checkout.checkoutUrl) {
        throw new Error("Stripe checkout URL was not returned");
      }

      // 3. Ir a Stripe
      window.location.href = checkout.checkoutUrl;
    } catch (error) {
      console.error("Booking error:", error);

      setErrorMsg("We could not start your booking. Please try again.");
    }
  };

  return (
    <section id="reserva" className="bg-surface py-16 md:py-24 lg:py-28">
      <div className="section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            {/* Intro */}
            <div className="lg:col-span-2">
              <p className="text-accent text-sm font-medium tracking-[0.15em] uppercase mb-4">
                Booking
              </p>

              <h2 className="font-display text-3xl md:text-4xl text-primary font-bold mb-4 leading-tight">
                Book your experience
              </h2>

              <p className="text-gray-600 text-base leading-relaxed mb-8">
                Ready to experience Santiago? Complete your details and continue
                securely to payment.
              </p>

              <ul className="space-y-4 mb-8">
                {BENEFITS.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 rounded-md bg-accent/10">
                      <i className={`${item.icon} text-accent text-sm`} />
                    </div>

                    <div>
                      <p className="text-primary text-sm font-semibold">
                        {item.title}
                      </p>

                      <p className="text-gray-500 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary border border-gray-200 rounded-full px-5 py-3 hover:border-accent hover:text-accent transition-colors whitespace-nowrap"
              >
                <i className="ri-whatsapp-line text-base" />
                Ask by WhatsApp
              </a>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100"
              >
                <ExperienceCard
                  img={exp?.coverImage?.path ?? ""}
                  title={exp?.name ?? ""}
                  subtitle={exp ? t(exp.description) : ""}
                />

                <ScheduleCard
                  schedule={schedule}
                  whatsappHref={WHATSAPP_HREF}
                />

                {/* Contact details */}
                <p className="text-gray-400 text-[11px] font-semibold uppercase tracking-wider mb-4">
                  Contact details
                </p>

                <div className="space-y-5">
                  <div>
                    <label className={labelClass}>Full name</label>

                    <input
                      type="text"
                      name="contactName"
                      required
                      maxLength={150}
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Email address</label>

                      <input
                        type="email"
                        name="contactEmail"
                        required
                        maxLength={150}
                        placeholder="you@email.com"
                        value={email}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          setEmail(event.target.value)
                        }
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        WhatsApp / Phone{" "}
                        <span className="normal-case tracking-normal text-gray-400">
                          (optional)
                        </span>
                      </label>

                      <input
                        type="tel"
                        name="contactPhone"
                        maxLength={50}
                        placeholder="+1 555 123 4567"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <GuestCounter
                    value={guests}
                    min={1}
                    max={maxGuests}
                    onChange={setGuests}
                  />
                </div>

                {/* Special requests */}
                <div className="mt-6">
                  <label className={labelClass}>
                    Special requests (optional)
                  </label>

                  <textarea
                    name="specialRequests"
                    rows={3}
                    maxLength={2000}
                    placeholder="Any questions, accessibility needs or special requirements?"
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Honeypot */}
                <input
                  type="text"
                  name="website_alt"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  readOnly
                  className="contact-extra"
                />

                {/* Booking summary */}
                <div className="mt-6">
                  <BookingSummary
                    experienceName={exp?.name ?? ""}
                    dateLabel={schedule ? formatScheduleDate(schedule) : "—"}
                    timeLabel={schedule ? formatScheduleTime(schedule) : "—"}
                    guests={guests}
                    pricePerPerson={Number(pricePerPerson)}
                    currency={currency}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading || !schedule}
                  className="mt-6 w-full flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-full hover:bg-accent-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <i className="ri-loader-4-line animate-spin" />

                      <span>Preparing payment...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue to payment</span>

                      <i className="ri-arrow-right-line" />
                    </>
                  )}
                </button>

                <p className="text-center text-gray-400 text-xs mt-3">
                  You'll be redirected to Stripe to complete your secure
                  payment.
                </p>

                {errorMsg && (
                  <div className="mt-4 flex items-start gap-2 text-sm text-accent bg-accent/5 border border-accent/20 rounded-lg px-4 py-3">
                    <i className="ri-error-warning-line mt-0.5" />

                    <span>{errorMsg}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
