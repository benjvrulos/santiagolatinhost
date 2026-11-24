import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { formatOrderRange, getItineraryTotals, type ItineraryOrder } from '@/lib/itinerary';

interface ReviewSummaryProps {
  order: ItineraryOrder;
  onContinue: () => void;
  onBack: () => void;
  onDatesChange: (startDate: string, endDate: string) => void;
}

const inputClass =
  'w-full min-w-0 px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-primary text-sm focus:outline-none focus:border-accent transition-colors box-border';

function toInputDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function addDays(isoDate: string, days: number): string {
  const date = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  date.setDate(date.getDate() + days);
  return toInputDate(date);
}

export default function ReviewSummary({
  order,
  onContinue,
  onBack,
  onDatesChange,
}: ReviewSummaryProps) {
  const { t, i18n } = useTranslation();
  const { perPerson, total, itemCount } = getItineraryTotals(order);
  const travelers = Math.max(1, order.travelers || 1);

  const today = toInputDate(new Date());
  const hasDates = Boolean(order.startDate && order.endDate);

  const [draftStart, setDraftStart] = useState(order.startDate || today);
  const [draftEnd, setDraftEnd] = useState(order.endDate || addDays(order.startDate || today, 2));

  const rows = [
    {
      icon: 'ri-calendar-line',
      label: t('it_purchase_dates'),
      value: hasDates ? formatOrderRange(order, i18n.language) : t('it_purchase_dates_pending'),
    },
    { icon: 'ri-group-line', label: t('it_purchase_travelers'), value: String(travelers) },
    { icon: 'ri-route-line', label: t('it_purchase_experiences'), value: String(itemCount) },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-7">
      <div className="flex items-center gap-2 mb-5">
        <i className="ri-receipt-line text-accent text-lg" />
        <h2 className="font-display text-lg text-primary font-bold">
          {t('it_purchase_summary')}
        </h2>
      </div>

      <dl className="space-y-3.5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start justify-between gap-4 text-sm">
            <dt className="text-gray-500 whitespace-nowrap flex items-center gap-2">
              <i className={`${row.icon} text-accent`} />
              {row.label}
            </dt>
            <dd
              className={`text-right min-w-0 break-words ${
                row.label === t('it_purchase_dates') && !hasDates
                  ? 'text-gray-400 font-normal'
                  : 'text-primary font-medium'
              }`}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      {!hasDates && (
        <div className="mt-4 rounded-xl bg-surface border border-gray-100 p-4">
          <p className="text-primary text-xs font-semibold mb-3 flex items-center gap-1.5">
            <i className="ri-calendar-event-line text-accent" />
            {t('it_purchase_pick_dates')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-w-0">
            <div className="min-w-0">
              <label className="block text-gray-500 text-[11px] font-medium uppercase tracking-wider mb-1.5">
                {t('it_purchase_start')}
              </label>
              <input
                type="date"
                value={draftStart}
                min={today}
                onChange={(e) => {
                  const value = e.target.value;
                  setDraftStart(value);
                  if (value && (!draftEnd || draftEnd < value)) {
                    setDraftEnd(addDays(value, 2));
                  }
                }}
                className={inputClass}
              />
            </div>
            <div className="min-w-0">
              <label className="block text-gray-500 text-[11px] font-medium uppercase tracking-wider mb-1.5">
                {t('it_purchase_end')}
              </label>
              <input
                type="date"
                value={draftEnd}
                min={draftStart || today}
                onChange={(e) => setDraftEnd(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
          <button
            type="button"
            disabled={!draftStart || !draftEnd}
            onClick={() => onDatesChange(draftStart, draftEnd)}
            className="mt-3 w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white text-xs font-semibold rounded-full hover:bg-accent transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="ri-check-line" />
            {t('it_purchase_apply_dates')}
          </button>
        </div>
      )}

      <div className="mt-5 pt-5 border-t border-gray-100 space-y-3 text-sm">
        <div className="flex items-start justify-between gap-4">
          <dt className="text-gray-500">{t('it_purchase_per_person')}</dt>
          <dd className="text-primary font-medium whitespace-nowrap">US${perPerson}</dd>
        </div>
        <div className="flex items-start justify-between gap-4">
          <dt className="text-gray-500">
            {t('ai_for_people', { count: travelers })}
          </dt>
          <dd className="text-primary font-medium whitespace-nowrap">
            × {travelers}
          </dd>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 flex items-end justify-between gap-4">
        <span className="text-primary text-sm font-semibold">{t('it_purchase_total')}</span>
        <span className="font-display text-2xl md:text-3xl text-primary font-bold whitespace-nowrap">
          US${total}
        </span>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-white text-sm font-semibold rounded-full hover:bg-accent-dark transition-colors whitespace-nowrap cursor-pointer"
      >
        <i className="ri-secure-payment-line" />
        {t('it_purchase_continue')}
      </button>

      <p className="mt-3 flex items-start gap-1.5 text-gray-400 text-[11px] leading-relaxed">
        <i className="ri-information-line mt-0.5 text-warm" />
        {t('it_purchase_note')}
      </p>

      <button
        type="button"
        onClick={onBack}
        className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 text-primary text-sm font-medium rounded-full hover:border-accent hover:text-accent transition-colors whitespace-nowrap cursor-pointer"
      >
        <i className="ri-arrow-left-line" />
        {t('it_purchase_back')}
      </button>
    </div>
  );
}