import type { Experience } from "@/types/experience.interface";
import type { ExperienceSchedule } from "@/types/experience.interface";

import { toGcalDate } from "@/utils/toGcalDate";

export function formatCheckoutMoney(
  amount: number,
  currency: string,
  lang: string,
) {
  const locale = lang.startsWith("es")
    ? "es-CL"
    : lang.startsWith("zh")
      ? "zh-CN"
      : "en-US";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "CLP" ? 0 : 2,
  }).format(amount);
}

export function buildGoogleCalendarUrl(
  exp: Experience,
  schedule: ExperienceSchedule,
) {
  return (
    `https://calendar.google.com/calendar/render` +
    `?action=TEMPLATE` +
    `&text=${encodeURIComponent(exp.name)}` +
    `&dates=${toGcalDate(schedule.startDateTime)}/${toGcalDate(
      schedule.endDateTime,
    )}` +
    `&details=${encodeURIComponent(exp.description)}` +
    `&location=${encodeURIComponent(exp.meetingPoint)}`
  );
}
