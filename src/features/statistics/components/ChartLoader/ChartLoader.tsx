import "features/statistics/components/ChartLoader/ChartLoader.scss";

const ChartLoader = () => (
  <div className="chart-loader" role="status" aria-label="Chargement du graphique">
    <span className="chart-loader__spinner" aria-hidden="true" />
  </div>
);

export default ChartLoader;
