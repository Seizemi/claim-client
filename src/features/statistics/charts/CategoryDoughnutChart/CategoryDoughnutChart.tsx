import { Doughnut } from "react-chartjs-2";
import "features/statistics/charts/chartSetup";
import ChartLoader from "features/statistics/components/ChartLoader/ChartLoader";
import { CategoryBreakdown } from "features/statistics/types/statistics";
import "features/statistics/charts/CategoryDoughnutChart/CategoryDoughnutChart.scss";

export interface CategoryDoughnutChartProps {
  title: string;
  breakdown: CategoryBreakdown[];
  cutout?: string;
  isLoading: boolean;
}

const CategoryDoughnutChart = ({ title, breakdown, cutout = "60%", isLoading }: CategoryDoughnutChartProps) => {
  const data = {
    labels: breakdown.map((entry) => entry.label),
    datasets: [
      {
        data: breakdown.map((entry) => entry.value),
        backgroundColor: breakdown.map((entry) => entry.color),
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout,
    plugins: { legend: { display: false } },
  };

  return (
    <div className="category-doughnut-chart">
      <h3 className="category-doughnut-chart__title">{title}</h3>
      <div className="category-doughnut-chart__canvas">
        {isLoading ? <ChartLoader /> : <Doughnut data={data} options={options} />}
      </div>
      {!isLoading && (
        <ul className="category-doughnut-chart__legend">
          {breakdown.map((entry) => (
            <li key={entry.label} className="category-doughnut-chart__legend-item">
              <span className="category-doughnut-chart__legend-swatch" style={{ backgroundColor: entry.color }} />
              {entry.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryDoughnutChart;
