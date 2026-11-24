import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import SuccessBanner from "@/pages/checkout/components/SuccessBanner";
import BookingDetailsCard from "@/pages/checkout/components/BookingDetailsCard";
import GuestDetailsCard from "@/pages/checkout/components/GuestDetailsCard";
import PaymentCard from "@/pages/checkout/components/PaymentCard";
import OrderSummary from "@/pages/checkout/components/OrderSummary";
import NextSteps from "@/pages/checkout/components/NextSteps";
import ItineraryDetailsCard from "@/pages/checkout/components/ItineraryDetailsCard";
import ItinerarySummary from "@/pages/checkout/components/ItinerarySummary";
import {
  formatOrderRange,
  getItineraryTotals,
  loadItineraryOrder,
} from "@/lib/itinerary";
import {
  experiencesData,
  experienceSchedules,
  experiencePricing,
} from "@/mocks/experiences";
import { bookingMeta, bookingCustomer, bookingPayment } from "@/mocks/booking";
import { formatScheduleDate, formatScheduleTime } from "@/utils/formatSchedule";

const WHATSAPP_HREF = "https://wa.me/56923895542";

function toGcalDate(iso: string): string {
  return new Date(iso)
    .toISOString()
    .replace(/\.\d{3}Z$/, "Z")
    .replace(/[-:]/g, "");
}

interface CheckoutPageProps {
  itineraryMode?: boolean;
}

export default function CheckoutPage({
  itineraryMode = false,
}: CheckoutPageProps) {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const exp = id ? experiencesData[id] : undefined;
  const order = itineraryMode ? loadItineraryOrder() : null;

  if (!exp && !order) {
    return (
      <div className="min-h-screen bg-surface flex flex-col">
        <div className="flex-1 flex items-center justify-center px-6 pt-16 md:pt-20">
          <div className="text-center max-w-md">
            <div className="w-14 h-14 mx-auto rounded-full bg-white border border-gray-200 flex items-center justify-center mb-5">
              <i className="ri-error-warning-line text-2xl text-accent" />
            </div>
            <h1 className="font-display text-2xl text-primary font-bold mb-3">
              {t("ck_not_found")}
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {t("ck_not_found_desc")}
            </p>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full bg-accent text-white hover:bg-accent-dark transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-arrow-left-line" />
              {t("ck_back_home")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const scheduleList = id ? experienceSchedules[id] : undefined;
  const schedule =
    scheduleList?.find((item) => item.status === "available") ??
    scheduleList?.[0] ??
    null;

  const pricing = id ? experiencePricing[id] : undefined;
  const pricePerPerson = pricing?.pricePerPerson;
  const currency = pricing?.currency ?? "USD";
  const guests = order ? Math.max(1, order.travelers || 1) : bookingMeta.guests;
  const total = order
    ? getItineraryTotals(order).total
    : typeof pricePerPerson === "number"
      ? pricePerPerson * guests
      : 0;
  const money = (amount: number) =>
    `${currency === "USD" ? "US$" : currency}${amount}`;

  const experienceName = order
    ? t("ck_itinerary_bundle")
    : exp
      ? t(exp.titleKey)
      : "";
  const dateLabel = order
    ? formatOrderRange(order, i18n.language)
    : schedule
      ? formatScheduleDate(schedule, i18n.language)
      : "—";
  const timeLabel = order
    ? "—"
    : schedule
      ? formatScheduleTime(schedule, i18n.language)
      : "—";
  const meetingPoint = exp ? t(exp.meetingPointKey) : "";

  const gcalUrl =
    !order && schedule && exp
      ? `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(experienceName)}&dates=${toGcalDate(schedule.startDateTime)}/${toGcalDate(schedule.endDateTime)}&details=${encodeURIComponent(t(exp.subtitleKey))}&location=${encodeURIComponent(meetingPoint)}`
      : "";

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <main className="flex-1 pt-16 md:pt-20">
        {/* Success header */}
        <section className="section-padding py-12 md:py-16">
          <SuccessBanner
            title={t("ck_success_title")}
            subtitle={t("ck_success_subtitle")}
            referenceLabel={t("ck_reference")}
            reference={bookingMeta.reference}
          />
        </section>

        {/* Content */}
        <section className="section-padding pb-16 md:pb-24">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Main column */}
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              {order ? (
                <ItineraryDetailsCard order={order} />
              ) : (
                <BookingDetailsCard
                  img={exp?.img ?? ""}
                  title={experienceName}
                  subtitle={exp ? t(exp.subtitleKey) : ""}
                  dateLabel={dateLabel}
                  timeLabel={timeLabel}
                  guests={guests}
                  meetingPoint={meetingPoint}
                />
              )}
              <GuestDetailsCard
                name={bookingCustomer.name}
                email={bookingCustomer.email}
                phone={bookingCustomer.phone}
                requests={bookingCustomer.specialRequests}
              />
              <PaymentCard
                brand={bookingPayment.brand}
                last4={bookingPayment.last4}
                transactionId={bookingPayment.transactionId}
                amountLabel={money(total)}
                paidAt={bookingMeta.paidAt}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6 md:space-y-8 lg:sticky lg:top-24">
                {order ? (
                  <ItinerarySummary order={order} />
                ) : (
                  <OrderSummary
                    experienceName={experienceName}
                    dateLabel={dateLabel}
                    timeLabel={timeLabel}
                    guests={guests}
                    pricePerPerson={pricePerPerson}
                    currency={currency}
                  />
                )}

                <NextSteps />

                <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-7">
                  <div className="flex items-center gap-2 mb-3">
                    <i className="ri-customer-service-2-line text-accent text-lg" />
                    <h2 className="font-display text-lg text-primary font-bold">
                      {t("ck_help_title")}
                    </h2>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">
                    {t("ck_help_desc")}
                  </p>
                  <div className="space-y-3">
                    <a
                      href={WHATSAPP_HREF}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white text-sm font-semibold rounded-full hover:bg-accent-dark transition-colors whitespace-nowrap"
                    >
                      <i className="ri-whatsapp-line text-base" />
                      {t("ck_whatsapp")}
                    </a>
                    {gcalUrl && (
                      <a
                        href={gcalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 text-primary text-sm font-medium rounded-full hover:border-accent hover:text-accent transition-colors whitespace-nowrap"
                      >
                        <i className="ri-calendar-event-line text-base" />
                        {t("ck_add_calendar")}
                      </a>
                    )}
                    <button
                      onClick={() => navigate("/")}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 text-gray-500 text-sm font-medium rounded-full hover:text-primary transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-arrow-left-line" />
                      {t("ck_back_home")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
