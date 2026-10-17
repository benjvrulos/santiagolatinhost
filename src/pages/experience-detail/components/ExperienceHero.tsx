import { Experience } from "@/types/experience.interface";
import { useTranslation } from "react-i18next";

interface ExperienceHeroProps {
  experience: Experience;
  onBack: () => void;
}

export default function ExperienceHero({
  experience,
  onBack,
}: ExperienceHeroProps) {
  const { t } = useTranslation();

  return (
    <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      {experience.coverImage?.path ? (
        <img
          src={experience.coverImage.path}
          alt={experience.coverImage.altText ?? experience.name}
          className="w-full h-full object-cover object-[center_30%]"
        />
      ) : (
        <div className="w-full h-full bg-gray-200" />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />

      <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 xl:px-12 pb-10 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors"
          >
            <i className="ri-arrow-left-line" />

            {t("exp_back_to_list", {
              defaultValue: "Volver",
            })}
          </button>

          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-white font-bold mb-4 leading-tight max-w-3xl">
            {experience.name}
          </h1>

          <p className="text-white/80 text-base md:text-lg max-w-2xl leading-relaxed">
            {experience.shortDescription}
          </p>
        </div>
      </div>
    </div>
  );
}
