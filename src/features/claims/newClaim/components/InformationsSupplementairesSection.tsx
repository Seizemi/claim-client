import FormSection from "shared/components/form/FormSection";
import FormRow from "shared/components/form/FormRow";
import { NewClaimSectionProps } from "features/claims/newClaim/components/NewClaimSectionProps";

const InformationsSupplementairesSection = ({ form, onChange }: NewClaimSectionProps) => {
  return (
    <FormSection title="Informations supplémentaires">
      <FormRow label="Information supplémentaire client">
        <input
          type="text"
          placeholder="Description..."
          value={form.customerSuppInfo}
          onChange={(event) => onChange("customerSuppInfo", event.target.value)}
        />
      </FormRow>
      <FormRow label="Information supplémentaire fournisseur">
        <input
          type="text"
          placeholder="Description..."
          value={form.supplierSuppInfo}
          onChange={(event) => onChange("supplierSuppInfo", event.target.value)}
        />
      </FormRow>
    </FormSection>
  );
};

export default InformationsSupplementairesSection;
