import FormSection from "shared/components/form/FormSection";
import FormRow from "shared/components/form/FormRow";
import ClearableSelect from "shared/components/form/ClearableSelect";
import { CLAIM_STATUS_COLUMNS } from "features/claims/dashboard/claimStatusColumns";
import { useLookupsStore } from "features/claims/lookups/useLookupsStore";
import { ClaimFormSectionProps } from "features/claims/components/ClaimForm/ClaimFormSectionProps";

const ReclamationSection = ({ form, onChange }: ClaimFormSectionProps) => {
  const lookups = useLookupsStore((state) => state.data);

  return (
    <FormSection title="Réclamation">
      <FormRow label="Etat">
        <ClearableSelect
          value={form.state}
          onChange={(value) => onChange("state", value as typeof form.state)}
        >
          <option value="">Chercher un état...</option>
          {CLAIM_STATUS_COLUMNS.map((column) => (
            <option key={column.state} value={column.state}>
              {column.label}
            </option>
          ))}
        </ClearableSelect>
      </FormRow>
      <FormRow label="Agent">
        <ClearableSelect value={form.followedBy} onChange={(value) => onChange("followedBy", value)}>
          <option value="">Non assigné</option>
          {(lookups?.followedBies ?? []).map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </ClearableSelect>
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
        <ClearableSelect value={form.service} onChange={(value) => onChange("service", value)}>
          <option value="">Prestation...</option>
          {(lookups?.services ?? []).map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </ClearableSelect>
      </FormRow>
      <FormRow label="Fournisseur">
        <ClearableSelect value={form.supplierName} onChange={(value) => onChange("supplierName", value)}>
          <option value="">Fournisseur...</option>
          {(lookups?.suppliers.filter((option) => option.service.id == form.service) ?? []).map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </ClearableSelect>
      </FormRow>
      <FormRow label="Type Skissim">
        <ClearableSelect value={form.skissimType} onChange={(value) => onChange("skissimType", value)}>
          <option value="">Type Skissim...</option>
          {(lookups?.skissimTypes ?? []).map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </ClearableSelect>
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
        <ClearableSelect value={form.reason} onChange={(value) => onChange("reason", value)}>
          <option value="">Raison...</option>
          {(lookups?.reasons ?? []).map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </ClearableSelect>
      </FormRow>
      <FormRow label="Solution">
        <ClearableSelect value={form.solution} onChange={(value) => onChange("solution", value)}>
          <option value="">Solution...</option>
          {(lookups?.solutions ?? []).map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </ClearableSelect>
      </FormRow>
    </FormSection>
  );
};

export default ReclamationSection;
