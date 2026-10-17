import type { ExperienceSchedule } from "@/types/experience.interface";

const LOCALES: Record<string, string> = {
  es: "es-CL",
  en: "en-US",
  zh: "zh-CN",
};

export function resolveLocale(lang?: string): string {
  const key = (lang || "en").slice(0, 2).toLowerCase();

  return LOCALES[key] ?? "en-US";
}

function dateFormatter(locale: string): Intl.DateTimeFormat {
  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "America/Santiago",
  });
}

function timeFormatter(locale: string): Intl.DateTimeFormat {
  return new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit",
    hour12: locale.startsWith("en"),
    timeZone: "America/Santiago",
  });
}

function capitalizeFirst(text: string): string {
  if (!text) {
    return text;
  }

  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function formatScheduleDate(
  schedule: ExperienceSchedule,
  lang?: string,
): string {
  const locale = resolveLocale(lang);

  const formatted = dateFormatter(locale).format(
    new Date(schedule.startDateTime),
  );

  return locale.startsWith("es") ? capitalizeFirst(formatted) : formatted;
}

export function formatScheduleTime(
  schedule: ExperienceSchedule,
  lang?: string,
): string {
  const locale = resolveLocale(lang);

  const fmt = timeFormatter(locale);

  return `${fmt.format(new Date(schedule.startDateTime))} – ${fmt.format(
    new Date(schedule.endDateTime),
  )}`;
}
