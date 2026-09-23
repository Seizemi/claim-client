import FormSection from "shared/components/form/FormSection";
import FormRow from "shared/components/form/FormRow";
import { ClaimFormSectionProps } from "features/claims/components/ClaimForm/ClaimFormSectionProps";

const CalendrierSection = ({ form, onChange, disabled = false }: ClaimFormSectionProps) => {
  return (
    <FormSection title="Calendrier">
      <FormRow label="Date de réception">
        <input
          type="date"
          value={form.dateOfReceivedClaim}
          onChange={(event) => onChange("dateOfReceivedClaim", event.target.value)}
          disabled={disabled}
        />
      </FormRow>
      <FormRow label="Date de début de suivi">
        <input
          type="date"
          value={form.dateOfStartFollowUp}
          onChange={(event) => onChange("dateOfStartFollowUp", event.target.value)}
          disabled={disabled}
        />
      </FormRow>
      <FormRow label="Date de dernière mise à jour">
        <input
          type="date"
          value={form.dateLastUpdate}
          onChange={(event) => onChange("dateLastUpdate", event.target.value)}
          disabled={disabled}
        />
      </FormRow>
      <FormRow label="Motif de dernière mise à jour">
        <input
          type="text"
          placeholder="Motif..."
          value={form.updateReason}
          onChange={(event) => onChange("updateReason", event.target.value)}
          disabled={disabled}
        />
      </FormRow>
      <FormRow label="Date de fin de suivi">
        <input
          type="date"
          value={form.dateEndOfFollowUp}
          onChange={(event) => onChange("dateEndOfFollowUp", event.target.value)}
          disabled={disabled}
        />
      </FormRow>
    </FormSection>
  );
};

export default CalendrierSection;
