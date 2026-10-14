import { apiNest } from "./apiNest";

export interface StripeCheckoutResponse {
  bookingId: number;
  bookingCode: string;
  paymentId: number;
  amount: number;
  currency: string;
  checkoutSessionId: string;
  checkoutUrl: string;
  expiresAt: string | null;
}

export async function createStripeCheckout(
  bookingId: number,
): Promise<StripeCheckoutResponse> {
  const { data } = await apiNest.post<StripeCheckoutResponse>(
    `/payments/stripe/checkout/${bookingId}`,
  );

  return data;
}
