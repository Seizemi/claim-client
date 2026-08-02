import { KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarIcon, HomeIcon, InboxIcon, UserIcon } from "shared/components/icons";
import { getLanguageFlag } from "features/claims/utils/languageFlags";
import { ClaimSummaryResponse } from "features/claims/types/claim";
import { formatDate } from "shared/utils/formatDate";
import "features/claims/components/ClaimCard/ClaimCard.scss";

export interface ClaimCardProps {
  claim: ClaimSummaryResponse;
}

const ClaimCard = ({ claim }: ClaimCardProps) => {
  const navigate = useNavigate();
  const FlagIcon = getLanguageFlag(claim.language);
  const flag = FlagIcon ? <FlagIcon className="claim-card__flag" aria-label={claim.language} /> : null;

  const goToDetails = () => navigate(`/claims/${claim.id}`);
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      goToDetails();
    }
  };

  return (
    <div className="claim-card" role="button" tabIndex={0} onClick={goToDetails} onKeyDown={handleKeyDown}>
      <div className="claim-card__header">
        <span className="claim-card__title">
          {claim.customerName.toUpperCase()} / N°{claim.bookingNumber.toUpperCase()}
        </span>
        {flag}
      </div>

      <div className="claim-card__row">
        <span className="claim-card__info">
          <HomeIcon className="claim-card__icon" />
          {claim.supplierLabel}
        </span>
        <span className="claim-card__info">
          <CalendarIcon className="claim-card__icon" />
          {formatDate(claim.dateOfStartFollowUp)}
        </span>
      </div>

      <div className="claim-card__row">
        <span className="claim-card__info">
          <UserIcon className="claim-card__icon" />
          {claim.followedByLabel ?? "-"}
        </span>
        <span className="claim-card__info">
          <InboxIcon className="claim-card__icon" />
          {formatDate(claim.dateOfReceivedClaim)}
        </span>
      </div>
    </div>
  );
};

export default ClaimCard;
