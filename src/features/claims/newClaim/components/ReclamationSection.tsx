import FormSection from "shared/components/form/FormSection";
import FormRow from "shared/components/form/FormRow";
import { CLAIM_STATUS_COLUMNS } from "features/claims/dashboard/claimStatusColumns";
import { useLookupsStore } from "features/claims/lookups/useLookupsStore";
import { NewClaimSectionProps } from "features/claims/newClaim/components/NewClaimSectionProps";

const ReclamationSection = ({ form, onChange }: NewClaimSectionProps) => {
  const lookups = useLookupsStore((state) => state.data);

  return (
    <FormSection title="Réclamation">
      <FormRow label="Etat">
        <select value={form.state} onChange={(event) => onChange("state", event.target.value as typeof form.state)}>
          <option value="">Chercher un état...</option>
          {CLAIM_STATUS_COLUMNS.map((column) => (
            <option key={column.state} value={column.state}>
              {column.label}
            </option>
          ))}
        </select>
      </FormRow>
      <FormRow label="Agent">
        <select value={form.followedBy} onChange={(event) => onChange("followedBy", event.target.value)}>
          <option value="">Non assigné</option>
          {(lookups?.followedBies ?? []).map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </FormRow>
      <FormRow label="N° Akio client">
        <input
          type="number"
          placeholder="N° Akio client..."
          value={form.customerAkioNumber}
          onChange={(event) => onChange("customerAkioNumber", event.target.value)}
        />
      </FormRow>
      <FormRow label="N° Akio fournisseur">
        <input
          type="number"
          placeholder="N° Akio fournisseur..."
          value={form.supplierAkioNumber}
          onChange={(event) => onChange("supplierAkioNumber", event.target.value)}
        />
      </FormRow>
      <FormRow label="Prestation">
        <select value={form.service} onChange={(event) => onChange("service", event.target.value)}>
          <option value="">Prestation...</option>
          {(lookups?.services ?? []).map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </FormRow>
      <FormRow label="Fournisseur">
        <select value={form.supplierName} onChange={(event) => onChange("supplierName", event.target.value)}>
          <option value="">Fournisseur...</option>
          {(lookups?.suppliers.filter((option) => option.service.id == form.service) ?? []).map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </FormRow>
      <FormRow label="Type Skissim">
        <select value={form.skissimType} onChange={(event) => onChange("skissimType", event.target.value)}>
          <option value="">Type Skissim...</option>
          {(lookups?.skissimTypes ?? []).map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </FormRow>
      <FormRow label="Produit">
        <input type="text" placeholder="Produit..." value={form.product} onChange={(event) => onChange("product", event.target.value)} />
      </FormRow>
      <FormRow label="Motif">
        <input
          type="text"
          placeholder="Motif..."
          value={form.purposeOfSolution}
          onChange={(event) => onChange("purposeOfSolution", event.target.value)}
        />
      </FormRow>
      <FormRow label="Résumé réclamation">
        <input
          type="text"
          placeholder="Résumé..."
          value={form.claimSummary}
          onChange={(event) => onChange("claimSummary", event.target.value)}
        />
      </FormRow>
      <FormRow label="Raison">
        <select value={form.reason} onChange={(event) => onChange("reason", event.target.value)}>
          <option value="">Raison...</option>
          {(lookups?.reasons ?? []).map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </FormRow>
      <FormRow label="Solution">
        <select value={form.solution} onChange={(event) => onChange("solution", event.target.value)}>
          <option value="">Solution...</option>
          {(lookups?.solutions ?? []).map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </FormRow>
    </FormSection>
  );
};

export default ReclamationSection;
