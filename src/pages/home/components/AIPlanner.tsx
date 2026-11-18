import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useInView from '@/hooks/useInView';
import {
  marketCategories,
  marketExperiences,
  type MarketCategoryId,
  type MarketExperience,
} from '@/mocks/marketplace';

type BudgetTier = 'low' | 'mid' | 'high';

interface DayPlan {
  day: number;
  items: MarketExperience[];
}

function tierOf(price: number): BudgetTier {
  if (price < 40) return 'low';
  if (price <= 80) return 'mid';
  return 'high';
}

export default function AIPlanner() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { ref, visible } = useInView(0.06);

  const [destination, setDestination] = useState('Santiago');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState<BudgetTier>('mid');
  const [language, setLanguage] = useState('en');
  const [interests, setInterests] = useState<MarketCategoryId[]>(['dance', 'food']);
  const [plan, setPlan] = useState<DayPlan[] | null>(null);

  const toggleInterest = (id: MarketCategoryId) => {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const generate = () => {
    let pool = marketExperiences.filter(
      (exp) => interests.length === 0 || interests.includes(exp.category)
    );
    const budgetPool = pool.filter((exp) => tierOf(exp.price) === budget);
    if (budgetPool.length > 0) pool = budgetPool;

    let days = 3;
    if (startDate && endDate) {
      const diff = new Date(endDate).getTime() - new Date(startDate).getTime();
      const computed = Math.round(diff / (1000 * 60 * 60 * 24)) + 1;
      if (computed >= 1) days = Math.min(Math.max(computed, 1), 4);
    }
    if (pool.length === 0) {
      setPlan([]);
      return;
    }

    const next: DayPlan[] = [];
    for (let d = 0; d < days; d += 1) {
      const first = pool[(d * 2) % pool.length];
      const second = pool[(d * 2 + 1) % pool.length];
      const items = second && second.id !== first.id ? [first, second] : [first];
      next.push({ day: d + 1, items });
    }
    setPlan(next);
  };

  const reset = () => {
    setPlan(null);
    setStartDate('');
    setEndDate('');
    setTravelers(2);
    setBudget('mid');
    setInterests(['dance', 'food']);
  };

  const totalPerPerson = plan
    ? plan.reduce((sum, day) => sum + day.items.reduce((s, item) => s + item.price, 0), 0)
    : 0;

  const openItem = (item: MarketExperience) => {
    if (item.experienceId) {
      navigate(`/experiencia/${item.experienceId}`);
      return;
    }
    const el = document.querySelector('#reserva');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="ai-planner" ref={ref} className="relative bg-surface-dark py-20 md:py-28 lg:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="section-padding">
        <div className={`text-center max-w-2xl mx-auto mb-12 md:mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-flex items-center gap-2 text-warm font-medium text-xs md:text-sm tracking-[0.25em] uppercase mb-4">
            <i className="ri-sparkling-2-line" />
            {t('ai_label')}
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-4 leading-tight">
            {t('ai_title')}
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            {t('ai_subtitle')}
          </p>
        </div>

        <div className={`max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 transition-all duration-1000 delay-150 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 md:p-7">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-xl text-primary font-bold">{t('ai_form_title')}</h3>
              <span className="inline-flex items-center gap-1 bg-warm/10 text-warm text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
                <i className="ri-flask-line" />
                {t('ai_prototype_badge')}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-primary text-sm font-medium mb-2">
                  {t('ai_destination')}
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-primary text-sm focus:outline-none focus:border-accent transition-colors"
                  placeholder={t('ai_destination_placeholder')}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="min-w-0">
                  <label className="block text-primary text-sm font-medium mb-2">
                    {t('ai_start')}
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-primary text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div className="min-w-0">
                  <label className="block text-primary text-sm font-medium mb-2">
                    {t('ai_end')}
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-primary text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="min-w-0">
                  <label className="block text-primary text-sm font-medium mb-2">
                    {t('ai_travelers')}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={travelers}
                    onChange={(e) => setTravelers(Math.max(1, Math.min(20, Number(e.target.value) || 1)))}
                    className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-primary text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div className="min-w-0">
                  <label className="block text-primary text-sm font-medium mb-2">
                    {t('ai_language')}
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-primary text-sm focus:outline-none focus:border-accent transition-colors cursor-pointer"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="zh">中文</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-primary text-sm font-medium mb-2">
                  {t('ai_budget')}
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value as BudgetTier)}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-primary text-sm focus:outline-none focus:border-accent transition-colors cursor-pointer"
                >
                  <option value="low">{t('ai_budget_low')}</option>
                  <option value="mid">{t('ai_budget_mid')}</option>
                  <option value="high">{t('ai_budget_high')}</option>
                </select>
              </div>

              <div>
                <label className="block text-primary text-sm font-medium mb-2">
                  {t('ai_interests')}
                </label>
                <div className="flex flex-wrap gap-2">
                  {marketCategories.map((cat) => {
                    const active = interests.includes(cat.id);
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => toggleInterest(cat.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                          active
                            ? 'bg-accent text-white border-accent'
                            : 'bg-white text-primary border-gray-200 hover:border-accent'
                        }`}
                      >
                        <i className={`${cat.icon} text-sm`} />
                        {t(cat.labelKey)}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={generate}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-accent text-white text-sm font-semibold rounded-full hover:bg-accent-dark transition-colors whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-sparkling-2-line" />
                  {plan ? t('ai_regenerate') : t('ai_generate')}
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-primary/15 text-primary text-sm font-semibold rounded-full hover:border-accent hover:text-accent transition-colors whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-refresh-line" />
                  {t('ai_reset')}
                </button>
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="lg:col-span-3">
            <div className="h-full bg-white rounded-2xl border border-gray-100 p-6 md:p-7">
              {!plan ? (
                <div className="h-full min-h-[420px] flex flex-col items-center justify-center text-center px-4">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-accent/10 mb-5">
                    <i className="ri-route-line text-3xl text-accent" />
                  </div>
                  <h3 className="font-display text-xl md:text-2xl text-primary font-bold mb-2">
                    {t('ai_empty_title')}
                  </h3>
                  <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-sm">
                    {t('ai_empty_text')}
                  </p>
                  <p className="mt-6 flex items-start gap-2 text-gray-400 text-xs leading-relaxed max-w-sm text-left bg-surface rounded-lg p-3">
                    <i className="ri-information-line mt-0.5 text-warm" />
                    {t('ai_prototype_note')}
                  </p>
                </div>
              ) : plan.length === 0 ? (
                <div className="h-full min-h-[420px] flex flex-col items-center justify-center text-center px-4">
                  <i className="ri-emotion-sad-line text-3xl text-accent" />
                  <p className="text-gray-500 text-sm mt-3">{t('ai_no_match')}</p>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                    <div>
                      <p className="text-warm text-xs font-semibold uppercase tracking-wider mb-1">
                        {t('ai_plan_label')}
                      </p>
                      <h3 className="font-display text-xl md:text-2xl text-primary font-bold">
                        {destination || t('ai_destination')}
                      </h3>
                    </div>
                    <span className="inline-flex items-center gap-1.5 bg-surface text-primary text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap">
                      <i className="ri-group-line text-accent" />
                      {travelers}
                    </span>
                  </div>

                  <div className="space-y-4 max-h-[430px] overflow-y-auto pr-1">
                    {plan.map((day) => (
                      <div key={day.day} className="rounded-xl border border-gray-100 overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-2.5 bg-surface">
                          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-accent text-white text-xs font-bold">
                            {day.day}
                          </span>
                          <span className="text-primary text-sm font-semibold">
                            {t('ai_day', { count: day.day })}
                          </span>
                        </div>
                        <ul className="divide-y divide-gray-100">
                          {day.items.map((item) => (
                            <li key={`${day.day}-${item.id}`} className="flex items-center gap-3 px-4 py-3">
                              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                <img
                                  src={item.img}
                                  alt={item.name}
                                  className="w-full h-full object-cover object-top"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-primary text-sm font-semibold truncate">{item.name}</p>
                                <p className="text-gray-400 text-xs truncate">
                                  {item.location} · {item.durationHours ? `${item.durationHours}h` : t('mkt_nights', { count: item.nights })}
                                </p>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <span className="text-accent text-sm font-bold">US${item.price}</span>
                                <button
                                  onClick={() => openItem(item)}
                                  className="w-8 h-8 flex items-center justify-center rounded-full bg-surface hover:bg-accent hover:text-white text-primary transition-colors cursor-pointer"
                                  aria-label={item.experienceId ? t('mkt_view') : t('mkt_interest')}
                                >
                                  <i className="ri-arrow-right-line text-sm" />
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wider">{t('ai_estimate')}</p>
                      <p className="text-primary text-lg font-bold">
                        US${totalPerPerson * travelers}
                        <span className="text-gray-400 text-xs font-normal ml-1">
                          ({t('ai_for_people', { count: travelers })})
                        </span>
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 bg-warm/10 text-warm text-[11px] font-semibold px-3 py-1.5 rounded-full whitespace-nowrap">
                      <i className="ri-flask-line" />
                      {t('ai_prototype_badge')}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}