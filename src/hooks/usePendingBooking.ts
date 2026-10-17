import { useEffect, useState } from "react";

import { useBooking } from "@/hooks/useBooking";
import { useQueryClient } from "@tanstack/react-query";

function readPendingBookingId(scheduleId?: number): number | undefined {
  if (!scheduleId) {
    return undefined;
  }

  const key = `pendingBooking:${scheduleId}`;
  const stored = localStorage.getItem(key);

  if (!stored) {
    return undefined;
  }

  const parsed = Number(stored);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    localStorage.removeItem(key);
    return undefined;
  }

  return parsed;
}

export function usePendingBooking(scheduleId?: number) {
  const queryClient = useQueryClient();

  const storedBookingId = readPendingBookingId(scheduleId);

  const [pendingBookingId, setPendingBookingId] = useState<number | undefined>(
    storedBookingId,
  );

  /*
   * Si scheduleId apareció después
   * de cargar la experiencia,
   * usamos inmediatamente el valor
   * leído de localStorage.
   */
  const bookingId = pendingBookingId ?? storedBookingId;

  useEffect(() => {
    if (!scheduleId) {
      setPendingBookingId(undefined);
      return;
    }

    const sync = () => {
      setPendingBookingId(readPendingBookingId(scheduleId));
    };

    sync();

    window.addEventListener("pageshow", sync);

    return () => {
      window.removeEventListener("pageshow", sync);
    };
  }, [scheduleId]);

  const query = useBooking(bookingId);

  const pendingBooking = query.data;

  const hasValidPendingBooking =
    !!pendingBooking &&
    pendingBooking.status === "PENDING" &&
    pendingBooking.paymentStatus === "PENDING" &&
    (pendingBooking.scheduleId ?? pendingBooking.schedule?.id) === scheduleId &&
    !!pendingBooking.expiresAt &&
    new Date(pendingBooking.expiresAt).getTime() > Date.now();

  useEffect(() => {
    if (
      !scheduleId ||
      !bookingId ||
      !query.isSuccess ||
      hasValidPendingBooking
    ) {
      return;
    }

    localStorage.removeItem(`pendingBooking:${scheduleId}`);

    setPendingBookingId(undefined);
    queryClient.invalidateQueries({
      queryKey: ["experiences"],
    });
  }, [
    scheduleId,
    bookingId,
    query.isSuccess,
    hasValidPendingBooking,
    queryClient,
  ]);

  return {
    pendingBooking,

    pendingBookingId: bookingId,

    hasValidPendingBooking,

    isPendingBookingLoading: !!bookingId && query.isLoading,
  };
}
