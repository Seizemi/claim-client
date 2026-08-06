import { StatisticsTab } from "features/statistics/types/statistics";
import "features/statistics/components/StatisticsTabs/StatisticsTabs.scss";

export interface StatisticsTabsProps {
  activeTab: StatisticsTab;
  onTabChange: (tab: StatisticsTab) => void;
}

const TABS: { key: StatisticsTab; label: string }[] = [
  { key: "reclamation", label: "RECLAMATION" },
  { key: "solution", label: "SOLUTION" },
];

const StatisticsTabs = ({ activeTab, onTabChange }: StatisticsTabsProps) => (
  <nav className="statistics-tabs">
    {TABS.map(({ key, label }) => (
      <button
        key={key}
        type="button"
        className={`statistics-tabs__tab${activeTab === key ? " statistics-tabs__tab--active" : ""}`}
        onClick={() => onTabChange(key)}
      >
        {label}
      </button>
    ))}
  </nav>
);

export default StatisticsTabs;
