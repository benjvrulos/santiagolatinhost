import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { marketCategories, marketEvents, type MarketCategoryId } from '@/mocks/marketplace';

const locations = ['Santiago', 'Valparaíso', 'Valle de Colchagua', 'Tarapacá'];

export default function EventsBoard() {
  const { t, i18n } = useTranslation();
  const [category, setCategory] = useState<'all' | MarketCategoryId>('all');
  const [month, setMonth] = useState('all');
  const [location, setLocation] = useState('all');

  const locale = i18n.language?.startsWith('es')
    ? 'es-CL'
    : i18n.language?.startsWith('zh')
      ? 'zh-CN'
      : 'en-US';

  const monthName = (value: number) =>
    new Intl.DateTimeFormat(locale, { month: 'long' }).format(new Date(2026, value - 1, 1));

  const filtered = useMemo(
    () =>
      marketEvents.filter((event) => {
        if (category !== 'all' && event.category !== category) return false;
        if (month !== 'all' && event.month !== Number(month)) return false;
        if (location !== 'all' && event.location !== location) return false;
        return true;
      }),
    [category, month, location]
  );

  return (
    <div className="max-w-6xl mx-auto mt-14 md:mt-20">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div>
          <h3 className="font-display text-2xl md:text-3xl text-primary font-bold mb-1">
            {t('ev_title')}
          </h3>
          <p className="text-gray-500 text-sm md:text-base max-w-xl leading-relaxed">
            {t('ev_subtitle')}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6 p-4 bg-white rounded-xl border border-gray-100">
        <div className="min-w-0">
          <label className="block text-primary text-xs font-semibold uppercase tracking-wider mb-1.5">
            {t('ev_filter_month')}
          </label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-primary text-sm focus:outline-none focus:border-accent transition-colors cursor-pointer"
          >
            <option value="all">{t('ev_all_dates')}</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>{monthName(m)}</option>
            ))}
          </select>
        </div>

        <div className="min-w-0">
          <label className="block text-primary text-xs font-semibold uppercase tracking-wider mb-1.5">
            {t('ev_filter_category')}
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as 'all' | MarketCategoryId)}
            className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-primary text-sm focus:outline-none focus:border-accent transition-colors cursor-pointer"
          >
            <option value="all">{t('mkt_category_all')}</option>
            {marketCategories
              .filter((c) => ['culture', 'food', 'dance', 'events'].includes(c.id))
              .map((c) => (
                <option key={c.id} value={c.id}>{t(c.labelKey)}</option>
              ))}
          </select>
        </div>

        <div className="min-w-0">
          <label className="block text-primary text-xs font-semibold uppercase tracking-wider mb-1.5">
            {t('ev_filter_location')}
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-primary text-sm focus:outline-none focus:border-accent transition-colors cursor-pointer"
          >
            <option value="all">{t('ev_all_locations')}</option>
            {locations.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Events */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <i className="ri-calendar-2-line text-3xl text-accent" />
          <p className="text-gray-500 text-sm mt-3">{t('ev_no_results')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((event) => {
            const cat = marketCategories.find((c) => c.id === event.category);
            return (
              <div
                key={event.id}
                className="group bg-white rounded-xl border border-gray-100 p-5 hover:border-accent/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="w-11 h-11 flex items-center justify-center rounded-lg bg-accent/10 flex-shrink-0">
                    <i className={`${cat?.icon ?? 'ri-calendar-event-line'} text-lg text-accent`} />
                  </span>
                  <span className="text-[11px] font-semibold text-warm bg-warm/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                    {monthName(event.month)}
                  </span>
                </div>
                <h4 className="font-display text-base text-primary font-bold mb-1.5 leading-tight">
                  {event.name}
                </h4>
                <p className="inline-flex items-center gap-1.5 text-gray-400 text-xs mb-2">
                  <i className="ri-map-pin-line" />
                  {event.location}
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {event.note}
                </p>
              </div>
            );
          })}
        </div>
      )}

      <p className="flex items-start gap-2 text-gray-400 text-xs leading-relaxed mt-5">
        <i className="ri-information-line mt-0.5 text-warm" />
        {t('ev_disclaimer')}
      </p>
    </div>
  );
}