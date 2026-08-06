import { LANGUAGE_COLORS } from "features/statistics/utils/statisticsColors";
import "features/statistics/components/ClaimCountLegend/ClaimCountLegend.scss";

const LEGEND_ITEMS: { key: keyof typeof LANGUAGE_COLORS; label: string }[] = [
  { key: "Fr", label: "FR" },
  { key: "Nl", label: "NL" },
  { key: "En", label: "UK" },
  { key: "total", label: "Total" },
];

const ClaimCountLegend = () => (
  <div className="claim-count-legend">
    <p className="claim-count-legend__title">Légende nombre de réclamation :</p>
    <ul className="claim-count-legend__list">
      {LEGEND_ITEMS.map(({ key, label }) => (
        <li key={key} className="claim-count-legend__item">
          <span className="claim-count-legend__swatch" style={{ backgroundColor: LANGUAGE_COLORS[key] }} />
          {label}
        </li>
      ))}
    </ul>
  </div>
);

export default ClaimCountLegend;
