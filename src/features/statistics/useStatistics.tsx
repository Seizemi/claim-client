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

interface LoadedSeason {
  seasonValue: string;
  claims: ClaimResponse[];
}

const useSeasonStatistics = (seasonValue: string) => {
  const { request } = useApi(ClaimsBySeasonResponseSchema);
  const [loaded, setLoaded] = useState<LoadedSeason | null>(null);

  useEffect(() => {
    if (!seasonValue) {
      setLoaded(null);
      return;
    }

    let isCancelled = false;
    request({ method: "GET", url: claimsBySeasonUrl(seasonValue) }).then((result) => {
      if (!isCancelled) {
        setLoaded({ seasonValue, claims: result ?? [] });
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [seasonValue, request]);

  const stats = useMemo(() => aggregateStatistics(loaded?.claims ?? []), [loaded]);

  // Not useApi's isLoading: it is false until the first request starts, and an abandoned request turns it off too early.
  const isLoading = Boolean(seasonValue) && loaded?.seasonValue !== seasonValue;

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
