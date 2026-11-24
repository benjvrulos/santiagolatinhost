import { useTranslation } from 'react-i18next';
import {
  formatOrderRange,
  resolveDayItems,
  type ItineraryOrder,
} from '@/lib/itinerary';
import { experienceName } from '@/i18n/experienceText';

interface ItineraryDetailsCardProps {
  order: ItineraryOrder;
}

export default function ItineraryDetailsCard({ order }: ItineraryDetailsCardProps) {
  const { t, i18n } = useTranslation();
  const travelers = Math.max(1, order.travelers || 1);
  const hasDates = Boolean(order.startDate && order.endDate);

  const rows = [
    {
      icon: 'ri-calendar-line',
      label: t('ck_itinerary_dates'),
      value: hasDates
        ? formatOrderRange(order, i18n.language)
        : t('it_purchase_dates_pending'),
    },
    { icon: 'ri-route-line', label: t('ck_itinerary_days'), value: String(order.days.length) },
    { icon: 'ri-group-line', label: t('ck_guests'), value: String(travelers) },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-7">
      <div className="flex items-center gap-2 mb-5">
        <i className="ri-route-line text-accent text-lg" />
        <h2 className="font-display text-lg text-primary font-bold">
          {t('ck_itinerary_label')}
        </h2>
      </div>

      <dl className="space-y-4">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start gap-3">
            <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 rounded-md bg-accent/10">
              <i className={`${row.icon} text-accent text-sm`} />
            </div>
            <div className="min-w-0">
              <dt className="text-gray-400 text-xs uppercase tracking-wider">{row.label}</dt>
              <dd className="text-primary text-sm font-medium mt-0.5">{row.value || '—'}</dd>
            </div>
          </div>
        ))}
      </dl>

      <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
        {order.days.map((day) => {
          const items = resolveDayItems(day);
          if (items.length === 0) return null;

          return (
            <div key={day.day}>
              <p className="text-accent text-xs font-semibold uppercase tracking-wider mb-2">
                {t('ck_itinerary_day', { count: day.day })}
              </p>
              <ul className="space-y-1.5">
                {items.map((item) => (
                  <li
                    key={`${day.day}-${item.id}`}
                    className="flex items-start justify-between gap-4 text-sm"
                  >
                    <span className="text-primary leading-snug">{experienceName(item, t)}</span>
                    <span className="text-gray-500 whitespace-nowrap">US${item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}