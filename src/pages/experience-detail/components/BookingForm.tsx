import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import {
  experiencesData,
  experienceSchedules,
  experiencePricing,
} from "@/mocks/experiences";
import ExperienceCard from "@/pages/experience-detail/components/booking/ExperienceCard";
import ScheduleCard from "@/pages/experience-detail/components/booking/ScheduleCard";
import GuestCounter from "@/pages/experience-detail/components/booking/GuestCounter";
import BookingSummary from "@/pages/experience-detail/components/booking/BookingSummary";
import {
  formatScheduleDate,
  formatScheduleTime,
} from "@/pages/experience-detail/components/booking/formatSchedule";

const FORM_ID = "db6fv6sbe24agvuu3j80";
const SUBMIT_ADDR = "https://readdy.ai/api/form/db6fv6sbe24agvuu3j80";
const WHATSAPP_HREF = "https://wa.me/56923895542";
const GENERIC_ERROR = "We could not send your request. Please try again.";

interface BookingFormProps {
  exp?: any;
}

type FormStatus = "idle" | "loading" | "error";

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
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [guests, setGuests] = useState(1);
  const [email, setEmail] = useState("");

  const schedule = useMemo(() => {
    const schedules = exp?.schedules;

    if (!schedules?.length) {
      console.log("No schedules found");
      return null;
    }

    const availableSchedule = schedules.find(
      (item) => item.status === "AVAILABLE",
    );

    return availableSchedule ?? null;
  }, [exp]);

  const maxGuests = Math.max(1, schedule?.capacity ?? 0);
  const pricing = exp?.id ? experiencePricing[exp?.id] : undefined;
  const pricePerPerson = pricing?.pricePerPerson;
  const currency = pricing?.currency ?? "USD";

  useEffect(() => {
    setGuests(1);
    setEmail("");
  }, [exp?.id]);

  useEffect(() => {
    setGuests((current) => Math.min(Math.max(1, current), maxGuests));
  }, [maxGuests]);

  const experienceName = exp ? t(exp.titleKey) : "";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Anti-spam honeypot: if filled, silently ignore without sending anything.
    const honeypot = String(formData.get("website_alt") || "").trim();
    if (honeypot) {
      setStatus("idle");
      form.reset();
      setGuests(1);
      setEmail("");
      return;
    }

    setStatus("loading");
    setErrorMsg("");
    formData.delete("website_alt");

    try {
      const response = await fetch(SUBMIT_ADDR, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });

      const responseText = await response.text();
      let parsed: any = null;
      try {
        parsed = JSON.parse(responseText);
      } catch {
        parsed = null;
      }

      const serverMsg =
        parsed?.meta?.message ||
        parsed?.message ||
        parsed?.meta?.detail ||
        responseText ||
        "";
      const isSpam =
        typeof serverMsg === "string" &&
        serverMsg.toLowerCase().includes("spam");
      const isOk = response.ok && parsed?.code === "OK";

      if (isOk && !isSpam) {
        setStatus("idle");
        form.reset();
        setGuests(1);
        setEmail("");
      } else {
        setErrorMsg(isSpam && serverMsg ? serverMsg : GENERIC_ERROR);
        setStatus("error");
      }
    } catch {
      setErrorMsg(GENERIC_ERROR);
      setStatus("error");
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
                Ready to experience Santiago? Complete your details and
                we&apos;ll take care of the rest.
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
                id={FORM_ID}
                onSubmit={handleSubmit}
                data-readdy-form
                className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100"
              >
                <ExperienceCard
                  img={exp?.coverImage.path ?? ""}
                  title={exp.name}
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
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Email address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="you@email.com"
                        value={email}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          setEmail(event.target.value)
                        }
                        className={inputClass}
                      />
                      <input type="hidden" name="contactEmail" value={email} />
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
                    maxLength={500}
                    placeholder="Any questions, accessibility needs or special requirements?"
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Backend-managed values */}
                <input
                  type="hidden"
                  name="experienceName"
                  value={experienceName}
                />
                <input
                  type="hidden"
                  name="experienceId"
                  value={exp?.id ?? ""}
                />
                <input
                  type="hidden"
                  name="scheduleId"
                  value={schedule?.id ?? ""}
                />

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
                    experienceName={exp.name}
                    dateLabel={schedule ? formatScheduleDate(schedule) : "—"}
                    timeLabel={schedule ? formatScheduleTime(schedule) : "—"}
                    guests={guests}
                    pricePerPerson={pricePerPerson}
                    currency={currency}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "loading" || !schedule}
                  className="mt-6 w-full flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-full hover:bg-accent-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                >
                  {status === "loading" ? (
                    <>
                      <i className="ri-loader-4-line animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send booking request</span>
                      <i className="ri-arrow-right-line" />
                    </>
                  )}
                </button>
                <p className="text-center text-gray-400 text-xs mt-3">
                  We&apos;ll confirm your booking by email or WhatsApp.
                </p>

                {status === "error" && (
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
