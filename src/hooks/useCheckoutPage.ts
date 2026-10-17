import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useBooking } from "@/hooks/useBooking";
import { useCheckoutPayment } from "@/hooks/useCheckoutPayment";
import { useCreateStripeCheckout } from "@/hooks/useCreateStripeCheckout";

import { formatScheduleDate, formatScheduleTime } from "@/utils/formatSchedule";

import {
  buildGoogleCalendarUrl,
  formatCheckoutMoney,
} from "@/utils/checkout.utils";

export function useCheckoutPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const { i18n } = useTranslation();

  const bookingId = Number(id);

  const sessionId = searchParams.get("session_id");

  const cancelled = searchParams.get("cancelled") === "true";

  const isValidBookingId = Number.isInteger(bookingId) && bookingId > 0;
  /*
   * CANCELLED
   *
   * Stripe no tiene un payment PAID,
   * así que necesitamos consultar
   * directamente el booking.
   */
  const bookingQuery = useBooking(
    isValidBookingId && cancelled ? bookingId : undefined,
  );

  /*
   * SUCCESS
   *
   * El endpoint de checkout devuelve:
   *
   * {
   *   payment,
   *   booking
   * }
   */
  const checkoutQuery = useCheckoutPayment(
    isValidBookingId && !cancelled && sessionId ? bookingId : undefined,
    !cancelled ? sessionId : null,
  );

  /*
   * Elegimos el booking dependiendo
   * del flujo.
   */
  const booking = cancelled ? bookingQuery.data : checkoutQuery.data?.booking;

  const payment = cancelled ? undefined : checkoutQuery.data?.payment;

  const { mutateAsync: createStripeCheckout, isPending: isRetryingPayment } =
    useCreateStripeCheckout();

  useEffect(() => {
    if (booking?.status === "CONFIRMED" && booking.paymentStatus === "PAID") {
      localStorage.removeItem(`pendingBooking:${booking.schedule.id}`);
    }
  }, [booking]);

  /*
   * Reintentar pago desde
   * checkout cancelado.
   */
  const handleRetryPayment = async () => {
    if (!isValidBookingId) {
      return;
    }

    try {
      const checkout = await createStripeCheckout(bookingId);

      if (!checkout.checkoutUrl) {
        throw new Error("Stripe checkout URL was not returned");
      }

      window.location.href = checkout.checkoutUrl;
    } catch (error) {
      console.error("Unable to restart payment", error);
    }
  };

  /*
   * Modificar reserva pendiente.
   */
  const handleModifyBooking = () => {
    if (!booking) {
      return;
    }

    navigate(
      `/experience/${booking.schedule.experience.slug}?editBooking=true`,
    );
  };

  /*
   * Loading depende del flujo.
   */
  const isLoading = cancelled
    ? bookingQuery.isLoading
    : checkoutQuery.isLoading;

  /*
   * Error depende del flujo.
   */
  const hasError = cancelled ? bookingQuery.isError : checkoutQuery.isError;

  const isPaid =
    booking?.status === "CONFIRMED" &&
    booking.paymentStatus === "PAID" &&
    payment?.status === "PAID";

  const lang = i18n.resolvedLanguage ?? i18n.language ?? "en";

  const schedule = booking?.schedule;

  const experience = schedule?.experience;

  let checkoutData = null;

  if (booking && schedule && experience) {
    checkoutData = {
      schedule,

      experience,

      guests: booking.peopleCount,

      pricePerPerson: Number(experience.price),

      currency: booking.currency,

      experienceName: experience.name,

      dateLabel: formatScheduleDate(schedule, lang),

      timeLabel: formatScheduleTime(schedule, lang),

      meetingPoint: experience.meetingPoint,

      money: (amount: number) =>
        formatCheckoutMoney(amount, booking.currency, lang),

      gcalUrl: buildGoogleCalendarUrl(experience, schedule),
    };
  }

  return {
    bookingId,
    sessionId,

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
  };
}
