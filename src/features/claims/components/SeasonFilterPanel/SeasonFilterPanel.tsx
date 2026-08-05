import { SEASON_OPTIONS } from "features/claims/utils/seasonOptions";
import { XIcon } from "shared/components/icons";
import "features/claims/components/SeasonFilterPanel/SeasonFilterPanel.scss";

export interface SeasonFilterPanelProps {
  seasonValue: string;
  onSeasonChange: (value: string) => void;
}

const SeasonFilterPanel = ({ seasonValue, onSeasonChange }: SeasonFilterPanelProps) => {
  return (
    <aside className="season-filter-panel">
      <label className="season-filter-panel__label" htmlFor="season-filter-select">
        Saison
      </label>
      <div className="season-filter-panel__select-wrapper">
        <select
          id="season-filter-select"
          className="season-filter-panel__select"
          value={seasonValue}
          onChange={(event) => onSeasonChange(event.target.value)}
        >
          <option value="">Saison...</option>
          {SEASON_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {seasonValue !== "" && (
          <button
            type="button"
            className="season-filter-panel__clear"
            aria-label="Réinitialiser la saison"
            onClick={() => onSeasonChange("")}
          >
            <XIcon />
          </button>
        )}
      </div>
    </aside>
  );
};

export default SeasonFilterPanel;
