import { BookingDetail } from "./booking.interface";

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

export interface CheckoutPayment {
  id: number;
  status: string;
  provider: string;

  amount: number;
  currency: string;

  transactionId: string | null;
  paymentMethod: string | null;
  paidAt: string | null;

  brand: string | null;
  last4: string | null;
}

export interface CheckoutPaymentResponse {
  payment: CheckoutPayment;
  booking: BookingDetail;
}
