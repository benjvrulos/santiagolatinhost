import { useTranslation } from 'react-i18next';
import type { ExperienceSchedule } from '@/mocks/experiences';
import { formatScheduleDate, formatScheduleTime } from './formatSchedule';

interface ScheduleCardProps {
  schedule: ExperienceSchedule | null;
  whatsappHref: string;
}

export default function ScheduleCard({ schedule, whatsappHref }: ScheduleCardProps) {
  const { t, i18n } = useTranslation();
  const isAvailable = schedule?.status === 'available';

  return (
    <div className="mb-6">
      <p className="text-gray-400 text-[11px] font-semibold uppercase tracking-wider mb-3">
        {t('exp_booking_schedule_label')}
      </p>

      {schedule ? (
        <div className="rounded-xl border border-gray-200 bg-surface/70 p-4 md:p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 text-primary">
              <i className="ri-calendar-line text-accent text-base" />
              <span className="font-semibold text-sm md:text-base">
                {formatScheduleDate(schedule, i18n.language)}
              </span>
            </div>
            {isAvailable ? (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {t('exp_booking_available')}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-full px-2.5 py-1 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                {t('exp_booking_full')}
              </span>
            )}
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <p className="flex items-center gap-2">
              <i className="ri-time-line text-accent" />
              {formatScheduleTime(schedule, i18n.language)}
            </p>
            <p className="flex items-center gap-2">
              <i className="ri-global-line text-accent" />
              Santiago, Chile (GMT-3)
            </p>
            <p className="flex items-center gap-2">
              <i className="ri-group-line text-accent" />
              {t('exp_booking_spots', { count: schedule.capacity })}
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-200 bg-surface/70 p-5 text-center">
          <i className="ri-calendar-close-line text-2xl text-gray-400" />
          <p className="text-gray-600 text-sm mt-2 leading-relaxed">
            {t('exp_booking_no_dates')}
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
        {t('exp_booking_ask_date')}
      </a>
    </div>
  );
}