import { ExperiencePlace } from "./place.interface";
import { Style } from "./style.interface";
import { Upload } from "./upload.interface";

export type ExperienceType =
  | "DAY_TOUR"
  | "CULTURAL"
  | "DANCE_CLASS"
  | "NIGHTLIFE"
  | "FULL_DAY"
  | "PRIVATE";

export interface Experience {
  id: number;
  coverImageId: number | null;
  coverImage: Upload | null;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  type: ExperienceType;
  durationMinutes: number;
  minPeople: number;
  maxPeople: number;
  price: string | number; // "45000.00" from Postgres unless you add the transformer
  currency: string;
  meetingPoint: string | null;
  meetingLatitude: string | number | null;
  meetingLongitude: string | number | null;
  included: string | null;
  notIncluded: string | null;
  requirements: string | null;
  recommendations: string | null;
  isPrivateAvailable: boolean;
  isFeatured: boolean;
  isActive: boolean;
  places: ExperiencePlace[];
  academies: unknown[];
  styles: ExperienceStyle[];
  schedules: ExperienceSchedule[];
  createdAt: string;
  updatedAt: string;
  translations?: ExperienceTranslation[];
}

export interface ExperienceStyle {
  id: number;

  experienceId: number;

  styleId: number;

  style: Style;
}
export interface ExperienceTranslation {
  id: number;
  languageCode: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  included?: string;
  notIncluded?: string;
  requirements?: string;
  recommendations?: string;
}

export interface ExperienceSchedule {
  id: number;
  experienceId: number;

  experience?: Experience;

  startDateTime: string;
  endDateTime: string;

  capacity: number;
  availableSpots: number;

  status: "AVAILABLE" | "FULL" | "CANCELLED";

  createdAt?: string;
  updatedAt?: string;
}
