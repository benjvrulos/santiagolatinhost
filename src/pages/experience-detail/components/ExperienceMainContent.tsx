import { Experience, ExperienceSchedule } from "@/types/experience.interface";
import { useTranslation } from "react-i18next";

interface ExperienceMainContentProps {
  experience: Experience;
  schedule: ExperienceSchedule | null;
  language: string;
  visibleSections: Record<string, boolean>;
}

export default function ExperienceMainContent({
  experience,
  schedule,
  language,
  visibleSections,
}: ExperienceMainContentProps) {
  const getScheduleTime = (offsetMinutes = 0) => {
    if (!schedule) {
      return "";
    }

    const date = new Date(schedule.startDateTime);

    date.setMinutes(date.getMinutes() + offsetMinutes);

    return new Intl.DateTimeFormat(language, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/Santiago",
    }).format(date);
  };

  const { t } = useTranslation();
  return (
    <div className="lg:w-2/3">
      {/* DESCRIPTION */}
      <section
        id="desc"
        data-animate
        className={`mb-12 transition-all duration-700 ${
          visibleSections.desc
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          {experience.description}
        </p>
      </section>

      {/* ITINERARY */}
      {experience.places?.length > 0 && (
        <section
          id="itinerary"
          data-animate
          className={`mb-12 transition-all duration-700 delay-100 ${
            visibleSections.itinerary
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-xl md:text-2xl text-primary font-bold mb-6">
            {t("exp_label_itinerary", {
              defaultValue: "Itinerario",
            })}
          </h2>

          <div className="space-y-0">
            {experience.places.map((item, index) => {
              const startOffset = item.startOffsetMinutes ?? 0;

              const endOffset = startOffset + (item.durationMinutes ?? 0);

              return (
                <div
                  key={item.id}
                  className="flex gap-4 md:gap-6 pb-7 relative"
                >
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-accent text-xs font-bold">
                        {index + 1}
                      </span>
                    </div>

                    {index < experience.places.length - 1 && (
                      <div className="w-px flex-1 bg-gray-200 mt-2" />
                    )}
                  </div>

                  <div className="pt-1 pb-2">
                    {schedule && (
                      <span className="text-accent text-sm font-semibold">
                        {getScheduleTime(startOffset)}
                        {" – "}
                        {getScheduleTime(endOffset)}
                      </span>
                    )}

                    {item.title && (
                      <h3 className="font-display text-base md:text-lg text-primary font-bold mt-1">
                        {item.title}
                      </h3>
                    )}

                    {item.place && (
                      <div className="mt-2">
                        <p className="text-gray-700 text-sm font-medium">
                          {item.place.name}
                        </p>

                        {item.place.address && (
                          <p className="text-gray-500 text-sm mt-1 flex items-start gap-1">
                            <i className="ri-map-pin-line mt-0.5" />
                            <span>{item.place.address}</span>
                          </p>
                        )}
                      </div>
                    )}

                    {item.notes && (
                      <p className="text-gray-500 text-sm md:text-base mt-2 leading-relaxed">
                        {item.notes}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* STYLES */}
      {experience.styles?.length > 0 && (
        <section
          id="styles"
          data-animate
          className={`mb-12 transition-all duration-700 delay-150 ${
            visibleSections.styles
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-xl md:text-2xl text-primary font-bold mb-6">
            {t("exp_label_styles", {
              defaultValue: "Estilos de baile",
            })}
          </h2>

          <div className="flex flex-wrap gap-3">
            {experience.styles.map((experienceStyle) => (
              <span
                key={experienceStyle.id}
                className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium"
              >
                <i className="ri-music-2-line" />
                {experienceStyle.style.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
