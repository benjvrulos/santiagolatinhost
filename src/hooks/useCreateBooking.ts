import { useMutation } from "@tanstack/react-query";

import {
  createBooking,
  type CreateBookingPayload,
} from "@/services/booking.api";

export function useCreateBooking() {
  return useMutation({
    mutationFn: (payload: CreateBookingPayload) => createBooking(payload),
  });
}
