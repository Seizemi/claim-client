import { SendIcon } from "shared/components/icons";
import { useNewClaim } from "features/claims/newClaim/useNewClaim";
import InformationsSection from "features/claims/newClaim/components/InformationsSection";
import CalendrierSection from "features/claims/newClaim/components/CalendrierSection";
import ReclamationSection from "features/claims/newClaim/components/ReclamationSection";
import DedommagementSection from "features/claims/newClaim/components/DedommagementSection";
import InformationsSupplementairesSection from "features/claims/newClaim/components/InformationsSupplementairesSection";
import "features/claims/newClaim/NewClaim.scss";

const NewClaim = () => {
  const { form, onChange, submit, isLoading } = useNewClaim();

  return (
    <div className="new-claim">
      <InformationsSection form={form} onChange={onChange} />
      <CalendrierSection form={form} onChange={onChange} />
      <ReclamationSection form={form} onChange={onChange} />
      <DedommagementSection form={form} onChange={onChange} />
      <InformationsSupplementairesSection form={form} onChange={onChange} />

      <div className="new-claim__actions">
        <button type="button" className="new-claim__submit" disabled={isLoading} onClick={submit}>
          <SendIcon />
          Valider
        </button>
      </div>
    </div>
  );
};

export default NewClaim;
