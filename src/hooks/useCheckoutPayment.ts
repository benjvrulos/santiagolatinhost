import { getCheckoutPayment } from "@/services/payments.api";
import { useQuery } from "@tanstack/react-query";

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

    staleTime: 0,

    refetchOnMount: "always",

    refetchOnWindowFocus: true,

    /*
     * Un session_id inválido no debe
     * generar reintentos automáticos.
     */
    retry: false,

    refetchInterval: (query) => {
      if (query.state.status === "error") {
        return false;
      }

      const data = query.state.data;

      if (!data) {
        return false;
      }

      const stillPending =
        data.booking.status === "PENDING" && data.payment.status === "PENDING";

      return stillPending ? 1000 : false;
    },
  });
}
