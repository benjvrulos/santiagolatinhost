import type { ExperienceSchedule } from "@/mocks/experiences";
import {
  formatScheduleDate,
  formatScheduleTime,
  formatSpots,
} from "./formatSchedule";
import { t } from "i18next";

interface ScheduleCardProps {
  schedule: ExperienceSchedule | null;
  whatsappHref: string;
}

export default function ScheduleCard({
  schedule,
  whatsappHref,
}: ScheduleCardProps) {
  const isAvailable =
    schedule?.status === "AVAILABLE" && schedule?.capacity > 0;

  console.log(schedule);

  return (
    <div className="mb-6">
      <p className="text-gray-400 text-[11px] font-semibold uppercase tracking-wider mb-3">
        Your schedule
      </p>

      {schedule ? (
        <div className="rounded-xl border border-gray-200 bg-surface/70 p-4 md:p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 text-primary">
              <i className="ri-calendar-line text-accent text-base" />
              <span className="font-semibold text-sm md:text-base">
                {t(formatScheduleDate(schedule))}
              </span>
            </div>
            {isAvailable ? (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Available
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-full px-2.5 py-1 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                Full
              </span>
            )}
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <p className="flex items-center gap-2">
              <i className="ri-time-line text-accent" />
              {formatScheduleTime(schedule)}
            </p>
            <p className="flex items-center gap-2">
              <i className="ri-global-line text-accent" />
              Santiago, Chile (GMT-3)
            </p>
            <p className="flex items-center gap-2">
              <i className="ri-group-line text-accent" />
              {formatSpots(schedule.capacity)}
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-200 bg-surface/70 p-5 text-center">
          <i className="ri-calendar-close-line text-2xl text-gray-400" />
          <p className="text-gray-600 text-sm mt-2 leading-relaxed">
            No dates available right now. Contact us to arrange your experience.
          </p>
        </div>
      )}

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-accent underline underline-offset-2 transition-colors"
      >
        <i className="ri-whatsapp-line" />
        Can&apos;t make this date? Ask for another date
      </a>
    </div>
  );
}
