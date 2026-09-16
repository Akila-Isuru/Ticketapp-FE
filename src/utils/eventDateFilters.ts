import type { Event } from "../types";

export const TIME_FILTERS = [
  "Top events",
  "This Weekend",
  "This Month",
  "Next Month",
];

const isThisWeekend = (date: Date, now: Date): boolean => {
  const day = date.getDay(); // 0 = Sunday, 6 = Saturday
  const isWeekendDay = day === 0 || day === 6;

  const msInDay = 1000 * 60 * 60 * 24;
  const daysAhead = (date.getTime() - now.getTime()) / msInDay;

  return isWeekendDay && daysAhead >= 0 && daysAhead <= 7;
};

const isThisMonth = (date: Date, now: Date): boolean => {
  return (
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear() &&
    date.getTime() >= now.getTime()
  );
};

const isNextMonth = (date: Date, now: Date): boolean => {
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return (
    date.getMonth() === nextMonth.getMonth() &&
    date.getFullYear() === nextMonth.getFullYear()
  );
};

export const filterEventsByTime = (
  events: Event[],
  filter: string,
): Event[] => {
  const now = new Date();

  if (filter === "This Weekend") {
    return events.filter((evt) => isThisWeekend(new Date(evt.eventDate), now));
  }

  if (filter === "This Month") {
    return events.filter((evt) => isThisMonth(new Date(evt.eventDate), now));
  }

  if (filter === "Next Month") {
    return events.filter((evt) => isNextMonth(new Date(evt.eventDate), now));
  }

  return events;
};
