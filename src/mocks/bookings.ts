// Sample data for a booking that has already been purchased.
// Replace these constants with real order data once the backend is connected.
export const bookingMeta = {
  reference: "SLH-2026-10482",
  guests: 2,
  paidAt: "2026-10-14T18:42:00-03:00",
};

export const bookingCustomer = {
  name: "Emma Thompson",
  email: "emma.thompson@email.com",
  phone: "+1 415 555 0142",
  specialRequests:
    "We are celebrating our anniversary. A beginner-friendly class would be perfect, thank you!",
};

export const bookingPayment = {
  method: "card",
  brand: "Visa",
  last4: "4242",
  status: "paid",
  transactionId: "ch_3P9kQ2eZvKYlo2C1x8aZ7",
};
