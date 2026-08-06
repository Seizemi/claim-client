import { ReactNode } from "react";
import ClaimCountLineChart from "features/statistics/charts/ClaimCountLineChart/ClaimCountLineChart";
import CategoryDoughnutChart from "features/statistics/charts/CategoryDoughnutChart/CategoryDoughnutChart";
import StatCard from "features/statistics/components/StatCard/StatCard";
import { SeasonStatistics } from "features/statistics/types/statistics";
import "features/statistics/tabs/ReclamationTab.scss";

export interface ReclamationTabProps {
  stats1: SeasonStatistics;
  stats2: SeasonStatistics;
  seasonSelector: ReactNode;
}

const ReclamationTab = ({ stats1, stats2, seasonSelector }: ReclamationTabProps) => (
  <div className="reclamation-tab">
    <div className="reclamation-tab__row">
      {seasonSelector}

      <StatCard>
        <ClaimCountLineChart
          title="Nombre de réclamation sur la première saison"
          weeklyLanguageCounts={stats1.weeklyLanguageCounts}
        />
        <ClaimCountLineChart
          title="Nombre de réclamation sur la seconde saison"
          weeklyLanguageCounts={stats2.weeklyLanguageCounts}
        />
      </StatCard>
    </div>

    <div className="reclamation-tab__row">
      <StatCard>
        <CategoryDoughnutChart
          title="Statut des réclamations sur la première saison"
          breakdown={stats1.statusBreakdown}
        />
        <CategoryDoughnutChart
          title="Statut des réclamations sur la seconde saison"
          breakdown={stats2.statusBreakdown}
        />
      </StatCard>

      <StatCard>
        <CategoryDoughnutChart
          title="Focus Skissim sur la première saison"
          breakdown={stats1.skissimBreakdown}
          cutout="0%"
        />
        <CategoryDoughnutChart
          title="Focus Skissim sur la seconde saison"
          breakdown={stats2.skissimBreakdown}
          cutout="0%"
        />
      </StatCard>
    </div>
  </div>
);

export default ReclamationTab;
