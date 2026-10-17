import {
  CheckoutPaymentResponse,
  StripeCheckoutResponse,
} from "@/types/payment.interface";
import { apiNest } from "./apiNest";

export async function createStripeCheckout(
  bookingId: number,
): Promise<StripeCheckoutResponse> {
  const { data } = await apiNest.post<StripeCheckoutResponse>(
    `/payments/stripe/checkout/${bookingId}`,
  );

  return data;
}
export async function getCheckoutPayment(
  bookingId: number,
  sessionId: string,
): Promise<CheckoutPaymentResponse> {
  const { data } = await apiNest.get<CheckoutPaymentResponse>(
    `/payments/checkout/${bookingId}`,
    {
      params: {
        session_id: sessionId,
      },
    },
  );

  return data;
}
