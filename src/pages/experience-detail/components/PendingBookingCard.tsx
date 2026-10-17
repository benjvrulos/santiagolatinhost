import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

interface PendingBookingCardProps {
  bookingId: number;
  expiresAt: string;

  onContinuePayment: () => void;
  onEditBooking: () => void;

  isLoading?: boolean;
}

export default function PendingBookingCard({
  bookingId,
  expiresAt,
  onContinuePayment,
  onEditBooking,
  isLoading = false,
}: PendingBookingCardProps) {
  const { t } = useTranslation();

  const [remainingSeconds, setRemainingSeconds] = useState(0);

  useEffect(() => {
    const updateTimer = () => {
      const remaining = Math.max(
        0,
        Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000),
      );

      setRemainingSeconds(remaining);
    };

    updateTimer();

    const interval = window.setInterval(updateTimer, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [expiresAt]);

  const minutes = Math.floor(remainingSeconds / 60);

  const seconds = remainingSeconds % 60;

  const isExpired = remainingSeconds <= 0;

  return (
    <section
      id="reserva"
      className="px-4 sm:px-6 lg:px-8 xl:px-12 pb-16 md:pb-24"
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-5">
            <i className="ri-time-line text-2xl text-accent" />
          </div>

          <h2 className="font-display text-2xl text-primary font-bold mb-3">
            {t("pending_booking_title", {
              defaultValue: "You already have a pending booking",
            })}
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed mb-2">
            {t("pending_booking_desc", {
              defaultValue:
                "Your spots are temporarily reserved while you complete the payment.",
            })}
          </p>

          <p className="text-gray-400 text-xs mb-4">
            {t("pending_booking_reference", {
              defaultValue: "Booking",
            })}{" "}
            #{bookingId}
          </p>

          {/* COUNTDOWN */}
          <div className="mb-6">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
              {t("pending_booking_time_remaining", {
                defaultValue: "Time remaining",
              })}
            </p>

            <p
              className={`font-display text-3xl font-bold ${
                isExpired ? "text-rose-500" : "text-accent"
              }`}
            >
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {/* CONTINUE PAYMENT */}
            <button
              type="button"
              onClick={onContinuePayment}
              disabled={isLoading || isExpired}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent text-white text-sm font-semibold hover:bg-accent-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <i className="ri-loader-4-line animate-spin" />

                  {t("pending_booking_opening", {
                    defaultValue: "Opening payment...",
                  })}
                </>
              ) : (
                <>
                  <i className="ri-bank-card-line" />

                  {t("pending_booking_continue", {
                    defaultValue: "Continue payment",
                  })}
                </>
              )}
            </button>

            {/* EDIT BOOKING */}
            <button
              type="button"
              onClick={onEditBooking}
              disabled={isLoading || isExpired}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-gray-200 text-primary text-sm font-medium hover:border-accent hover:text-accent transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <i className="ri-edit-line" />

              {t("pending_booking_edit", {
                defaultValue: "Modify booking",
              })}
            </button>
          </div>

          {isExpired && (
            <p className="text-rose-500 text-sm mt-5">
              {t("pending_booking_expired", {
                defaultValue: "This booking has expired.",
              })}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
