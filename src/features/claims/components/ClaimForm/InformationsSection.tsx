import FormSection from "shared/components/form/FormSection";
import FormRow from "shared/components/form/FormRow";
import ClearableSelect from "shared/components/form/ClearableSelect";
import { useLookupsStore } from "features/claims/lookups/useLookupsStore";
import { ClaimFormSectionProps } from "features/claims/components/ClaimForm/ClaimFormSectionProps";
import { getLanguageFlag } from "features/claims/utils/languageFlags";

const InformationsSection = ({ form, onChange, disabled = false }: ClaimFormSectionProps) => {
  const lookups = useLookupsStore((state) => state.data);
  const selectedSalesChannel = (lookups?.salesChannels ?? []).find((channel) => channel.id === form.salesChannel);
  const SalesChannelFlag = getLanguageFlag(selectedSalesChannel?.language);

  return (
    <FormSection title="Informations">
      <FormRow label="N° du dossier">
        <input
          type="text"
          placeholder="N° du dossier..."
          value={form.bookingNumber}
          onChange={(event) => onChange("bookingNumber", event.target.value)}
          disabled={disabled}
        />
      </FormRow>
      <FormRow label="Nom du client">
        <input
          type="text"
          placeholder="Nom du client..."
          value={form.customerName}
          onChange={(event) => onChange("customerName", event.target.value)}
          disabled={disabled}
        />
      </FormRow>
      <FormRow label="Canal de vente">
        <div className="sales-channel-field">
          <ClearableSelect
            value={form.salesChannel}
            onChange={(value) => onChange("salesChannel", value)}
            disabled={disabled}
          >
            <option value="">Canal de vente...</option>
            {(lookups?.salesChannels ?? []).map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </ClearableSelect>
          {SalesChannelFlag && (
            <SalesChannelFlag className="sales-channel-field__flag" aria-label={selectedSalesChannel?.language} />
          )}
        </div>
      </FormRow>
      <FormRow label="Date d'arrivée du client">
        <input
          type="date"
          value={form.dateOfArrival}
          onChange={(event) => onChange("dateOfArrival", event.target.value)}
          disabled={disabled}
        />
      </FormRow>
      <FormRow label="Date de départ du client">
        <input
          type="date"
          value={form.dateOfDeparture}
          onChange={(event) => onChange("dateOfDeparture", event.target.value)}
          disabled={disabled}
        />
      </FormRow>
    </FormSection>
  );
};

export default InformationsSection;
