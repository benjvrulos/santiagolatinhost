import type { TFunction } from 'i18next';
import { experiencesData, experiencePricing, experienceSchedules } from '@/mocks/experiences';
import { marketExperiences, type MarketExperience } from '@/mocks/marketplace';
import { experienceLocation, experienceName } from '@/i18n/experienceText';

export interface ResolvedExperience {
  id: string;
  img: string;
  gallery: string[];
  title: string;
  subtitle: string;
  description: string[];
  purpose: string;
  duration: string;
  groupSize: string;
  language: string;
  includes: string;
  notIncludes: string;
  meetingPoint: string;
  priceNote: string;
  priceAmount?: string;
  priceUnit?: string;
  date?: string;
  schedule?: string;
  requirements?: string;
  recommendations?: string;
  itinerary: { time: string; activity: string }[];
}

export interface RelatedExperience {
  id: string;
  img: string;
  title: string;
  summary: string;
}

const splitParagraphs = (text: string): string[] =>
  text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

const marketDuration = (market: MarketExperience, t: TFunction): string => {
  if (market.durationHours) return t('exp_fallback_duration_hours', { count: market.durationHours });
  return t('mkt_nights', { count: market.nights ?? 1 });
};

const marketPrice = (market: MarketExperience): string => `US$${market.price}`;

const buildFallback = (market: MarketExperience, t: TFunction): ResolvedExperience => {
  const location = experienceLocation(market, t);
  const duration = marketDuration(market, t);

  return {
    id: market.id,
    img: market.img,
    gallery: [],
    title: experienceName(market, t),
    subtitle: `${location} · ${duration} · ${market.provider}`,
    description: splitParagraphs(
      t('exp_fallback_desc', { location, provider: market.provider })
    ),
    purpose: t('exp_fallback_purpose', { location }),
    duration,
    groupSize: t('exp_fallback_group'),
    language: market.languages,
    includes: t('exp_fallback_includes'),
    notIncludes: t('exp_fallback_not_includes'),
    meetingPoint: t('exp_fallback_meeting'),
    priceNote: t('exp_fallback_price_note'),
    priceAmount: marketPrice(market),
    priceUnit: t('exp_label_price_unit'),
    itinerary: [
      { time: t('exp_fallback_time1'), activity: t('exp_fallback_act1') },
      { time: t('exp_fallback_time2'), activity: t('exp_fallback_act2') },
      { time: t('exp_fallback_time3'), activity: t('exp_fallback_act3') },
      { time: t('exp_fallback_time4'), activity: t('exp_fallback_act4') },
    ],
  };
};

export function resolveExperience(id: string | undefined, t: TFunction): ResolvedExperience | null {
  if (!id) return null;

  const detail = experiencesData[id];
  if (detail) {
    return {
      id,
      img: detail.img,
      gallery: detail.gallery,
      title: t(detail.titleKey),
      subtitle: t(detail.subtitleKey),
      description: splitParagraphs(t(detail.fullDescKey)),
      purpose: t(detail.purposeKey),
      duration: t(detail.durationKey),
      groupSize: t(detail.groupSizeKey),
      language: t(detail.languageKey),
      includes: t(detail.includesKey),
      notIncludes: t(detail.notIncludesKey),
      meetingPoint: t(detail.meetingPointKey),
      priceNote: t(detail.priceNoteKey),
      priceAmount: detail.priceAmountKey ? t(detail.priceAmountKey) : undefined,
      priceUnit: detail.priceUnitKey ? t(detail.priceUnitKey) : undefined,
      date: detail.dateKey ? t(detail.dateKey) : undefined,
      schedule: detail.scheduleKey ? t(detail.scheduleKey) : undefined,
      requirements: detail.requirementsKey ? t(detail.requirementsKey) : undefined,
      recommendations: detail.recommendationsKey ? t(detail.recommendationsKey) : undefined,
      itinerary: detail.itinerary.map((item) => ({
        time: t(item.timeKey),
        activity: t(item.activityKey),
      })),
    };
  }

  const market = marketExperiences.find((item) => item.id === id);
  if (!market) return null;

  return buildFallback(market, t);
}

export function resolveRelated(id: string | undefined, t: TFunction): RelatedExperience[] {
  return marketExperiences
    .filter((item) => item.id !== id)
    .slice(0, 2)
    .map((item) => ({
      id: item.id,
      img: item.img,
      title: experienceName(item, t),
      summary: experienceLocation(item, t),
    }));
}

export function resolveExperienceSchedule(id: string | undefined) {
  if (!id) return null;

  const list = experienceSchedules[id];
  if (list && list.length > 0) {
    return list.find((item) => item.status === 'available') ?? list[0];
  }

  const market = marketExperiences.find((item) => item.id === id);
  if (!market) return null;

  const start = new Date();
  start.setDate(start.getDate() + 7);
  start.setHours(10, 0, 0, 0);
  const end = new Date(start.getTime() + (market.durationHours ?? 8) * 60 * 60 * 1000);

  const toISO = (date: Date) => {
    const pad = (value: number) => String(value).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
      date.getHours()
    )}:${pad(date.getMinutes())}:00-03:00`;
  };

  return {
    id: `sched-${market.id}-default`,
    experienceId: market.id,
    startDateTime: toISO(start),
    endDateTime: toISO(end),
    capacity: 8,
    status: 'available' as const,
  };
}

export function resolveExperiencePricing(id: string | undefined) {
  if (!id) return undefined;

  const pricing = experiencePricing[id];
  if (pricing) return pricing;

  const market = marketExperiences.find((item) => item.id === id);
  if (!market) return undefined;

  return { pricePerPerson: market.price, currency: 'USD' };
}