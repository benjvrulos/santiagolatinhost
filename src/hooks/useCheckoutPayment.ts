import { useQuery } from "@tanstack/react-query";

import { getCheckoutPayment } from "@/services/payments.api";

export function useCheckoutPayment(
  bookingId?: number,
  sessionId?: string | null,
) {
  const canFetch =
    !!bookingId && Number.isInteger(bookingId) && bookingId > 0 && !!sessionId;

  return useQuery({
    queryKey: ["checkout-payment", bookingId, sessionId],

    queryFn: () => getCheckoutPayment(bookingId!, sessionId!),

    enabled: canFetch,
  });
}
