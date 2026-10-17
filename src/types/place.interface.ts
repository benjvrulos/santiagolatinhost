import { Upload } from "./upload.interface";

export type PlaceType =
  | "CULTURAL"
  | "SALSA_CLUB"
  | "DANCE_ACADEMY"
  | "RESTAURANT"
  | "BAR"
  | "MUSEUM"
  | "PARK"
  | "OTHER";

export interface PlaceTranslation {
  id: number;
  placeId?: number;
  languageCode: string;

  name?: string;
  shortDescription?: string;
  description?: string;
}

export interface Place {
  id: number;

  comunaId?: number | null;
  imageId?: number | null;

  image?: Upload | null;

  name: string;
  slug: string;

  shortDescription?: string | null;
  description?: string | null;

  type: PlaceType;

  address?: string | null;

  latitude?: string | number | null;
  longitude?: string | number | null;

  mapsUrl?: string | null;
  websiteUrl?: string | null;
  instagramUrl?: string | null;

  isActive: boolean;

  translations?: PlaceTranslation[];

  createdAt: string;
  updatedAt: string;
}

export interface ExperiencePlace {
  id: number;

  experienceId: number;
  placeId: number;

  place: Place;

  position: number;

  startOffsetMinutes?: number | null;
  durationMinutes?: number | null;

  title?: string | null;
  notes?: string | null;

  translations?: ExperiencePlaceTranslation[];
}

export interface ExperiencePlaceTranslation {
  id: number;

  experiencePlaceId?: number;
  languageCode: string;

  title?: string | null;
  notes?: string | null;
}
