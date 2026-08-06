export interface WeeklyLanguageCount {
  week: string;
  Fr: number;
  Nl: number;
  En: number;
  total: number;
}

export interface CategoryBreakdown {
  label: string;
  value: number;
  color: string;
}

export interface RefundBreakdown {
  customerVoucher: CategoryBreakdown;
  customerUsedVoucher: CategoryBreakdown;
  supplierRefund: CategoryBreakdown;
  claimRefund: CategoryBreakdown;
}

export interface SeasonStatistics {
  weeklyLanguageCounts: WeeklyLanguageCount[];
  statusBreakdown: CategoryBreakdown[];
  skissimBreakdown: CategoryBreakdown[];
  solutionBreakdown: CategoryBreakdown[];
  refundBreakdown: RefundBreakdown;
}

export type StatisticsTab = "reclamation" | "solution";
