import { EditIcon, SendIcon, XIcon } from "shared/components/icons";
import { useClaimDetails } from "features/claims/claimDetails/useClaimDetails";
import InformationsSection from "features/claims/components/ClaimForm/InformationsSection";
import CalendrierSection from "features/claims/components/ClaimForm/CalendrierSection";
import ReclamationSection from "features/claims/components/ClaimForm/ReclamationSection";
import DedommagementSection from "features/claims/components/ClaimForm/DedommagementSection";
import InformationsSupplementairesSection from "features/claims/components/ClaimForm/InformationsSupplementairesSection";
import "features/claims/components/ClaimForm/ClaimForm.scss";
import "features/claims/claimDetails/ClaimDetails.scss";

const ClaimDetails = () => {
  const {
    form,
    isLoading,
    isSubmitting,
    isEditing,
    isLocking,
    error,
    onChange,
    submit,
    startEditing,
    cancelEditing,
  } = useClaimDetails();

  if (isLoading || (!form && !error)) {
    return <div className="claim-form">Chargement...</div>;
  }

  if (error || !form) {
    return <div className="claim-form">Réclamation introuvable.</div>;
  }

  const disabled = !isEditing;

  return (
    <div className="claim-form">
      {!isEditing && (
        <div className="claim-form__header">
          <button type="button" className="claim-form__submit" disabled={isLocking} onClick={startEditing}>
            <EditIcon />
            {isLocking ? "Vérification..." : "Modifier"}
          </button>
        </div>
      )}

      <InformationsSection form={form} onChange={onChange} disabled={disabled} />
      <CalendrierSection form={form} onChange={onChange} disabled={disabled} />
      <ReclamationSection form={form} onChange={onChange} disabled={disabled} />
      <DedommagementSection form={form} onChange={onChange} disabled={disabled} />
      <InformationsSupplementairesSection form={form} onChange={onChange} disabled={disabled} />

      {isEditing && (
        <div className="claim-form__actions">
          <button type="button" className="claim-form__cancel" onClick={cancelEditing}>
            <XIcon />
            Annuler
          </button>
          <button type="button" className="claim-form__submit" disabled={isSubmitting} onClick={submit}>
            <SendIcon />
            Mettre à jour
          </button>
        </div>
      )}
    </div>
  );
};

export default ClaimDetails;
