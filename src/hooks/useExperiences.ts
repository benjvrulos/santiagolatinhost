// hooks/useExperiences.ts

import { apiNest } from "@/services/apiNest";
import { getExperience, getExperiences } from "@/services/experience.api";
import { Experience } from "@/types/experience.interface";

import { localizeExperience } from "@/utils/localizeExperience";

import { queryOptions, useQuery } from "@tanstack/react-query";

import { useTranslation } from "react-i18next";

export const experienceKeys = {
  all: ["experiences"] as const,
  list: () => [...experienceKeys.all, "list"] as const,
  detail: (id: number) => [...experienceKeys.all, "detail", id] as const,
  slug: (slug: string) => [...experienceKeys.all, "slug", slug] as const,
};

export const experienceBySlugQuery = (slug: string) =>
  queryOptions({
    queryKey: experienceKeys.slug(slug),
    queryFn: async () => {
      const response = await apiNest.get<Experience>(
        `/experiences/slug/${slug}`,
      );

      return response.data;
    },
  });

export function useExperienceBySlug(slug: string) {
  const { i18n } = useTranslation();

  return useQuery({
    ...experienceBySlugQuery(slug),
    enabled: Boolean(slug),
    select: (experience) =>
      localizeExperience(experience, i18n.resolvedLanguage ?? i18n.language),
  });
}
export const experiencesQuery = () =>
  queryOptions({
    queryKey: experienceKeys.list(),
    queryFn: getExperiences,
  });

export const experienceQuery = (id: number) =>
  queryOptions({
    queryKey: experienceKeys.detail(id),
    queryFn: () => getExperience(id),
  });

export function useExperiences() {
  const { i18n } = useTranslation();

  return useQuery({
    ...experiencesQuery(),

    select: (experiences) =>
      experiences.map((experience) =>
        localizeExperience(experience, i18n.resolvedLanguage ?? i18n.language),
      ),
  });
}

export function useExperience(id: number) {
  const { i18n } = useTranslation();

  return useQuery({
    ...experienceQuery(id),

    select: (experience) =>
      localizeExperience(experience, i18n.resolvedLanguage ?? i18n.language),
  });
}
