import { apiNest } from "./apiNest";

export interface CreateBookingPayload {
  scheduleId: number;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  peopleCount: number;
  specialRequests?: string;
}

export interface BookingResponse {
  id: number;
  bookingCode: string;
  totalAmount: string;
  currency: string;
  status: string;
  paymentStatus: string;
  expiresAt: string | null;
}
export interface BookingExperience {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: string;
  currency: string;
  meetingPoint: string;
  coverImageId?: number | null;
}

export interface BookingSchedule {
  id: number;
  startDateTime: string;
  endDateTime: string;
  capacity: number;
  status: string;
  experience: BookingExperience;
}

export interface BookingDetail {
  id: number;
  bookingCode: string;

  scheduleId: number;
  schedule: BookingSchedule;

  contactName: string;
  contactEmail: string;
  contactPhone?: string | null;

  peopleCount: number;

  subtotal: string;
  discountAmount: string;
  totalAmount: string;

  currency: string;

  status: string;
  paymentStatus: string;

  specialRequests?: string | null;

  expiresAt: string | null;

  createdAt: string;
  updatedAt: string;
}

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
