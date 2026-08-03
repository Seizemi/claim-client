export interface SeasonOption {
  value: string;
  label: string;
}

const SEASONS_AHEAD = 1;
const SEASONS_BEHIND = 4;

// Mirrors ClaimApi's Modules.Claims.Domain.SeasonCalculator value/label format
// (été runs May-Oct of a year, hiver runs Nov of a year through Apr of the next).
export const buildSeasonOptions = (referenceDate: Date = new Date()): SeasonOption[] => {
  const currentYear = referenceDate.getFullYear();
  const options: SeasonOption[] = [];

  for (let year = currentYear + SEASONS_AHEAD; year >= currentYear - SEASONS_BEHIND; year--) {
    options.push({ value: `hiver${year}-${year + 1}`, label: `Hiver ${year}-${year + 1}` });
    options.push({ value: `ete${year}`, label: `Été ${year}` });
  }

  return options;
};

export const SEASON_OPTIONS = buildSeasonOptions();

export type SeasonKind = "summer" | "winter";

export const getSeasonKind = (seasonValue: string): SeasonKind | null => {
  if (seasonValue.startsWith("ete")) {
    return "summer";
  }
  if (seasonValue.startsWith("hiver")) {
    return "winter";
  }
  return null;
};

export const getSeasonLabel = (seasonValue: string): string | null =>
  SEASON_OPTIONS.find((option) => option.value === seasonValue)?.label ?? null;
