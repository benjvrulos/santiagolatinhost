import type { ChangeEvent, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import ExperienceCard from "@/pages/experience-detail/components/booking/ExperienceCard";
import ScheduleCard from "@/pages/experience-detail/components/booking/ScheduleCard";
import GuestCounter from "@/pages/experience-detail/components/booking/GuestCounter";
import BookingSummary from "@/pages/experience-detail/components/booking/BookingSummary";

import { formatScheduleDate, formatScheduleTime } from "@/utils/formatSchedule";

import type { Experience } from "@/types/experience.interface";
import type { BookingDetail } from "@/types/booking.interface";
import { useBookingForm } from "@/hooks/useBookingForm";
import { WHATSAPP_HREF } from "@/constants/booking.constants";

interface BookingFormProps {
  exp: Experience;
  booking?: BookingDetail;
  mode?: "create" | "edit";
  onCancelEdit?: () => void;
}
const inputClass =
  "w-full px-4 py-3 bg-surface/70 border border-gray-200 rounded-lg text-primary text-sm placeholder-gray-400 focus:outline-none focus:border-accent transition-colors";

const labelClass =
  "block text-gray-500 text-xs font-medium uppercase tracking-wider mb-2";

export default function BookingForm({
  exp,
  booking,
  mode = "create",
  onCancelEdit,
}: BookingFormProps) {
  const { t, i18n } = useTranslation();

  const {
    schedule,
    guests,
    setGuests,
    email,
    setEmail,
    maxGuests,
    isLoading,
    errorMsg,
    handleSubmit,
  } = useBookingForm({
    exp,
    booking,
    mode,
  });
  const pricePerPerson = exp.price;

  const currency = exp.currency ?? "USD";

  return (
    <section id="reserva" className="bg-surface py-16 md:py-24 lg:py-28">
      <div className="section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            {/* INTRO */}
            <div className="lg:col-span-2">
              <p className="text-accent text-sm font-medium tracking-[0.15em] uppercase mb-4">
                {mode === "edit"
                  ? t("exp_booking_edit_label", {
                      defaultValue: "Modify booking",
                    })
                  : t("exp_booking_label")}
              </p>

              <h2 className="font-display text-3xl md:text-4xl text-primary font-bold mb-4 leading-tight">
                {mode === "edit"
                  ? t("exp_booking_edit_title", {
                      defaultValue: "Update your booking",
                    })
                  : t("exp_booking_title")}
              </h2>

              {mode === "edit" && booking && (
                <p className="text-gray-500 text-sm mb-6">
                  {t("pending_booking_reference", {
                    defaultValue: "Booking",
                  })}{" "}
                  #{booking.id}
                </p>
              )}

              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary border border-gray-200 rounded-full px-5 py-3 hover:border-accent hover:text-accent transition-colors whitespace-nowrap"
              >
                <i className="ri-whatsapp-line text-base" />

                {t("exp_booking_whatsapp_help", {
                  defaultValue: "Ask by WhatsApp",
                })}
              </a>
            </div>

            {/* FORM */}
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

                {/* CONTACT DETAILS */}
                <p className="text-gray-400 text-[11px] font-semibold uppercase tracking-wider mb-4">
                  {t("exp_booking_contact_label")}
                </p>

                <div className="space-y-5">
                  {/* NAME */}
                  <div>
                    <label className={labelClass}>
                      {t("exp_booking_name")}
                    </label>

                    <input
                      type="text"
                      name="contactName"
                      required
                      maxLength={150}
                      placeholder={t("exp_booking_name_ph")}
                      defaultValue={booking?.contactName ?? ""}
                      className={inputClass}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* EMAIL */}
                    <div>
                      <label className={labelClass}>
                        {t("exp_booking_email")}
                      </label>

                      <input
                        type="email"
                        name="contactEmail"
                        required
                        maxLength={150}
                        placeholder={t("exp_booking_email_ph")}
                        value={email}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          setEmail(event.target.value)
                        }
                        className={inputClass}
                      />
                    </div>

                    {/* PHONE */}
                    <div>
                      <label className={labelClass}>
                        {t("exp_booking_whatsapp")}{" "}
                        <span className="normal-case tracking-normal text-gray-400">
                          {t("exp_booking_optional")}
                        </span>
                      </label>

                      <input
                        type="tel"
                        name="contactPhone"
                        maxLength={50}
                        placeholder={t("exp_booking_whatsapp_ph")}
                        defaultValue={booking?.contactPhone ?? ""}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* PEOPLE */}
                  <GuestCounter
                    value={guests}
                    min={1}
                    max={maxGuests}
                    onChange={setGuests}
                  />
                </div>

                {/* SPECIAL REQUESTS */}
                <div className="mt-6">
                  <label className={labelClass}>
                    {t("exp_booking_notes")}{" "}
                    <span className="normal-case tracking-normal text-gray-400">
                      {t("exp_booking_optional")}
                    </span>
                  </label>

                  <textarea
                    name="specialRequests"
                    rows={3}
                    maxLength={2000}
                    placeholder={t("exp_booking_notes_ph")}
                    defaultValue={booking?.specialRequests ?? ""}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* HONEYPOT */}
                <input
                  type="text"
                  name="website_alt"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  readOnly
                  className="contact-extra"
                />

                {/* SUMMARY */}
                <div className="mt-6">
                  <BookingSummary
                    experienceName={exp?.name ?? ""}
                    dateLabel={
                      schedule
                        ? formatScheduleDate(schedule, i18n.language)
                        : "—"
                    }
                    timeLabel={
                      schedule
                        ? formatScheduleTime(schedule, i18n.language)
                        : "—"
                    }
                    guests={guests}
                    pricePerPerson={Number(pricePerPerson)}
                    currency={currency}
                  />
                </div>

                {/* CANCEL EDIT */}
                {mode === "edit" && onCancelEdit && (
                  <button
                    type="button"
                    onClick={onCancelEdit}
                    disabled={isLoading}
                    className="mt-6 w-full flex items-center justify-center gap-2 px-8 py-3 border border-gray-200 text-primary font-medium rounded-full hover:border-accent hover:text-accent transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <i className="ri-arrow-left-line" />

                    {t("exp_booking_cancel_edit", {
                      defaultValue: "Cancel changes",
                    })}
                  </button>
                )}

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={isLoading || !schedule}
                  className={`w-full flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-full hover:bg-accent-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer ${
                    mode === "edit" ? "mt-3" : "mt-6"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <i className="ri-loader-4-line animate-spin" />

                      <span>{t("exp_booking_sending")}</span>
                    </>
                  ) : (
                    <>
                      <span>
                        {mode === "edit"
                          ? t("exp_booking_update", {
                              defaultValue: "Update booking and continue",
                            })
                          : t("exp_booking_submit")}
                      </span>

                      <i className="ri-arrow-right-line" />
                    </>
                  )}
                </button>

                <p className="text-center text-gray-400 text-xs mt-3">
                  {t("exp_booking_confirm_note")}
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
