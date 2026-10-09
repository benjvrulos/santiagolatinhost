import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import useInView from "@/hooks/useInView";
import { useExperiences } from "@/hooks/useExperiences";

export default function Tonight() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { ref, visible } = useInView(0.1);

  const { data: experiences, isPending, isError } = useExperiences();

  const experience =
    experiences?.find((item) => item.isFeatured && item.isActive) ??
    experiences?.find((item) => item.isActive) ??
    experiences?.[0];

  const schedule = experience?.schedules?.[0];

  const language = i18n.resolvedLanguage ?? i18n.language;

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const price = experience
    ? new Intl.NumberFormat(language, {
        style: "currency",
        currency: experience.currency,
        maximumFractionDigits: 0,
      }).format(Number(experience.price))
    : "";

  const eventDate = schedule
    ? new Intl.DateTimeFormat(language, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "America/Santiago",
      }).format(new Date(schedule.startDateTime))
    : "";

  const eventTime = schedule
    ? new Intl.DateTimeFormat(language, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "America/Santiago",
      }).format(new Date(schedule.startDateTime))
    : "";

  const capacity = schedule?.capacity ?? experience?.maxPeople ?? 0;

  return (
    <section
      id="tonight"
      ref={ref}
      className="bg-surface py-16 md:py-24 lg:py-28"
    >
      <div className="section-padding">
        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-10 md:mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-2 text-warm font-medium text-xs md:text-sm tracking-[0.25em] uppercase mb-4">
            <span className="relative flex w-2 h-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full w-2 h-2 bg-accent" />
            </span>

            {t("tonight_label")}
          </span>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-4 leading-tight">
            {t("tonight_title")}
          </h2>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            {t("tonight_subtitle")}
          </p>
        </div>

        {/* Loading */}
        {isPending && (
          <div className="max-w-5xl mx-auto h-[420px] rounded-2xl bg-gray-100 animate-pulse" />
        )}

        {/* Error */}
        {isError && (
          <p className="text-center text-gray-500">
            {t("tonight_error", "No pudimos cargar la experiencia.")}
          </p>
        )}

        {/* Featured */}
        {experience && (
          <div
            className={`max-w-5xl mx-auto bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-700 delay-150 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex flex-col lg:flex-row">
              {/* Imagen */}
              <div className="relative w-full h-64 sm:h-80 lg:w-1/2 lg:h-auto lg:self-stretch overflow-hidden bg-gray-100">
                {experience.coverImage && (
                  <img
                    src={experience.coverImage.path}
                    alt={experience.coverImage.altText ?? experience.name}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                )}

                {experience.isFeatured && (
                  <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
                    <i className="ri-flashlight-fill text-xs" />
                    {t("tonight_live")}
                  </span>
                )}
              </div>

              {/* Información */}
              <div className="lg:w-1/2 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                {schedule && (
                  <span className="text-accent text-sm font-semibold mb-2 capitalize">
                    {eventDate}
                    {" · "}
                    {eventTime}
                  </span>
                )}

                <h3 className="font-display text-2xl md:text-3xl text-primary font-bold mb-3">
                  {experience.name}
                </h3>

                <p className="text-gray-600 text-base leading-relaxed mb-4">
                  {experience.shortDescription}
                </p>

                {experience.meetingPoint && (
                  <p className="inline-flex items-start gap-2 text-gray-600 text-sm mb-6">
                    <i className="ri-map-pin-line text-accent mt-0.5" />

                    <span>{experience.meetingPoint}</span>
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-6">
                  <span className="inline-flex items-center gap-2 text-primary text-sm font-medium">
                    <i className="ri-group-line text-accent" />

                    {t("tonight_main_spots", {
                      count: capacity,
                      defaultValue: "Hasta {{count}} personas",
                    })}
                  </span>

                  <span className="font-display text-2xl text-primary font-bold">
                    {price}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => navigate(`/experiencia/${experience.slug}`)}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent text-white font-semibold rounded-full hover:bg-accent-dark transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <span>{t("tonight_view_detail")}</span>

                    <i className="ri-arrow-right-line" />
                  </button>

                  <button
                    onClick={() => scrollTo("#reserva")}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-primary/15 text-primary font-semibold rounded-full hover:border-accent hover:text-accent transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-calendar-check-line" />

                    <span>{t("tonight_book")}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
