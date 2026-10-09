import { Upload } from "./upload";

// types/experience.ts
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
  places: unknown[];
  academies: unknown[];
  styles: unknown[];
  schedules: unknown[];
  createdAt: string;
  updatedAt: string;
  translations?: ExperienceTranslation[];
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
