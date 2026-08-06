import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { useApi } from "shared/hooks/useApi";
import { ClaimResponse, ClaimResponseSchema } from "features/claims/types/claim";
import { getCurrentSeasonValue, getPreviousSeasonValue } from "features/claims/utils/seasonOptions";
import { StatisticsTab } from "features/statistics/types/statistics";
import { aggregateStatistics } from "features/statistics/utils/aggregateStatistics";

const ClaimsBySeasonResponseSchema = z.array(ClaimResponseSchema);

// Mirrors ClaimApi's RouteConsts.ClaimsBySeason ("/api/v1.0/Claim/by-season/{seasonValue}").
const claimsBySeasonUrl = (seasonValue: string) => `/api/v1.0/Claim/by-season/${seasonValue}`;

const useSeasonStatistics = (seasonValue: string) => {
  const { isLoading, request } = useApi(ClaimsBySeasonResponseSchema);
  const [claims, setClaims] = useState<ClaimResponse[]>([]);

  useEffect(() => {
    if (!seasonValue) {
      setClaims([]);
      return;
    }

    let isCancelled = false;
    request({ method: "GET", url: claimsBySeasonUrl(seasonValue) }).then((result) => {
      if (!isCancelled) {
        setClaims(result ?? []);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [seasonValue, request]);

  const stats = useMemo(() => aggregateStatistics(claims), [claims]);

  return { stats, isLoading };
};

export const useStatistics = () => {
  const [season1, setSeason1] = useState(getCurrentSeasonValue);
  const [season2, setSeason2] = useState(() => getPreviousSeasonValue(getCurrentSeasonValue()));
  const [activeTab, setActiveTab] = useState<StatisticsTab>("reclamation");

  const { stats: stats1, isLoading: isLoading1 } = useSeasonStatistics(season1);
  const { stats: stats2, isLoading: isLoading2 } = useSeasonStatistics(season2);

  return {
    season1,
    setSeason1,
    season2,
    setSeason2,
    activeTab,
    setActiveTab,
    stats1,
    stats2,
    isLoading1,
    isLoading2,
  };
};
