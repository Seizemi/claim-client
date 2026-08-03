import DashboardColumn from "features/claims/components/DashboardColumn/DashboardColumn";
import SeasonFilterPanel from "features/claims/components/SeasonFilterPanel/SeasonFilterPanel";
import { useDashboard } from "features/claims/dashboard/useDashboard";
import { CLAIM_STATUS_COLUMNS } from "features/claims/dashboard/claimStatusColumns";
import { getSeasonKind, getSeasonLabel } from "features/claims/utils/seasonOptions";
import { SlidersIcon, SunIcon, SnowflakeIcon } from "shared/components/icons";
import "features/claims/dashboard/Dashboard.scss";

const Dashboard = () => {
  const {
    filtersByState,
    setColumnFilter,
    seasonFilter,
    setSeasonFilter,
    isFilterPanelOpen,
    toggleFilterPanel,
  } = useDashboard();

  const seasonLabel = seasonFilter ? getSeasonLabel(seasonFilter) : null;
  const seasonKind = seasonFilter ? getSeasonKind(seasonFilter) : null;

  return (
    <div className="dashboard">
      <div className="dashboard__content">
        {CLAIM_STATUS_COLUMNS.map(({ state, label, accent }) => (
          <DashboardColumn
            key={state}
            state={state}
            label={label}
            accent={accent}
            filters={filtersByState[state]}
            onFilterChange={(field, value) => setColumnFilter(state, field, value)}
            seasonFilter={seasonFilter}
          />
        ))}

        <button
          type="button"
          className="dashboard__filter-toggle"
          aria-label="Filtrer par saison"
          onClick={toggleFilterPanel}
        >
          {seasonLabel ? (
            <>
              {seasonKind === "winter" ? (
                <SnowflakeIcon className="dashboard__filter-icon" />
              ) : (
                <SunIcon className="dashboard__filter-icon" />
              )}
              <span className="dashboard__filter-label">{seasonLabel}</span>
            </>
          ) : (
            <SlidersIcon className="dashboard__filter-icon" />
          )}
        </button>
      </div>

      {isFilterPanelOpen && <SeasonFilterPanel seasonValue={seasonFilter} onSeasonChange={setSeasonFilter} />}
    </div>
  );
};

export default Dashboard;
