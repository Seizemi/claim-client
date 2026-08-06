import ClaimCountLegend from "features/statistics/components/ClaimCountLegend/ClaimCountLegend";
import SeasonSelectorPanel from "features/statistics/components/SeasonSelectorPanel/SeasonSelectorPanel";
import StatisticsTabs from "features/statistics/components/StatisticsTabs/StatisticsTabs";
import ReclamationTab from "features/statistics/tabs/ReclamationTab";
import SolutionTab from "features/statistics/tabs/SolutionTab";
import { useStatistics } from "features/statistics/useStatistics";
import "features/statistics/Statistics.scss";

const Statistics = () => {
  const { season1, setSeason1, season2, setSeason2, activeTab, setActiveTab, stats1, stats2 } = useStatistics();

  return (
    <div className="statistics">
      <StatisticsTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="statistics__content">
        {activeTab === "reclamation" ? (
          <ReclamationTab
            stats1={stats1}
            stats2={stats2}
            seasonSelector={
              <SeasonSelectorPanel
                season1={season1}
                onSeason1Change={setSeason1}
                season2={season2}
                onSeason2Change={setSeason2}
                legend={<ClaimCountLegend />}
              />
            }
          />
        ) : (
          <SolutionTab
            stats1={stats1}
            stats2={stats2}
            seasonSelector={
              <SeasonSelectorPanel
                season1={season1}
                onSeason1Change={setSeason1}
                season2={season2}
                onSeason2Change={setSeason2}
              />
            }
          />
        )}
      </div>
    </div>
  );
};

export default Statistics;
