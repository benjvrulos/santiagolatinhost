import { Experience, ExperienceSchedule } from "@/types/experience.interface";
import { useTranslation } from "react-i18next";

interface ExperienceSidebarProps {
  experience: Experience;
  schedule: ExperienceSchedule | null;
  language: string;
}

export default function ExperienceSideBar({
  experience,
  schedule,
  language,
}: ExperienceSidebarProps) {
  const { t } = useTranslation();
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
    currency: experience.currency,
    maximumFractionDigits: experience.currency === "CLP" ? 0 : 2,
  }).format(Number(experience.price));

  const hasAvailability =
    !!schedule &&
    schedule.status === "AVAILABLE" &&
    schedule.availableSpots > 0;

  const scrollToBooking = () => {
    document.getElementById("reserva")?.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
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
                  {t("exp_label_group")}
                </p>
                <p className="text-primary text-sm font-medium">
                  {schedule.capacity}
                </p>
              </div>
            </div>

            {experience.meetingPoint && (
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
                    {experience.meetingPoint}
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
        {experience.included && (
          <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
              {t("exp_label_includes", {
                defaultValue: "Incluye",
              })}
            </p>

            <p className="text-gray-600 text-sm leading-relaxed">
              {experience.included}
            </p>
          </div>
        )}

        {/* NOT INCLUDED */}
        {experience.notIncluded && (
          <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
              {t("exp_label_not_includes", {
                defaultValue: "No incluye",
              })}
            </p>

            <p className="text-gray-600 text-sm leading-relaxed">
              {experience.notIncluded}
            </p>
          </div>
        )}

        {/* REQUIREMENTS */}
        {experience.requirements && (
          <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
              {t("exp_label_requirements", {
                defaultValue: "Requisitos",
              })}
            </p>

            <p className="text-gray-600 text-sm leading-relaxed">
              {experience.requirements}
            </p>
          </div>
        )}

        {/* RECOMMENDATIONS */}
        {experience.recommendations && (
          <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
              {t("exp_label_recommendations", {
                defaultValue: "Recomendaciones",
              })}
            </p>

            <p className="text-gray-600 text-sm leading-relaxed">
              {experience.recommendations}
            </p>
          </div>
        )}

        {/* BOOK */}
        <button
          onClick={scrollToBooking}
          className="block w-full text-center whitespace-nowrap text-sm font-semibold px-5 py-3 rounded-full bg-accent text-white hover:bg-accent-dark transition-colors cursor-pointer"
        >
          {t("exp_cta_book")}
        </button>
        <a
          href="https://wa.me/56923895542"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center whitespace-nowrap text-sm font-medium px-5 py-3 rounded-full border border-gray-200 text-primary hover:border-accent hover:text-accent transition-colors"
        >
          {t("exp_cta_whatsapp")}
        </a>
        <a
          href="https://www.instagram.com/santiagolatinhost/"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center whitespace-nowrap text-sm font-medium px-5 py-3 rounded-full border border-gray-200 text-primary hover:border-pink-500 hover:text-pink-500 transition-colors inline-flex items-center justify-center gap-2"
        >
          <i className="ri-instagram-line" />
          Instagram
        </a>
      </div>
    </aside>
  );
}
