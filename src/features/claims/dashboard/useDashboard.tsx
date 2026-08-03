import { useState } from "react";
import { ClaimState } from "features/claims/types/claim";
import { ClaimColumnFilters, EMPTY_CLAIM_COLUMN_FILTERS } from "features/claims/types/claimFilters";
import { CLAIM_STATUS_COLUMNS } from "features/claims/dashboard/claimStatusColumns";

const SEASON_FILTER_STORAGE_KEY = "dashboard.seasonFilter";

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

  const [seasonFilter, setSeasonFilterState] = useState(
    () => localStorage.getItem(SEASON_FILTER_STORAGE_KEY) ?? ""
  );
  const setSeasonFilter = (value: string) => {
    setSeasonFilterState(value);
    localStorage.setItem(SEASON_FILTER_STORAGE_KEY, value);
  };

  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const toggleFilterPanel = () => setIsFilterPanelOpen((prev) => !prev);

  return {
    filtersByState,
    setColumnFilter,
    seasonFilter,
    setSeasonFilter,
    isFilterPanelOpen,
    toggleFilterPanel,
  };
};
