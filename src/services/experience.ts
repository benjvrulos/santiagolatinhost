import { Experience } from "@/types/experience";
import { apiNest } from "./apiNest"; // your axios instance

const normalize = (e: Experience): Experience => ({
  ...e,
  price: Number(e.price),
  meetingLatitude:
    e.meetingLatitude === null ? null : Number(e.meetingLatitude),
  meetingLongitude:
    e.meetingLongitude === null ? null : Number(e.meetingLongitude),
});

export const getExperiences = async (): Promise<Experience[]> => {
  const { data } = await apiNest.get<Experience[]>("/experiences");
  return data.map(normalize);
};

export const getExperience = async (id: number): Promise<Experience> => {
  const { data } = await apiNest.get<Experience>(`/experiences/${id}`);
  return normalize(data);
};

// export const createExperience = async (
//   payload: Partial<CreateExperiencePayload>,
// ): Promise<Experience> => {
//   const { data } = await apiNest.post<Experience>("/experiences", payload);
//   return data;
// };
