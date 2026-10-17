import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";

import { useCreateBooking } from "@/hooks/useCreateBooking";
import { useCreateStripeCheckout } from "@/hooks/useCreateStripeCheckout";
import { useUpdatePendingBooking } from "@/hooks/useUpdatePendingBooking";

import type { Experience } from "@/types/experience.interface";
import type { BookingDetail } from "@/types/booking.interface";
import {
  GENERIC_BOOKING_ERROR,
  MAX_BOOKING_GUESTS,
} from "@/constants/booking.constants";

interface Params {
  exp: Experience;
  booking?: BookingDetail;
  mode: "create" | "edit";
}

export function useBookingForm({ exp, booking, mode }: Params) {
  const [errorMsg, setErrorMsg] = useState("");

  const [guests, setGuests] = useState(() =>
    mode === "edit" && booking ? booking.peopleCount : 1,
  );

  const [email, setEmail] = useState(() =>
    mode === "edit" && booking ? (booking.contactEmail ?? "") : "",
  );

  const createBookingMutation = useCreateBooking();

  const updatePendingBookingMutation = useUpdatePendingBooking();

  const createStripeCheckoutMutation = useCreateStripeCheckout();

  const schedule = useMemo(
    () => exp.schedules?.find((item) => item.status === "AVAILABLE") ?? null,
    [exp.schedules],
  );

  const maxGuests = schedule
    ? Math.min(
        MAX_BOOKING_GUESTS,
        mode === "edit"
          ? schedule.capacity
          : Math.max(1, schedule.availableSpots ?? 0),
      )
    : 1;

  useEffect(() => {
    if (mode !== "create") {
      return;
    }

    setGuests((current) => Math.min(Math.max(1, current), maxGuests));
  }, [maxGuests, mode]);

  const isLoading =
    createBookingMutation.isPending ||
    updatePendingBookingMutation.isPending ||
    createStripeCheckoutMutation.isPending;

  const goToStripe = async (bookingId: number) => {
    const checkout = await createStripeCheckoutMutation.mutateAsync(bookingId);

    if (!checkout.checkoutUrl) {
      throw new Error("Stripe checkout URL was not returned");
    }

    window.location.href = checkout.checkoutUrl;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const honeypot = String(formData.get("website_alt") ?? "").trim();

    if (honeypot) {
      return;
    }

    if (!schedule) {
      setErrorMsg("No schedule is currently available.");
      return;
    }

    setErrorMsg("");

    const payload = {
      contactName: String(formData.get("contactName") ?? "").trim(),

      contactEmail: email.trim().toLowerCase(),

      contactPhone:
        String(formData.get("contactPhone") ?? "").trim() || undefined,

      peopleCount: guests,

      specialRequests:
        String(formData.get("specialRequests") ?? "").trim() || undefined,
    };

    try {
      if (mode === "edit" && booking) {
        const updated = await updatePendingBookingMutation.mutateAsync({
          bookingId: booking.id,
          payload,
        });

        await goToStripe(updated.id);

        return;
      }

      const storageKey = `pendingBooking:${schedule.id}`;

      const existingId = localStorage.getItem(storageKey);

      if (existingId) {
        await goToStripe(Number(existingId));

        return;
      }

      const created = await createBookingMutation.mutateAsync({
        scheduleId: schedule.id,
        ...payload,
      });

      localStorage.setItem(storageKey, String(created.id));

      await goToStripe(created.id);
    } catch (error: any) {
      console.error("Booking error:", error);

      if (error?.response?.status === 409) {
        setErrorMsg("You already have an active booking for this schedule.");

        return;
      }

      setErrorMsg(GENERIC_BOOKING_ERROR);
    }
  };

  return {
    schedule,

    guests,
    setGuests,

    email,
    setEmail,

    maxGuests,
    isLoading,
    errorMsg,

    handleSubmit,
  };
}
