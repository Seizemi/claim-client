import { SendIcon } from "shared/components/icons";
import { useClaimDetails } from "features/claims/claimDetails/useClaimDetails";
import InformationsSection from "features/claims/components/ClaimForm/InformationsSection";
import CalendrierSection from "features/claims/components/ClaimForm/CalendrierSection";
import ReclamationSection from "features/claims/components/ClaimForm/ReclamationSection";
import DedommagementSection from "features/claims/components/ClaimForm/DedommagementSection";
import InformationsSupplementairesSection from "features/claims/components/ClaimForm/InformationsSupplementairesSection";
import "features/claims/components/ClaimForm/ClaimForm.scss";

const ClaimDetails = () => {
  const { form, isLoading, isSubmitting, error, onChange, submit } = useClaimDetails();

  if (isLoading || (!form && !error)) {
    return <div className="claim-form">Chargement...</div>;
  }

  if (error || !form) {
    return <div className="claim-form">Réclamation introuvable.</div>;
  }

  return (
    <div className="claim-form">
      <InformationsSection form={form} onChange={onChange} />
      <CalendrierSection form={form} onChange={onChange} />
      <ReclamationSection form={form} onChange={onChange} />
      <DedommagementSection form={form} onChange={onChange} />
      <InformationsSupplementairesSection form={form} onChange={onChange} />

      <div className="claim-form__actions">
        <button type="button" className="claim-form__submit" disabled={isSubmitting} onClick={submit}>
          <SendIcon />
          Mettre à jour
        </button>
      </div>
    </div>
  );
};

export default ClaimDetails;
