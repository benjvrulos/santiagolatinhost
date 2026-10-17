import SuccessBanner from "@/pages/checkout/components/SucessBanner";
import BookingDetailsCard from "@/pages/checkout/components/BookingDetailsCard";
import GuestDetailsCard from "@/pages/checkout/components/GuestDetailsCard";
import PaymentCard from "@/pages/checkout/components/PaymentCard";
import OrderSummary from "@/pages/checkout/components/OrderSummary";
import NextSteps from "@/pages/checkout/components/NextSteps";
import { useTranslation } from "react-i18next";
import { useCheckoutPage } from "@/hooks/useCheckoutPage";
import { WHATSAPP_HREF } from "@/constants/booking.constants";

export default function CheckoutPage() {
  const { t } = useTranslation();

  const {
    cancelled,
    isValidBookingId,
    booking,
    payment,
    isLoading,
    hasError,
    isPaid,
    isRetryingPayment,
    checkoutData,
    handleRetryPayment,
    handleModifyBooking,
    navigate,
  } = useCheckoutPage();

  if (!isValidBookingId) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6 pt-16 md:pt-20">
        <div className="text-center max-w-md">
          <div className="w-14 h-14 mx-auto rounded-full bg-white border border-gray-200 flex items-center justify-center mb-5">
            <i className="ri-error-warning-line text-2xl text-accent" />
          </div>

          <h1 className="font-display text-2xl text-primary font-bold mb-3">
            {t("ck_not_found")}
          </h1>

          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white"
          >
            <i className="ri-arrow-left-line" />

            {t("ck_back_home")}
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6 pt-16 md:pt-20">
        <div className="flex items-center gap-3 text-gray-500">
          <i className="ri-loader-4-line animate-spin text-xl" />

          <span>{t("ck_loading")}</span>
        </div>
      </div>
    );
  }

  if (hasError || !booking || (!cancelled && !payment)) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6 pt-16 md:pt-20">
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
    );
  }

  if (cancelled) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6 pt-16 md:pt-20">
        <div className="text-center max-w-md">
          <div className="w-14 h-14 mx-auto rounded-full bg-white border border-gray-200 flex items-center justify-center mb-5">
            <i className="ri-close-circle-line text-2xl text-amber-500" />
          </div>

          <h1 className="font-display text-2xl text-primary font-bold mb-3">
            {t("ck_cancelled_title")}
          </h1>

          <p className="text-gray-600 text-sm leading-relaxed mb-2">
            {t("ck_cancelled_desc")}
          </p>

          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            {t("ck_cancelled_hold")}
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleRetryPayment}
              disabled={isRetryingPayment}
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-6 py-3 rounded-full bg-accent text-white hover:bg-accent-dark transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isRetryingPayment ? (
                <>
                  <i className="ri-loader-4-line animate-spin" />
                  {t("ck_retrying_payment")}
                </>
              ) : (
                <>
                  <i className="ri-bank-card-line" />
                  {t("ck_retry_payment")}
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                handleModifyBooking;
              }}
              className="w-full px-6 py-3 rounded-full border border-gray-200 text-primary font-medium hover:border-accent hover:text-accent transition-colors"
            >
              {t("checkout_modify_booking", {
                defaultValue: "Modify booking",
              })}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isPaid) {
    // tu pending actual
  }

  if (!booking || !payment || !checkoutData) {
    return null;
  }

  const {
    schedule,
    exp,
    guests,
    pricePerPerson,
    currency,
    experienceName,
    dateLabel,
    timeLabel,
    meetingPoint,
    money,
    gcalUrl,
  } = checkoutData;

  console.log(exp);

  if (!isPaid) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6 pt-16 md:pt-20">
        <div className="text-center max-w-md">
          <div className="w-14 h-14 mx-auto rounded-full bg-white border border-gray-200 flex items-center justify-center mb-5">
            <i className="ri-time-line text-2xl text-accent" />
          </div>

          <h1 className="font-display text-2xl text-primary font-bold mb-3">
            {t("ck_pending_title")}
          </h1>

          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {t("ck_pending_desc")}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full bg-accent text-white hover:bg-accent-dark transition-colors cursor-pointer"
          >
            <i className="ri-refresh-line" />

            {t("ck_check_again")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 md:pt-20">
      <section className="section-padding py-12 md:py-16">
        <SuccessBanner
          title={t("ck_success_title")}
          subtitle={t("ck_success_subtitle")}
          referenceLabel={t("ck_reference")}
          reference={booking.bookingCode}
        />
      </section>

      <section className="section-padding pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <BookingDetailsCard
              img={exp?.coverImage?.path ?? ""}
              title={experienceName}
              subtitle={exp?.shortDescription ?? exp?.description}
              dateLabel={dateLabel}
              timeLabel={timeLabel}
              guests={guests}
              meetingPoint={meetingPoint}
            />

            <GuestDetailsCard
              name={booking.contactName}
              email={booking.contactEmail}
              phone={booking.contactPhone ?? ""}
              requests={booking.specialRequests ?? ""}
            />

            <PaymentCard
              brand={payment?.brand ?? "Stripe"}
              last4={payment?.last4 ?? ""}
              transactionId={payment?.transactionId ?? ""}
              amountLabel={money(payment.amount)}
              paidAt={payment?.paidAt ?? ""}
            />
          </div>

          <div className="lg:col-span-1">
            <div className="space-y-6 md:space-y-8 lg:sticky lg:top-24">
              <OrderSummary
                experienceName={experienceName}
                dateLabel={dateLabel}
                timeLabel={timeLabel}
                guests={guests}
                pricePerPerson={pricePerPerson}
                currency={currency}
              />

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

                  <a
                    href={gcalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 text-primary text-sm font-medium rounded-full hover:border-accent hover:text-accent transition-colors whitespace-nowrap"
                  >
                    <i className="ri-calendar-event-line text-base" />

                    {t("ck_add_calendar")}
                  </a>

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
    </div>
  );
}
