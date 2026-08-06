import { ClaimResponse, ClaimState } from "features/claims/types/claim";
import { CLAIM_STATUS_COLUMNS } from "features/claims/dashboard/claimStatusColumns";
import {
  CategoryBreakdown,
  RefundBreakdown,
  SeasonStatistics,
  WeeklyLanguageCount,
} from "features/statistics/types/statistics";
import { getIsoWeekFromDateOnly } from "features/statistics/utils/isoWeek";
import { STATUS_COLORS, REFUND_COLORS, getCategoryColor } from "features/statistics/utils/statisticsColors";

// booking.salesChannel.language is a free-form DB-backed string (see
// SalesChannelResponseSchema), not a strict enum — only these 3 known values
// feed the line chart's fixed FR/NL/UK legend; anything else is ignored.
const KNOWN_LANGUAGES = ["Fr", "Nl", "En"] as const;
type KnownLanguage = (typeof KNOWN_LANGUAGES)[number];

const isKnownLanguage = (language: string): language is KnownLanguage =>
  (KNOWN_LANGUAGES as readonly string[]).includes(language);

interface WeekEntry {
  label: string;
  Fr: number;
  Nl: number;
  En: number;
}

const buildWeeklyLanguageCounts = (claims: ClaimResponse[]): WeeklyLanguageCount[] => {
  const countsByWeek = new Map<string, WeekEntry>();

  claims.forEach((claim) => {
    const week = getIsoWeekFromDateOnly(claim.claimDate.dateOfReceivedClaim);
    const language = claim.booking.salesChannel.language;
    if (!week || !isKnownLanguage(language)) {
      return;
    }

    const entry = countsByWeek.get(week.sortKey) ?? { label: week.label, Fr: 0, Nl: 0, En: 0 };
    entry[language] += 1;
    countsByWeek.set(week.sortKey, entry);
  });

  return Array.from(countsByWeek.entries())
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([, entry]) => ({
      week: entry.label,
      Fr: entry.Fr,
      Nl: entry.Nl,
      En: entry.En,
      total: entry.Fr + entry.Nl + entry.En,
    }));
};

const buildStatusBreakdown = (claims: ClaimResponse[]): CategoryBreakdown[] => {
  const counts = new Map<ClaimState, number>();
  claims.forEach((claim) => counts.set(claim.state, (counts.get(claim.state) ?? 0) + 1));

  return CLAIM_STATUS_COLUMNS.map(({ state, label }) => ({
    label,
    value: counts.get(state) ?? 0,
    color: STATUS_COLORS[state],
  }));
};

const buildLookupBreakdown = (
  claims: ClaimResponse[],
  getLabel: (claim: ClaimResponse) => string
): CategoryBreakdown[] => {
  const counts = new Map<string, number>();
  claims.forEach((claim) => {
    const label = getLabel(claim);
    counts.set(label, (counts.get(label) ?? 0) + 1);
  });

  return Array.from(counts.entries()).map(([label, value], index) => ({
    label,
    value,
    color: getCategoryColor(index),
  }));
};

const buildRefundBreakdown = (claims: ClaimResponse[]): RefundBreakdown => {
  const sums = claims.reduce(
    (acc, claim) => ({
      customerVoucher: acc.customerVoucher + (claim.compensation.customerVoucher ?? 0),
      customerUsedVoucher: acc.customerUsedVoucher + (claim.compensation.customerUsedVoucher ?? 0),
      supplierRefund: acc.supplierRefund + (claim.compensation.supplierRefund ?? 0),
      claimRefund: acc.claimRefund + (claim.compensation.claimRefund ?? 0),
    }),
    { customerVoucher: 0, customerUsedVoucher: 0, supplierRefund: 0, claimRefund: 0 }
  );

  return {
    customerVoucher: { label: "Avoir client", value: sums.customerVoucher, color: REFUND_COLORS.customerVoucher },
    customerUsedVoucher: {
      label: "Avoir client utilisé",
      value: sums.customerUsedVoucher,
      color: REFUND_COLORS.customerUsedVoucher,
    },
    supplierRefund: {
      label: "Remboursement fournisseur",
      value: sums.supplierRefund,
      color: REFUND_COLORS.supplierRefund,
    },
    claimRefund: { label: "Remboursement réclamation", value: sums.claimRefund, color: REFUND_COLORS.claimRefund },
  };
};

export const aggregateStatistics = (claims: ClaimResponse[]): SeasonStatistics => ({
  weeklyLanguageCounts: buildWeeklyLanguageCounts(claims),
  statusBreakdown: buildStatusBreakdown(claims),
  skissimBreakdown: buildLookupBreakdown(claims, (claim) => claim.booking.skissimType.label),
  solutionBreakdown: buildLookupBreakdown(claims, (claim) => claim.solution.label),
  refundBreakdown: buildRefundBreakdown(claims),
});
