import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import { useExperienceBySlug } from "@/hooks/useExperiences";

export default function ExperienceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const heroRef = useRef<HTMLDivElement>(null);

  const [visibleSections, setVisibleSections] = useState<
    Record<string, boolean>
  >({});

  const { data: exp, isLoading, isError } = useExperienceBySlug(slug ?? "");

  const language = i18n.resolvedLanguage ?? i18n.language;

  useEffect(() => {
    if (!exp) return;

    window.scrollTo(0, 0);
  }, [exp]);

  useEffect(() => {
    if (!exp) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      {
        threshold: 0.1,
      },
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [exp]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />

          <p className="text-gray-500 text-sm">
            {t("exp_loading", {
              defaultValue: "Cargando experiencia...",
            })}
          </p>
        </div>
      </div>
    );
  }

  if (isError || !exp || !slug) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl text-primary mb-4">
            {t("exp_not_found", {
              defaultValue: "Experiencia no encontrada",
            })}
          </h1>

          <button
            onClick={() => navigate("/")}
            className="text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
          >
            {t("exp_back_to_list", {
              defaultValue: "Volver",
            })}
          </button>
        </div>
      </div>
    );
  }

  const schedule = exp.schedules?.[0];

  const getScheduleTime = (offsetMinutes = 0) => {
    if (!schedule) return "";

    const date = new Date(schedule.startDateTime);

    date.setMinutes(date.getMinutes() + offsetMinutes);

    return new Intl.DateTimeFormat(language, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/Santiago",
    }).format(date);
  };

  const formattedDate = schedule
    ? new Intl.DateTimeFormat(language, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "America/Santiago",
      }).format(new Date(schedule.startDateTime))
    : null;

  const formattedEndTime = schedule
    ? new Intl.DateTimeFormat(language, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "America/Santiago",
      }).format(new Date(schedule.endDateTime))
    : "";

  const formattedPrice = new Intl.NumberFormat(language, {
    style: "currency",
    currency: exp.currency,
    maximumFractionDigits: 0,
  }).format(Number(exp.price));

  const capacity = schedule?.capacity ?? exp.maxPeople;

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      {/* HERO */}
      <div
        ref={heroRef}
        className="relative h-[70vh] md:h-[80vh] overflow-hidden"
      >
        {exp.coverImage?.path ? (
          <img
            src={exp.coverImage.path}
            alt={exp.coverImage.altText ?? exp.name}
            className="w-full h-full object-cover object-[center_30%]"
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />

        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 xl:px-12 pb-10 md:pb-16">
          <div className="max-w-6xl mx-auto">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors"
            >
              <i className="ri-arrow-left-line" />

              {t("exp_back_to_list", {
                defaultValue: "Volver",
              })}
            </button>

            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-white font-bold mb-4 leading-tight max-w-3xl">
              {exp.name}
            </h1>

            <p className="text-white/80 text-base md:text-lg max-w-2xl leading-relaxed">
              {exp.shortDescription}
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-4 sm:px-6 lg:px-8 xl:px-12 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* MAIN */}
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
                  {exp.description}
                </p>
              </section>

              {/* ITINERARY */}
              {exp.places?.length > 0 && (
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
                    {exp.places.map((item, index) => {
                      const startOffset = item.startOffsetMinutes ?? 0;

                      const endOffset =
                        startOffset + (item.durationMinutes ?? 0);

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

                            {index < exp.places.length - 1 && (
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
              {exp.styles?.length > 0 && (
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
                    {exp.styles.map((experienceStyle) => (
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

            {/* SIDEBAR */}
            <aside className="lg:w-1/3">
              <div className="sticky top-24 space-y-4">
                {/* GENERAL INFO */}
                <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm">
                  <div className="space-y-5">
                    {formattedDate && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 rounded-md bg-accent/10">
                          <i className="ri-calendar-line text-accent text-sm" />
                        </div>

                        <div>
                          <p className="text-gray-400 text-xs uppercase tracking-wider">
                            {t("exp_label_date", {
                              defaultValue: "Fecha",
                            })}
                          </p>

                          <p className="text-primary text-sm font-medium capitalize">
                            {formattedDate}
                          </p>
                        </div>
                      </div>
                    )}

                    {schedule && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 rounded-md bg-accent/10">
                          <i className="ri-time-line text-accent text-sm" />
                        </div>

                        <div>
                          <p className="text-gray-400 text-xs uppercase tracking-wider">
                            {t("exp_label_schedule", {
                              defaultValue: "Horario",
                            })}
                          </p>

                          <p className="text-primary text-sm font-medium">
                            {getScheduleTime(0)}
                            {" – "}
                            {formattedEndTime}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 rounded-md bg-accent/10">
                        <i className="ri-group-line text-accent text-sm" />
                      </div>

                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider">
                          {t("exp_label_group", {
                            defaultValue: "Grupo",
                          })}
                        </p>

                        <p className="text-primary text-sm font-medium">
                          {t("exp_up_to_people", {
                            count: capacity,
                            defaultValue: `Hasta ${capacity} personas`,
                          })}
                        </p>
                      </div>
                    </div>

                    {exp.meetingPoint && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 rounded-md bg-accent/10">
                          <i className="ri-map-pin-line text-accent text-sm" />
                        </div>

                        <div>
                          <p className="text-gray-400 text-xs uppercase tracking-wider">
                            {t("exp_label_meeting", {
                              defaultValue: "Punto de encuentro",
                            })}
                          </p>

                          <p className="text-primary text-sm font-medium">
                            {exp.meetingPoint}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* PRICE */}
                <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm">
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                    {t("exp_label_price", {
                      defaultValue: "Precio",
                    })}
                  </p>

                  <p className="font-display text-3xl font-bold text-primary">
                    {formattedPrice}
                  </p>

                  <p className="text-gray-400 text-xs mt-1">
                    {/* {t(exp.priceNoteKey)} */}
                  </p>
                </div>

                {/* INCLUDED */}
                {exp.included && (
                  <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm">
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                      {t("exp_label_includes", {
                        defaultValue: "Incluye",
                      })}
                    </p>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {exp.included}
                    </p>
                  </div>
                )}

                {/* NOT INCLUDED */}
                {exp.notIncluded && (
                  <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm">
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                      {t("exp_label_not_includes", {
                        defaultValue: "No incluye",
                      })}
                    </p>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {exp.notIncluded}
                    </p>
                  </div>
                )}

                {/* REQUIREMENTS */}
                {exp.requirements && (
                  <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm">
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                      {t("exp_label_requirements", {
                        defaultValue: "Requisitos",
                      })}
                    </p>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {exp.requirements}
                    </p>
                  </div>
                )}

                {/* RECOMMENDATIONS */}
                {exp.recommendations && (
                  <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm">
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                      {t("exp_label_recommendations", {
                        defaultValue: "Recomendaciones",
                      })}
                    </p>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {exp.recommendations}
                    </p>
                  </div>
                )}

                {/* BOOK */}
                <a
                  href="https://wa.me/56923895542"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center whitespace-nowrap text-sm font-semibold px-5 py-3 rounded-full bg-accent text-white hover:bg-accent-dark transition-colors"
                >
                  {t("exp_cta_book", {
                    defaultValue: "Reservar experiencia",
                  })}
                </a>

                {/* WHATSAPP */}
                <a
                  href="https://wa.me/56923895542"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center whitespace-nowrap text-sm font-medium px-5 py-3 rounded-full border border-gray-200 text-primary hover:border-accent hover:text-accent transition-colors"
                >
                  {t("exp_cta_whatsapp", {
                    defaultValue: "Consultar por WhatsApp",
                  })}
                </a>

                {/* INSTAGRAM */}
                <a
                  href="https://www.instagram.com/santiagolatinhost/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center whitespace-nowrap text-sm font-medium px-5 py-3 rounded-full border border-gray-200 text-primary hover:border-pink-500 hover:text-pink-500 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <i className="ri-instagram-line" />
                  Instagram
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
