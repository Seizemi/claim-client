import { useEffect, useMemo, useRef, useState } from "react";
import { useApi } from "shared/hooks/useApi";
import { ClaimSummaryResponse, ClaimState, PagedClaimSummaryResponseSchema } from "features/claims/types/claim";
import { ClaimColumnFilters } from "features/claims/types/claimFilters";
import { matchesFilter } from "features/claims/utils/matchesFilter";

const PAGE_SIZE = 20;

const byStateUrl = (state: ClaimState) => `/api/v1.0/Claim/by-state/${state}`;

export const useDashboardColumn = (state: ClaimState, filters: ClaimColumnFilters, seasonFilter: string) => {
  const { isLoading, request } = useApi(PagedClaimSummaryResponseSchema);
  const [claims, setClaims] = useState<ClaimSummaryResponse[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const isFetchingRef = useRef(false);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadNextPage = async () => {
      if (isFetchingRef.current || (totalPages !== null && pageNumber >= totalPages)) {
        return;
      }
      isFetchingRef.current = true;
      setIsLoadingMore(true);

      const nextPage = pageNumber + 1;
      const result = await request({
        method: "GET",
        url: byStateUrl(state),
        params: { pageNumber: nextPage, pageSize: PAGE_SIZE },
      });

      if (result) {
        setClaims((prev) => [...prev, ...result.items]);
        setPageNumber(result.pageNumber);
        setTotalPages(result.totalPages);
        setTotalCount(result.totalCount);
      }

      isFetchingRef.current = false;
      setIsLoadingMore(false);
    };

    if (pageNumber === 0) {
      loadNextPage();
      return;
    }

    const cardsContainer = cardsContainerRef.current;
    const sentinel = sentinelRef.current;
    if (!cardsContainer || !sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadNextPage();
        }
      },
      { root: cardsContainer, rootMargin: "200px" }
    );
    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [state, pageNumber, totalPages]);

  const filteredClaims = useMemo(
    () =>
      claims.filter(
        (claim) =>
          matchesFilter(claim.customerName, filters.customerName) &&
          matchesFilter(claim.bookingNumber, filters.bookingNumber) &&
          matchesFilter(String(claim.customerAkioNumber), filters.customerAkioNumber) &&
          matchesFilter(String(claim.supplierAkioNumber), filters.supplierAkioNumber) &&
          (seasonFilter === "" || claim.seasonValue === seasonFilter)
      ),
    [claims, filters, seasonFilter]
  );

  return {
    claims: filteredClaims,
    totalCount,
    isLoading,
    isLoadingMore,
    cardsContainerRef,
    sentinelRef,
  };
};
