import { marketExperiences, type MarketExperience } from '@/mocks/marketplace';

export interface ItineraryOrderDay {
  day: number;
  itemIds: string[];
}

export interface ItineraryOrder {
  days: ItineraryOrderDay[];
  travelers: number;
  startDate: string;
  endDate: string;
  language: string;
}

const STORAGE_KEY = 'clh_itinerary_order';

export function saveItineraryOrder(order: ItineraryOrder): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));
  } catch {
    // Storage can be unavailable in private mode; the order is still passed by route.
  }
}

export function loadItineraryOrder(): ItineraryOrder | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ItineraryOrder;
    if (!parsed || !Array.isArray(parsed.days) || parsed.days.length === 0) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function findExperience(id: string): MarketExperience | undefined {
  return marketExperiences.find((item) => item.id === id);
}

export function resolveDayItems(day: ItineraryOrderDay): MarketExperience[] {
  return day.itemIds
    .map((itemId) => findExperience(itemId))
    .filter((item): item is MarketExperience => Boolean(item));
}

export interface ItineraryTotals {
  perPerson: number;
  total: number;
  itemCount: number;
  dayCount: number;
}

export function getItineraryTotals(order: ItineraryOrder): ItineraryTotals {
  const perPerson = order.days.reduce(
    (sum, day) => sum + resolveDayItems(day).reduce((daySum, item) => daySum + item.price, 0),
    0
  );
  const itemCount = order.days.reduce((sum, day) => sum + day.itemIds.length, 0);
  const travelers = Math.max(1, order.travelers || 1);

  return {
    perPerson,
    total: perPerson * travelers,
    itemCount,
    dayCount: order.days.length,
  };
}

export function formatOrderRange(order: ItineraryOrder, language: string): string {
  if (!order.startDate && !order.endDate) return '—';

  const formatter = new Intl.DateTimeFormat(language || 'es', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const start = order.startDate ? formatter.format(new Date(`${order.startDate}T12:00:00`)) : '';
  const end = order.endDate ? formatter.format(new Date(`${order.endDate}T12:00:00`)) : '';

  if (start && end) return `${start} → ${end}`;
  return start || end;
}

export function buildItineraryOrder(
  days: { day: number; itemIds: string[] }[],
  travelers: number,
  startDate: string,
  endDate: string,
  language: string
): ItineraryOrder {
  return {
    days,
    travelers: Math.max(1, travelers || 1),
    startDate,
    endDate,
    language,
  };
}