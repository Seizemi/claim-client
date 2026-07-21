import { useEffect, useMemo, useRef, useState } from "react";
import { useApi } from "shared/hooks/useApi";
import { ClaimResponse, ClaimState, PagedClaimResponseSchema } from "features/claims/types/claim";
import { ClaimColumnFilters, EMPTY_CLAIM_COLUMN_FILTERS } from "features/claims/types/claimFilters";
import { CLAIM_STATUS_COLUMNS } from "features/claims/dashboard/claimStatusColumns";

const DASHBOARD_CLAIMS_URL = "/api/v1.0/Claim/dashboard/claim";
const MAX_PAGE_SIZE = 100;

const matchesFilter = (value: string, filter: string) =>
  filter.trim() === "" || value.toLowerCase().includes(filter.trim().toLowerCase());

export const useDashboard = () => {
  const { data, isLoading, request } = useApi(PagedClaimResponseSchema);
  const [filtersByState, setFiltersByState] = useState<Record<ClaimState, ClaimColumnFilters>>(() =>
    CLAIM_STATUS_COLUMNS.reduce(
      (acc, column) => ({ ...acc, [column.state]: EMPTY_CLAIM_COLUMN_FILTERS }),
      {} as Record<ClaimState, ClaimColumnFilters>
    )
  );
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) {
      return;
    }
    hasFetchedRef.current = true;

    request({ method: "GET", url: DASHBOARD_CLAIMS_URL, params: { pageNumber: 1, pageSize: MAX_PAGE_SIZE } });
  }, [request]);

  const claimsByState = useMemo(() => {
    const grouped: Record<ClaimState, ClaimResponse[]> = {
      AwaitingSupplier: [],
      AwaitingClient: [],
      Terminate: [],
      ClosedWithoutResponse: [],
    };

    data?.items.forEach((claim) => {
      grouped[claim.state].push(claim);
    });

    return grouped;
  }, [data]);

  const setColumnFilter = (state: ClaimState, field: keyof ClaimColumnFilters, value: string) => {
    setFiltersByState((prev) => ({
      ...prev,
      [state]: { ...prev[state], [field]: value },
    }));
  };

  const getFilteredClaims = (state: ClaimState): ClaimResponse[] => {
    const filters = filtersByState[state];

    return claimsByState[state].filter(
      (claim) =>
        matchesFilter(claim.booking.customer.name, filters.customerName) &&
        matchesFilter(claim.booking.bookingNumber, filters.bookingNumber) &&
        matchesFilter(String(claim.booking.customer.akioNumber), filters.customerAkioNumber) &&
        matchesFilter(String(claim.booking.supplier.supplierAkioNumber), filters.supplierAkioNumber)
    );
  };

  return {
    isLoading,
    filtersByState,
    setColumnFilter,
    getFilteredClaims,
  };
};
