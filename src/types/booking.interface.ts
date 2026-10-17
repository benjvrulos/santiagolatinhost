import { Upload } from "./upload.interface";

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
  totalAmount: number;
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
  coverImage: Upload;
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

  expiresAt?: string | null;

  remainingSeconds?: number;
  remainingMinutes?: number;

  createdAt: string;
  updatedAt: string;
}

export interface UpdatePendingBookingPayload {
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  peopleCount?: number;
  specialRequests?: string;
}
