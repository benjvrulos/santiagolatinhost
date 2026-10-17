import { Experience } from "@/types/experience.interface";

export function localizeExperience(
  experience: Experience,
  language: string,
): Experience {
  const languageCode = language.split("-")[0].toLowerCase();

  if (languageCode === "es") {
    return experience;
  }

  const experienceTranslation = experience.translations?.find(
    (translation) => translation.languageCode.toLowerCase() === languageCode,
  );

  const places = experience.places?.map((experiencePlace) => {
    const experiencePlaceTranslation = experiencePlace.translations?.find(
      (translation) => translation.languageCode.toLowerCase() === languageCode,
    );

    const placeTranslation = experiencePlace.place?.translations?.find(
      (translation) => translation.languageCode.toLowerCase() === languageCode,
    );

    return {
      ...experiencePlace,

      title: experiencePlaceTranslation?.title ?? experiencePlace.title,

      notes: experiencePlaceTranslation?.notes ?? experiencePlace.notes,

      place: {
        ...experiencePlace.place,

        name: placeTranslation?.name ?? experiencePlace.place.name,

        shortDescription:
          placeTranslation?.shortDescription ??
          experiencePlace.place.shortDescription,

        description:
          placeTranslation?.description ?? experiencePlace.place.description,
      },
    };
  });

  return {
    ...experience,

    name: experienceTranslation?.name ?? experience.name,

    slug: experienceTranslation?.slug ?? experience.slug,

    shortDescription:
      experienceTranslation?.shortDescription ?? experience.shortDescription,

    description: experienceTranslation?.description ?? experience.description,

    included: experienceTranslation?.included ?? experience.included,

    notIncluded: experienceTranslation?.notIncluded ?? experience.notIncluded,

    requirements:
      experienceTranslation?.requirements ?? experience.requirements,

    recommendations:
      experienceTranslation?.recommendations ?? experience.recommendations,

    places: places ?? experience.places,
  };
}
