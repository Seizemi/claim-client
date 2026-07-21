import DashboardColumn from "features/claims/components/DashboardColumn/DashboardColumn";
import { useDashboard } from "features/claims/dashboard/useDashboard";
import { CLAIM_STATUS_COLUMNS } from "features/claims/dashboard/claimStatusColumns";
import "features/claims/dashboard/Dashboard.scss";

const Dashboard = () => {
  const { filtersByState, setColumnFilter, getFilteredClaims } = useDashboard();

  return (
    <div className="dashboard">
      {CLAIM_STATUS_COLUMNS.map(({ state, label, accent }) => (
        <DashboardColumn
          key={state}
          state={state}
          label={label}
          accent={accent}
          claims={getFilteredClaims(state)}
          filters={filtersByState[state]}
          onFilterChange={(field, value) => setColumnFilter(state, field, value)}
        />
      ))}
    </div>
  );
};

export default Dashboard;
