import { Bar } from "react-chartjs-2";
import "features/statistics/charts/chartSetup";
import { RefundBreakdown } from "features/statistics/types/statistics";
import "features/statistics/charts/RefundStackedBarChart/RefundStackedBarChart.scss";

export interface RefundStackedBarChartProps {
  title: string;
  refundBreakdown: RefundBreakdown;
}

const RefundStackedBarChart = ({ title, refundBreakdown }: RefundStackedBarChartProps) => {
  const entries = Object.values(refundBreakdown);

  const data = {
    labels: ["Remboursements"],
    datasets: entries.map((entry) => ({
      label: entry.label,
      data: [entry.value],
      backgroundColor: entry.color,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y" as const,
    plugins: { legend: { display: false } },
    scales: {
      x: { stacked: true, beginAtZero: true, title: { display: true, text: "€" } },
      y: { stacked: true },
    },
  };

  return (
    <div className="refund-stacked-bar-chart">
      <h3 className="refund-stacked-bar-chart__title">{title}</h3>
      <div className="refund-stacked-bar-chart__canvas">
        <Bar data={data} options={options} />
      </div>
      <ul className="refund-stacked-bar-chart__legend">
        {entries.map((entry) => (
          <li key={entry.label} className="refund-stacked-bar-chart__legend-item">
            <span className="refund-stacked-bar-chart__legend-swatch" style={{ backgroundColor: entry.color }} />
            {entry.label} ({entry.value.toLocaleString("fr-FR")} €)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RefundStackedBarChart;
