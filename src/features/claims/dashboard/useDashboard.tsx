import { useState } from "react";
import { ClaimState } from "features/claims/types/claim";
import { ClaimColumnFilters, EMPTY_CLAIM_COLUMN_FILTERS } from "features/claims/types/claimFilters";
import { CLAIM_STATUS_COLUMNS } from "features/claims/dashboard/claimStatusColumns";

export const useDashboard = () => {
  const [filtersByState, setFiltersByState] = useState<Record<ClaimState, ClaimColumnFilters>>(() =>
    CLAIM_STATUS_COLUMNS.reduce(
      (acc, column) => ({ ...acc, [column.state]: EMPTY_CLAIM_COLUMN_FILTERS }),
      {} as Record<ClaimState, ClaimColumnFilters>
    )
  );

  const setColumnFilter = (state: ClaimState, field: keyof ClaimColumnFilters, value: string) => {
    setFiltersByState((prev) => ({
      ...prev,
      [state]: { ...prev[state], [field]: value },
    }));
  };

  return {
    filtersByState,
    setColumnFilter,
  };
};
