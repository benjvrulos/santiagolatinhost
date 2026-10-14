import { useQuery } from "@tanstack/react-query";

import { getBooking } from "@/services/booking.api";

export function useBooking(bookingId?: number) {
  return useQuery({
    queryKey: ["booking", bookingId],

    queryFn: () => getBooking(bookingId!),

    enabled: !!bookingId && Number.isInteger(bookingId),
  });
}
