import { ReactNode } from "react";
import ClaimCountLineChart from "features/statistics/charts/ClaimCountLineChart/ClaimCountLineChart";
import CategoryDoughnutChart from "features/statistics/charts/CategoryDoughnutChart/CategoryDoughnutChart";
import StatCard from "features/statistics/components/StatCard/StatCard";
import { SeasonStatistics } from "features/statistics/types/statistics";
import "features/statistics/tabs/ReclamationTab.scss";

export interface ReclamationTabProps {
  stats1: SeasonStatistics;
  stats2: SeasonStatistics;
  isLoading1: boolean;
  isLoading2: boolean;
  seasonSelector: ReactNode;
}

const ReclamationTab = ({ stats1, stats2, isLoading1, isLoading2, seasonSelector }: ReclamationTabProps) => (
  <div className="reclamation-tab">
    <div className="reclamation-tab__row">
      {seasonSelector}

      <StatCard>
        <ClaimCountLineChart
          title="Nombre de réclamation sur la première saison"
          weeklyLanguageCounts={stats1.weeklyLanguageCounts}
          isLoading={isLoading1}
        />
        <ClaimCountLineChart
          title="Nombre de réclamation sur la seconde saison"
          weeklyLanguageCounts={stats2.weeklyLanguageCounts}
          isLoading={isLoading2}
        />
      </StatCard>
    </div>

    <div className="reclamation-tab__row">
      <StatCard>
        <CategoryDoughnutChart
          title="Statut des réclamations sur la première saison"
          breakdown={stats1.statusBreakdown}
          isLoading={isLoading1}
        />
        <CategoryDoughnutChart
          title="Statut des réclamations sur la seconde saison"
          breakdown={stats2.statusBreakdown}
          isLoading={isLoading2}
        />
      </StatCard>

      <StatCard>
        <CategoryDoughnutChart
          title="Focus Skissim sur la première saison"
          breakdown={stats1.skissimBreakdown}
          cutout="0%"
          isLoading={isLoading1}
        />
        <CategoryDoughnutChart
          title="Focus Skissim sur la seconde saison"
          breakdown={stats2.skissimBreakdown}
          cutout="0%"
          isLoading={isLoading2}
        />
      </StatCard>
    </div>
  </div>
);

export default ReclamationTab;
