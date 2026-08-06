import { Line } from "react-chartjs-2";
import "features/statistics/charts/chartSetup";
import { WeeklyLanguageCount } from "features/statistics/types/statistics";
import { LANGUAGE_COLORS } from "features/statistics/utils/statisticsColors";
import "features/statistics/charts/ClaimCountLineChart/ClaimCountLineChart.scss";

export interface ClaimCountLineChartProps {
  title: string;
  weeklyLanguageCounts: WeeklyLanguageCount[];
}

const ClaimCountLineChart = ({ title, weeklyLanguageCounts }: ClaimCountLineChartProps) => {
  const data = {
    labels: weeklyLanguageCounts.map((entry) => entry.week),
    datasets: [
      {
        label: "FR",
        data: weeklyLanguageCounts.map((entry) => entry.Fr),
        borderColor: LANGUAGE_COLORS.Fr,
        backgroundColor: LANGUAGE_COLORS.Fr,
        tension: 0.3,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
      {
        label: "NL",
        data: weeklyLanguageCounts.map((entry) => entry.Nl),
        borderColor: LANGUAGE_COLORS.Nl,
        backgroundColor: LANGUAGE_COLORS.Nl,
        tension: 0.3,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
      {
        label: "UK",
        data: weeklyLanguageCounts.map((entry) => entry.En),
        borderColor: LANGUAGE_COLORS.En,
        backgroundColor: LANGUAGE_COLORS.En,
        tension: 0.3,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
      {
        label: "Total",
        data: weeklyLanguageCounts.map((entry) => entry.total),
        borderColor: LANGUAGE_COLORS.total,
        backgroundColor: LANGUAGE_COLORS.total,
        tension: 0.3,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
  };

  return (
    <div className="claim-count-line-chart">
      <h3 className="claim-count-line-chart__title">{title}</h3>
      <div className="claim-count-line-chart__canvas">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ClaimCountLineChart;
