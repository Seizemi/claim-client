export interface IsoWeek {
  label: string;
  sortKey: string;
}

// Standard ISO-8601 week calculation: the week containing the year's first
// Thursday is week 1. The adjusted date's UTC year is the ISO week-year,
// which can differ from the calendar year at year boundaries.
const getIsoWeek = (date: Date): { week: number; year: number } => {
  const adjusted = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const dayNum = adjusted.getUTCDay() || 7;
  adjusted.setUTCDate(adjusted.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(adjusted.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((adjusted.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return { week, year: adjusted.getUTCFullYear() };
};

// dateOnly is a DateOnly string (yyyy-MM-dd), mirroring claim.ts's DateOnlySchema.
export const getIsoWeekFromDateOnly = (dateOnly: string | null): IsoWeek | null => {
  if (!dateOnly) {
    return null;
  }

  const [year, month, day] = dateOnly.split("-").map(Number);
  const { week, year: isoYear } = getIsoWeek(new Date(Date.UTC(year, month - 1, day)));

  return { label: `S${week}`, sortKey: `${isoYear}-${String(week).padStart(2, "0")}` };
};
