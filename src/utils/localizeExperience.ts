// utils/localizeExperience.ts

import { Experience } from "@/types/experience";

export function localizeExperience(
  experience: Experience,
  language: string,
): Experience {
  const languageCode = language.split("-")[0];

  const { translations, ...baseExperience } = experience;

  if (languageCode === "es") {
    return baseExperience;
  }

  const translation = translations?.find(
    (item) => item.languageCode === languageCode,
  );

  if (!translation) {
    return baseExperience;
  }

  return {
    ...baseExperience,
    name: translation.name,
    slug: translation.slug,
    shortDescription: translation.shortDescription,
    description: translation.description,
    included: translation.included,
    notIncluded: translation.notIncluded,
    requirements: translation.requirements,
    recommendations: translation.recommendations,
  };
}
