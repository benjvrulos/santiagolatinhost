import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useInView from '@/hooks/useInView';
import { experienceLocation, experienceName } from '@/i18n/experienceText';
import {
  marketCategories,
  marketExperiences,
  type MarketCategoryId,
  type MarketExperience,
} from '@/mocks/marketplace';

type BudgetTier = 'all' | 'low' | 'mid' | 'high';

const destinations = ['Santiago', 'Cajón del Maipo', 'Casablanca', 'Tarapacá'];

function priceTier(price: number): Exclude<BudgetTier, 'all'> {
  if (price < 40) return 'low';
  if (price <= 80) return 'mid';
  return 'high';
}

export default function Marketplace() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { ref, visible } = useInView(0.06);

  const [category, setCategory] = useState<'all' | MarketCategoryId>('all');
  const [destination, setDestination] = useState('all');
  const [date, setDate] = useState('');
  const [budget, setBudget] = useState<BudgetTier>('all');

  const filtered = useMemo(() => {
    const month = date ? new Date(`${date}T00:00:00`).getMonth() + 1 : null;
    return marketExperiences.filter((exp) => {
      if (category !== 'all' && exp.category !== category) return false;
      if (destination !== 'all' && exp.location !== destination) return false;
      if (month !== null && !exp.months.includes(month)) return false;
      if (budget !== 'all' && priceTier(exp.price) !== budget) return false;
      return true;
    });
  }, [category, destination, date, budget]);

  const resetFilters = () => {
    setCategory('all');
    setDestination('all');
    setDate('');
    setBudget('all');
  };

  const openExperience = (exp: MarketExperience) => {
    if (exp.experienceId) {
      navigate(`/experiencia/${exp.experienceId}`);
      return;
    }
    const el = document.querySelector('#reserva');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="experiences" ref={ref} className="bg-white py-16 md:py-24 lg:py-28">
      <div className="section-padding">
        {/* Header */}
        <div className={`text-center max-w-2xl mx-auto mb-10 md:mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block text-warm font-medium text-xs md:text-sm tracking-[0.25em] uppercase mb-4">
            {t('mkt_label')}
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-4 leading-tight">
            {t('mkt_title')}
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            {t('mkt_subtitle')}
          </p>
        </div>

        {/* Category pills */}
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-2 mb-6">
          <button
            onClick={() => setCategory('all')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
              category === 'all'
                ? 'bg-accent text-white'
                : 'bg-surface text-primary hover:bg-surface-dark'
            }`}
          >
            <i className="ri-apps-2-line text-base" />
            {t('mkt_category_all')}
          </button>
          {marketCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                category === cat.id
                  ? 'bg-accent text-white'
                  : 'bg-surface text-primary hover:bg-surface-dark'
              }`}
            >
              <i className={`${cat.icon} text-base`} />
              {t(cat.labelKey)}
            </button>
          ))}
        </div>

        {/* Secondary filters */}
        <div className="max-w-6xl mx-auto bg-surface rounded-2xl p-4 md:p-5 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <div className="min-w-0">
              <label className="block text-primary text-xs font-semibold uppercase tracking-wider mb-1.5">
                {t('mkt_filter_destination')}
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-primary text-sm focus:outline-none focus:border-accent transition-colors cursor-pointer"
              >
                <option value="all">{t('mkt_destination_all')}</option>
                {destinations.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="min-w-0">
              <label className="block text-primary text-xs font-semibold uppercase tracking-wider mb-1.5">
                {t('mkt_filter_date')}
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-primary text-sm focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            <div className="min-w-0">
              <label className="block text-primary text-xs font-semibold uppercase tracking-wider mb-1.5">
                {t('mkt_filter_budget')}
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value as BudgetTier)}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-primary text-sm focus:outline-none focus:border-accent transition-colors cursor-pointer"
              >
                <option value="all">{t('mkt_budget_all')}</option>
                <option value="low">{t('mkt_budget_low')}</option>
                <option value="mid">{t('mkt_budget_mid')}</option>
                <option value="high">{t('mkt_budget_high')}</option>
              </select>
            </div>

            <div className="min-w-0 flex items-end">
              <button
                onClick={resetFilters}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-primary/15 text-primary text-sm font-semibold rounded-lg hover:border-accent hover:text-accent transition-colors whitespace-nowrap cursor-pointer"
              >
                <i className="ri-refresh-line" />
                {t('mkt_clear')}
              </button>
            </div>
          </div>
        </div>

        {/* Result count */}
        <div className="max-w-6xl mx-auto mb-5 flex items-center justify-between">
          <p className="text-gray-500 text-sm">
            {t('mkt_results', { count: filtered.length })}
          </p>
          <span className="inline-flex items-center gap-1.5 text-xs text-warm font-medium">
            <i className="ri-information-line" />
            {t('mkt_prototype_note')}
          </span>
        </div>

        {/* Cards */}
        {filtered.length === 0 ? (
          <div className="max-w-6xl mx-auto text-center py-16 bg-surface rounded-2xl">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-white">
              <i className="ri-search-line text-2xl text-accent" />
            </div>
            <p className="text-primary font-medium mb-4">{t('mkt_no_results')}</p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent text-white text-sm font-semibold rounded-full hover:bg-accent-dark transition-colors cursor-pointer whitespace-nowrap"
            >
              {t('mkt_clear')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 max-w-6xl mx-auto">
            {filtered.map((exp, index) => {
              const categoryLabel = t(
                marketCategories.find((c) => c.id === exp.category)?.labelKey ?? 'mkt_category_all'
              );
              const expName = experienceName(exp, t);
              const expLocation = experienceLocation(exp, t);
              return (
                <article
                  key={exp.id}
                  className={`group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-accent/30 transition-all duration-500 hover:-translate-y-1 ${
                    visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${(index % 6) * 70}ms` }}
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={exp.img}
                      alt={expName}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                    <span className="absolute top-3 left-3 bg-white/90 text-primary text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
                      {categoryLabel}
                    </span>
                    {!exp.experienceId && (
                      <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-warm text-white text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
                        <i className="ri-flask-line text-xs" />
                        {t('mkt_prototype')}
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="font-display text-lg text-primary font-bold mb-2 leading-tight">
                      {expName}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-gray-500 text-xs mb-3">
                      <span className="inline-flex items-center gap-1.5">
                        <i className="ri-map-pin-line text-accent" />
                        {expLocation}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <i className="ri-time-line text-accent" />
                        {exp.durationHours ? `${exp.durationHours}h` : t('mkt_nights', { count: exp.nights })}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <i className="ri-translate-2 text-accent" />
                        {exp.languages}
                      </span>
                    </div>

                    <p className="text-gray-400 text-xs mb-4 truncate">
                      {t('mkt_provider')}: <span className="text-gray-600 font-medium">{exp.provider}</span>
                    </p>

                    <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100">
                      <div className="min-w-0">
                        <p className="text-gray-400 text-[11px] uppercase tracking-wider">{t('mkt_from')}</p>
                        <p className="text-accent text-lg font-bold leading-tight">US${exp.price}</p>
                      </div>
                      <button
                        onClick={() => openExperience(exp)}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-primary text-white text-xs font-semibold rounded-full hover:bg-accent transition-colors whitespace-nowrap cursor-pointer"
                      >
                        {exp.experienceId ? t('mkt_view') : t('mkt_interest')}
                        <i className="ri-arrow-right-line" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}