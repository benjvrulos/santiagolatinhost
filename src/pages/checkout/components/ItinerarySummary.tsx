import { useTranslation } from 'react-i18next';
import { getItineraryTotals, type ItineraryOrder } from '@/lib/itinerary';

interface ItinerarySummaryProps {
  order: ItineraryOrder;
}

export default function ItinerarySummary({ order }: ItinerarySummaryProps) {
  const { t } = useTranslation();
  const { perPerson, total, itemCount, dayCount } = getItineraryTotals(order);
  const travelers = Math.max(1, order.travelers || 1);

  const rows = [
    { label: t('ck_itinerary_days'), value: String(dayCount) },
    { label: t('ck_itinerary_experiences'), value: String(itemCount) },
    { label: t('ck_guests'), value: String(travelers) },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-7">
      <div className="flex items-center gap-2 mb-5">
        <i className="ri-receipt-line text-accent text-lg" />
        <h2 className="font-display text-lg text-primary font-bold">{t('ck_summary_label')}</h2>
      </div>

      <p className="font-display text-base text-primary font-bold leading-snug mb-4">
        {t('ck_itinerary_bundle')}
      </p>

      <dl className="space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start justify-between gap-4 text-sm">
            <dt className="text-gray-500 whitespace-nowrap">{row.label}</dt>
            <dd className="text-primary font-medium text-right">{row.value}</dd>
          </div>
        ))}
        <div className="flex items-start justify-between gap-4 text-sm">
          <dt className="text-gray-500 whitespace-nowrap">{t('ck_price_per_person')}</dt>
          <dd className="text-primary font-medium text-right">US${perPerson}</dd>
        </div>
      </dl>

      <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
        <span className="text-primary text-sm font-semibold">{t('ck_total')}</span>
        <span className="font-display text-2xl text-primary font-bold">US${total}</span>
      </div>
    </div>
  );
}