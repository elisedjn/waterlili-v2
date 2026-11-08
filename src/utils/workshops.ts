import type { CollectionEntry } from 'astro:content';

type WorkshopData = CollectionEntry<'workshops'>['data'];

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Last moment the workshop is still on offer.
 * - `endDate` (recurring workshops, e.g. "every Sunday until …") when set, otherwise `startDate`.
 * - A date-only `endDate` (midnight UTC) is inclusive: the workshop stays visible that whole day.
 * - Returns undefined for workshops without any date (they are always shown).
 */
export function getWorkshopEnd(data: WorkshopData): Date | undefined {
  const { endDate, startDate } = data;

  if (endDate) {
    const isDateOnly = endDate.getTime() % DAY_MS === 0;

    return isDateOnly ? new Date(endDate.getTime() + DAY_MS - 1) : endDate;
  }

  return startDate;
}

export function isWorkshopActive(data: WorkshopData, now = new Date()): boolean {
  const end = getWorkshopEnd(data);

  return !end || end >= now;
}
