import { ClaimState } from "features/claims/types/claim";

// Mirrors src/shared/styles/_variables.scss — SCSS variables aren't importable
// into TS/Chart.js config, so the same hex values are duplicated here.
const MAIN_COLOR = "#66a6ff";
const SECONDARY_COLOR = "#ff769b";
const SUCCESS = "#59deaf";
const WARNING = "#ffce73";
const GREY_LIGHT = "#aaaaaa";
const BLACK = "#333333";

export const CHART_CATEGORY_PALETTE = [MAIN_COLOR, SUCCESS, SECONDARY_COLOR, WARNING, GREY_LIGHT, BLACK];

export const getCategoryColor = (index: number): string =>
  CHART_CATEGORY_PALETTE[index % CHART_CATEGORY_PALETTE.length];

export const LANGUAGE_COLORS: Record<"Fr" | "Nl" | "En" | "total", string> = {
  Fr: SUCCESS,
  Nl: WARNING,
  En: MAIN_COLOR,
  total: SECONDARY_COLOR,
};

export const STATUS_COLORS: Record<ClaimState, string> = {
  AwaitingSupplier: SECONDARY_COLOR,
  AwaitingClient: MAIN_COLOR,
  Terminate: SUCCESS,
  ClosedWithoutResponse: WARNING,
};

export const REFUND_COLORS = {
  customerVoucher: MAIN_COLOR,
  customerUsedVoucher: SECONDARY_COLOR,
  supplierRefund: SUCCESS,
  claimRefund: WARNING,
};
