import { useTranslation } from 'react-i18next';
import { resolveDayItems, type ItineraryOrder } from '@/lib/itinerary';
import { experienceLocation, experienceName } from '@/i18n/experienceText';

interface DayItineraryProps {
  order: ItineraryOrder;
}

export default function DayItinerary({ order }: DayItineraryProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      {order.days.map((day) => {
        const items = resolveDayItems(day);
        if (items.length === 0) return null;

        return (
          <div
            key={day.day}
            className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6"
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-8 h-8 flex items-center justify-center flex-shrink-0 rounded-full bg-accent/10 text-accent text-xs font-bold">
                  {day.day}
                </span>
                <h2 className="font-display text-base md:text-lg text-primary font-bold truncate">
                  {t('ai_day', { count: day.day })}
                </h2>
              </div>
              <span className="text-gray-400 text-xs whitespace-nowrap">
                {t('it_purchase_day_items', { count: items.length })}
              </span>
            </div>

            <ul className="space-y-3">
              {items.map((item) => (
                <li key={`${day.day}-${item.id}`} className="flex gap-3 md:gap-4">
                  <div className="w-20 h-16 md:w-24 md:h-20 rounded-lg overflow-hidden flex-shrink-0 bg-surface">
                    <img
                      src={item.img}
                      alt={experienceName(item, t)}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-primary text-sm font-semibold leading-snug">
                      {experienceName(item, t)}
                    </p>
                    <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                      <i className="ri-map-pin-line text-accent" />
                      {experienceLocation(item, t)}
                    </p>
                    <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                      <i className="ri-time-line" />
                      {item.nights
                        ? t('mkt_nights', { count: item.nights })
                        : item.durationHours
                          ? t('it_purchase_hours', { count: item.durationHours })
                          : t('it_purchase_shared_group')}
                    </p>
                  </div>
                  <span className="font-display text-sm md:text-base text-primary font-bold whitespace-nowrap">
                    US${item.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}