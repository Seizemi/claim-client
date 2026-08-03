import ClaimCard from "features/claims/components/ClaimCard/ClaimCard";
import { useDashboardColumn } from "features/claims/components/DashboardColumn/useDashboardColumn";
import { ClaimState } from "features/claims/types/claim";
import { ClaimColumnFilters } from "features/claims/types/claimFilters";
import "features/claims/components/DashboardColumn/DashboardColumn.scss";

export interface DashboardColumnProps {
  state: ClaimState;
  label: string;
  accent: "pink" | "blue";
  filters: ClaimColumnFilters;
  onFilterChange: (field: keyof ClaimColumnFilters, value: string) => void;
  seasonFilter: string;
}

const DashboardColumn = ({ state, label, accent, filters, onFilterChange, seasonFilter }: DashboardColumnProps) => {
  const { claims, totalCount, isLoadingMore, cardsContainerRef, sentinelRef } = useDashboardColumn(
    state,
    filters,
    seasonFilter
  );

  return (
    <div className="dashboard-column">
      <div className={`dashboard-column__header dashboard-column__header--${accent}`}>
        <span className="dashboard-column__label">{label}</span>
        <span className="dashboard-column__count">{totalCount}</span>
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

      <div className="dashboard-column__cards" ref={cardsContainerRef}>
        {claims.map((claim) => (
          <ClaimCard key={claim.id} claim={claim} />
        ))}
        <div className="dashboard-column__sentinel" ref={sentinelRef} />
        {isLoadingMore && <span className="dashboard-column__loading">Chargement...</span>}
      </div>
    </div>
  );
};

export default DashboardColumn;
