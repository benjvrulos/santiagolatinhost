import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useInView from '@/hooks/useInView';
import { experienceLocation, experienceName } from '@/i18n/experienceText';
import {
  marketCategories,
  marketExperiences,
  type MarketCategoryId,
  type MarketExperience,
} from '@/mocks/marketplace';

type BudgetTier = 'low' | 'mid' | 'high';

const plannerLanguages = ['en', 'es', 'zh', 'pt'] as const;
type PlannerLanguage = (typeof plannerLanguages)[number];

const popularDestinations = [
  'loc_santiago',
  'loc_patagonia',
  'loc_atacama',
  'loc_valparaiso',
  'loc_colchagua',
  'loc_chiloe',
];

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

function resolvePlannerLanguage(lng?: string): PlannerLanguage {
  const base = (lng || 'en').toLowerCase().split('-')[0];
  return (plannerLanguages as readonly string[]).includes(base)
    ? (base as PlannerLanguage)
    : 'en';
}

interface DayPlan {
  day: number;
  items: MarketExperience[];
}

interface ChatMessage {
  id: number;
  role: 'ai' | 'user';
  text: string;
}

function tierOf(price: number): BudgetTier {
  if (price < 40) return 'low';
  if (price <= 80) return 'mid';
  return 'high';
}

export default function AIPlanner() {
  const { t, i18n } = useTranslation();
  const { ref, visible } = useInView(0.06);

  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState<BudgetTier>('mid');
  const [language, setLanguage] = useState<PlannerLanguage>(() =>
    resolvePlannerLanguage(i18n.resolvedLanguage || i18n.language)
  );
  const [interests, setInterests] = useState<MarketCategoryId[]>(['dance', 'food']);
  const [plan, setPlan] = useState<DayPlan[] | null>(null);
  const [planLang, setPlanLang] = useState<PlannerLanguage>(() =>
    resolvePlannerLanguage(i18n.resolvedLanguage || i18n.language)
  );
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const timers = useRef<number[]>([]);
  const usedIds = useRef<Set<string>>(new Set());
  const chatRef = useRef<HTMLDivElement>(null);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  useEffect(() => () => {
    timers.current.forEach((id) => window.clearTimeout(id));
  }, []);

  useEffect(() => {
    const el = chatRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [chat, typing]);

  useEffect(() => {
    setLanguage(resolvePlannerLanguage(i18n.resolvedLanguage || i18n.language));
  }, [i18n.resolvedLanguage, i18n.language]);

  const toggleInterest = (id: MarketCategoryId) => {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const pushTimer = (fn: () => void, delay: number) => {
    const id = window.setTimeout(fn, delay);
    timers.current.push(id);
  };

  const generate = () => {
    clearTimers();
    const tt = i18n.getFixedT(language);
    setPlanLang(language);

    let pool = marketExperiences.filter(
      (exp) => interests.length === 0 || interests.includes(exp.category)
    );

    const needle = normalizeText(destination);
    if (needle) {
      const destinationPool = pool.filter((exp) => {
        if (!exp.locationKey) return normalizeText(exp.location).includes(needle);
        const labels = [
          exp.location,
          ...plannerLanguages.map((lng) =>
            String(i18n.getFixedT(lng)(exp.locationKey as string))
          ),
        ];
        return labels.some((label) => normalizeText(label).includes(needle));
      });
      if (destinationPool.length > 0) pool = destinationPool;
    }

    const budgetPool = pool.filter((exp) => tierOf(exp.price) === budget);
    if (budgetPool.length > 0) pool = budgetPool;

    let days = 3;
    if (startDate && endDate) {
      const diff = new Date(endDate).getTime() - new Date(startDate).getTime();
      const computed = Math.round(diff / (1000 * 60 * 60 * 24)) + 1;
      if (computed >= 1) days = Math.min(Math.max(computed, 1), 4);
    }

    const interestLabels = marketCategories
      .filter((cat) => interests.includes(cat.id))
      .map((cat) => tt(cat.labelKey))
      .join(' · ');

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: 'user',
      text: tt('ai_chat_user', {
        days,
        destination: destination || tt('ai_anywhere'),
        people: travelers,
        budget: tt(`ai_budget_${budget}`),
      }),
    };

    setPlan(null);
    setChat([userMessage]);
    setTyping(true);

    pushTimer(() => {
      setChat((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'ai', text: tt('ai_chat_1') },
      ]);
    }, 700);

    if (pool.length === 0) {
      pushTimer(() => {
        setChat((prev) => [
          ...prev,
          { id: Date.now() + 2, role: 'ai', text: tt('ai_chat_nomatch') },
        ]);
        setTyping(false);
        setPlan([]);
      }, 1900);
      return;
    }

    const shuffle = <T,>(list: T[]) => {
      const arr = [...list];
      for (let i = arr.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };
    const unseen = shuffle(pool.filter((exp) => !usedIds.current.has(String(exp.id))));
    const seen = shuffle(pool.filter((exp) => usedIds.current.has(String(exp.id))));
    const ordered = [...unseen, ...seen];
    const needed = days * 2;
    const picked = ordered.slice(0, Math.min(needed, ordered.length));
    if (unseen.length < Math.min(needed, ordered.length)) {
      usedIds.current = new Set();
    }
    picked.forEach((exp) => usedIds.current.add(String(exp.id)));

    const next: DayPlan[] = [];
    const perDay = Math.max(1, Math.min(2, Math.floor(picked.length / days) || 1));
    for (let d = 0; d < days; d += 1) {
      const items = picked.slice(d * perDay, d * perDay + perDay);
      const fallback = items.length > 0 ? items : [picked[d % picked.length]];
      next.push({ day: d + 1, items: fallback });
    }
    const totalUnique = new Set(
      next.flatMap((day) => day.items.map((item) => item.id))
    ).size;

    pushTimer(() => {
      setChat((prev) => [
        ...prev,
        {
          id: Date.now() + 3,
          role: 'ai',
          text: tt('ai_chat_2', {
            total: totalUnique,
            interests: interestLabels || tt('ai_chat_any_interest'),
          }),
        },
      ]);
    }, 1700);

    pushTimer(() => {
      setChat((prev) => [
        ...prev,
        { id: Date.now() + 4, role: 'ai', text: tt('ai_chat_3', { days }) },
      ]);
    }, 2700);

    pushTimer(() => {
      setTyping(false);
      setPlan(next);
    }, 3500);
  };

  const reset = () => {
    clearTimers();
    usedIds.current = new Set();
    setPlan(null);
    setChat([]);
    setTyping(false);
    setDestination('');
    setStartDate('');
    setEndDate('');
    setTravelers(2);
    setBudget('mid');
    setInterests(['dance', 'food']);
  };

  const planT = i18n.getFixedT(planLang);

  const totalPerPerson = plan
    ? plan.reduce((sum, day) => sum + day.items.reduce((s, item) => s + item.price, 0), 0)
    : 0;

  const handleBook = () => {
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
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {popularDestinations.map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setDestination(t(key))}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors whitespace-nowrap cursor-pointer ${
                        destination === t(key)
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-gray-500 border-gray-200 hover:border-accent hover:text-accent'
                      }`}
                    >
                      {t(key)}
                    </button>
                  ))}
                </div>
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
                    onChange={(e) => setLanguage(resolvePlannerLanguage(e.target.value))}
                    className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-primary text-sm focus:outline-none focus:border-accent transition-colors cursor-pointer"
                  >
                    <option value="en">{t('ai_lang_en')}</option>
                    <option value="es">{t('ai_lang_es')}</option>
                    <option value="zh">{t('ai_lang_zh')}</option>
                    <option value="pt">{t('ai_lang_pt')}</option>
                  </select>
                </div>
              </div>

              <p className="flex items-start gap-1.5 text-gray-400 text-[11px] leading-relaxed -mt-1">
                <i className="ri-translate-2 mt-0.5 text-accent" />
                {t('ai_language_note')}
              </p>

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

          {/* Chat + itinerary */}
          <div className="lg:col-span-3">
            <div className="h-full bg-white rounded-2xl border border-gray-100 p-5 md:p-6 flex flex-col">
              <div className="flex items-center justify-between gap-3 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-accent/10 flex-shrink-0">
                    <i className="ri-sparkling-2-line text-lg text-accent" />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-primary text-sm font-semibold leading-tight truncate">{t('ai_chat_name')}</p>
                    <p className="text-gray-400 text-xs">{t('ai_chat_status')}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 bg-warm/10 text-warm text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
                  <i className="ri-flask-line" />
                  {t('ai_prototype_badge')}
                </span>
              </div>

              {chat.length > 0 && (
                <div ref={chatRef} className="mt-4 space-y-3 max-h-[380px] overflow-y-auto pr-1">
                  {chat.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`max-w-[88%] px-3.5 py-2.5 text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-primary text-white rounded-2xl rounded-br-md'
                            : 'bg-surface text-primary rounded-2xl rounded-bl-md'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {typing && (
                    <div className="flex justify-start">
                      <div className="bg-surface rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" style={{ animationDelay: '200ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" style={{ animationDelay: '400ms' }} />
                      </div>
                    </div>
                  )}

                  {plan && plan.length > 0 && !typing && (
                    <div className="flex justify-start">
                      <div className="max-w-[92%] bg-surface rounded-2xl rounded-bl-md px-4 py-3 text-sm leading-relaxed text-primary">
                        {plan.map((day) => (
                          <p key={day.day} className="mb-2.5 last:mb-0">
                            <span className="font-semibold text-accent">
                              {planT('ai_day', { count: day.day })}:
                            </span>{' '}
                            {day.items.map((item, index) => (
                              <span key={`${day.day}-${item.id}`}>
                                {index > 0 ? ' · ' : ''}
                                <span className="font-medium">{experienceName(item, planT)}</span>
                                <span className="text-gray-500">
                                  {' '}
                                  ({experienceLocation(item, planT)}) US${item.price}
                                </span>
                              </span>
                            ))}
                          </p>
                        ))}
                        <p className="mt-2.5 pt-2.5 border-t border-primary/10 font-semibold">
                          {planT('ai_estimate')}: US${totalPerPerson * travelers}
                          <span className="text-gray-500 font-normal ml-1">
                            ({planT('ai_for_people', { count: travelers })})
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {plan && plan.length > 0 && !typing && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={handleBook}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-accent text-white text-sm font-semibold rounded-full hover:bg-accent-dark transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-calendar-check-line" />
                    {t('ai_reserve')}
                  </button>
                  <p className="mt-3 text-gray-400 text-[11px] leading-relaxed">
                    {t('ai_prototype_note')}
                  </p>
                </div>
              )}

              {!plan && chat.length === 0 ? (
                <div className="flex-1 min-h-[340px] flex flex-col items-center justify-center text-center px-4">
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
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}