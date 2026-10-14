import { useMutation } from "@tanstack/react-query";

import { createStripeCheckout } from "@/services/payments.api";

export function useCreateStripeCheckout() {
  return useMutation({
    mutationFn: (bookingId: number) => createStripeCheckout(bookingId),
  });
}
