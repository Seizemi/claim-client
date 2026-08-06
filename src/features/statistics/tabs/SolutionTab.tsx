import { ReactNode } from "react";
import CategoryDoughnutChart from "features/statistics/charts/CategoryDoughnutChart/CategoryDoughnutChart";
import RefundStackedBarChart from "features/statistics/charts/RefundStackedBarChart/RefundStackedBarChart";
import StatCard from "features/statistics/components/StatCard/StatCard";
import { SeasonStatistics } from "features/statistics/types/statistics";
import "features/statistics/tabs/SolutionTab.scss";

export interface SolutionTabProps {
  stats1: SeasonStatistics;
  stats2: SeasonStatistics;
  seasonSelector: ReactNode;
}

const SolutionTab = ({ stats1, stats2, seasonSelector }: SolutionTabProps) => (
  <div className="solution-tab">
    <div className="solution-tab__row">
      {seasonSelector}

      <StatCard>
        <CategoryDoughnutChart
          title="Répartition des solutions sur la première saison"
          breakdown={stats1.solutionBreakdown}
          cutout="0%"
        />
        <CategoryDoughnutChart
          title="Répartition des solutions sur la seconde saison"
          breakdown={stats2.solutionBreakdown}
          cutout="0%"
        />
      </StatCard>
    </div>

    <StatCard>
      <RefundStackedBarChart
        title="Répartition des remboursements sur la première saison"
        refundBreakdown={stats1.refundBreakdown}
      />
      <RefundStackedBarChart
        title="Répartition des remboursements sur la seconde saison"
        refundBreakdown={stats2.refundBreakdown}
      />
    </StatCard>
  </div>
);

export default SolutionTab;
