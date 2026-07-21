import ClaimCard from "features/claims/components/ClaimCard/ClaimCard";
import { ClaimResponse, ClaimState } from "features/claims/types/claim";
import { ClaimColumnFilters } from "features/claims/types/claimFilters";
import "features/claims/components/DashboardColumn/DashboardColumn.scss";

export interface DashboardColumnProps {
  state: ClaimState;
  label: string;
  accent: "pink" | "blue";
  claims: ClaimResponse[];
  filters: ClaimColumnFilters;
  onFilterChange: (field: keyof ClaimColumnFilters, value: string) => void;
}

const DashboardColumn = ({ label, accent, claims, filters, onFilterChange }: DashboardColumnProps) => {
  return (
    <div className="dashboard-column">
      <div className={`dashboard-column__header dashboard-column__header--${accent}`}>
        <span className="dashboard-column__label">{label}</span>
        <span className="dashboard-column__count">{claims.length}</span>
      </div>

      <div className="dashboard-column__filters">
        <input
          type="text"
          placeholder="Nom du client..."
          value={filters.customerName}
          onChange={(event) => onFilterChange("customerName", event.target.value)}
        />
        <input
          type="text"
          placeholder="N° du dossier..."
          value={filters.bookingNumber}
          onChange={(event) => onFilterChange("bookingNumber", event.target.value)}
        />
        <input
          type="text"
          placeholder="N° Akio du client..."
          value={filters.customerAkioNumber}
          onChange={(event) => onFilterChange("customerAkioNumber", event.target.value)}
        />
        <input
          type="text"
          placeholder="N° Akio du fournisseur..."
          value={filters.supplierAkioNumber}
          onChange={(event) => onFilterChange("supplierAkioNumber", event.target.value)}
        />
      </div>

      <div className="dashboard-column__cards">
        {claims.map((claim) => (
          <ClaimCard key={claim.id} claim={claim} />
        ))}
      </div>
    </div>
  );
};

export default DashboardColumn;
