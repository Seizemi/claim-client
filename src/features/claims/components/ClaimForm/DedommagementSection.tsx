import FormSection from "shared/components/form/FormSection";
import FormRow from "shared/components/form/FormRow";
import { useLookupsStore } from "features/claims/lookups/useLookupsStore";
import { ClaimFormSectionProps } from "features/claims/components/ClaimForm/ClaimFormSectionProps";

const DedommagementSection = ({ form, onChange }: ClaimFormSectionProps) => {
  const lookups = useLookupsStore((state) => state.data);

  return (
    <FormSection title="Dédommagement">
      <FormRow label="Montant remboursé">
        <input type="number" value={form.claimRefund} onChange={(event) => onChange("claimRefund", event.target.value)} />
      </FormRow>
      <FormRow label="Remboursement versé">
        <select value={form.refundState} onChange={(event) => onChange("refundState", event.target.value)}>
          <option value="">Remboursement versé...</option>
          {(lookups?.refundStates ?? []).map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </FormRow>
      <FormRow label="Raison de dédommagement">
        <select value={form.compensationReason} onChange={(event) => onChange("compensationReason", event.target.value)}>
          <option value="">Raison de dédommagement...</option>
          {(lookups?.compensationReasons ?? []).map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </FormRow>
      <FormRow label="Avoir client">
        <input type="number" value={form.customerVoucher} onChange={(event) => onChange("customerVoucher", event.target.value)} />
      </FormRow>
      <FormRow label="Avoir client utilisé">
        <input
          type="number"
          value={form.customerUsedVoucher}
          onChange={(event) => onChange("customerUsedVoucher", event.target.value)}
        />
      </FormRow>
      <FormRow label="Remboursement fournisseur">
        <input type="number" value={form.supplierRefund} onChange={(event) => onChange("supplierRefund", event.target.value)} />
      </FormRow>
    </FormSection>
  );
};

export default DedommagementSection;
