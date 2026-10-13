import type { ExperienceSchedule } from "@/mocks/experiences";

const DATE_FMT = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  timeZone: "America/Santiago",
});

const TIME_FMT = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "America/Santiago",
});

export function formatScheduleDate(schedule: ExperienceSchedule): string {
  return DATE_FMT.format(new Date(schedule.startDateTime));
}

export function formatScheduleTime(schedule: ExperienceSchedule): string {
  return `${TIME_FMT.format(new Date(schedule.startDateTime))} – ${TIME_FMT.format(new Date(schedule.endDateTime))}`;
}

export function formatSpots(count: number): string {
  return count === 1 ? "1 spot available" : `${count} spots available`;
}
