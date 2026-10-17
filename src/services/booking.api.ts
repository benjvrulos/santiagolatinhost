import {
  BookingDetail,
  BookingResponse,
  CreateBookingPayload,
  UpdatePendingBookingPayload,
} from "@/types/booking.interface";
import { apiNest } from "./apiNest";

export async function getBooking(id: number): Promise<BookingDetail> {
  const { data } = await apiNest.get<BookingDetail>(`/bookings/${id}`);

  return data;
}

export async function createBooking(
  payload: CreateBookingPayload,
): Promise<BookingResponse> {
  const { data } = await apiNest.post<BookingResponse>("/bookings", payload);

  return data;
}

export async function updatePendingBooking(
  bookingId: number,
  payload: UpdatePendingBookingPayload,
) {
  const { data } = await apiNest.patch(`/bookings/${bookingId}`, payload);

  return data;
}
