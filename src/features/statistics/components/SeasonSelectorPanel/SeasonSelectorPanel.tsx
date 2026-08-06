import { ReactNode } from "react";
import { SEASON_OPTIONS } from "features/claims/utils/seasonOptions";
import { XIcon } from "shared/components/icons";
import "features/statistics/components/SeasonSelectorPanel/SeasonSelectorPanel.scss";

export interface SeasonSelectorPanelProps {
  season1: string;
  onSeason1Change: (value: string) => void;
  season2: string;
  onSeason2Change: (value: string) => void;
  legend?: ReactNode;
}

interface SeasonDropdownProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const SeasonDropdown = ({ id, label, value, onChange }: SeasonDropdownProps) => (
  <div className="season-selector-panel__field">
    <label className="season-selector-panel__label" htmlFor={id}>
      {label}
    </label>
    <div className="season-selector-panel__select-wrapper">
      <select
        id={id}
        className="season-selector-panel__select"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Saison...</option>
        {SEASON_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {value !== "" && (
        <button
          type="button"
          className="season-selector-panel__clear"
          aria-label="Réinitialiser la saison"
          onClick={() => onChange("")}
        >
          <XIcon />
        </button>
      )}
    </div>
  </div>
);

const SeasonSelectorPanel = ({
  season1,
  onSeason1Change,
  season2,
  onSeason2Change,
  legend,
}: SeasonSelectorPanelProps) => (
  <aside className="season-selector-panel">
    <SeasonDropdown id="statistics-season-1" label="Première saison" value={season1} onChange={onSeason1Change} />
    <SeasonDropdown id="statistics-season-2" label="Seconde saison" value={season2} onChange={onSeason2Change} />
    {legend && <div className="season-selector-panel__legend">{legend}</div>}
  </aside>
);

export default SeasonSelectorPanel;
