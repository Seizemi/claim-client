import { CalendarIcon, HomeIcon, InboxIcon, UserIcon } from "shared/components/icons";
import { LANGUAGE_FLAGS } from "features/claims/components/ClaimCard/languageFlags";
import { ClaimResponse } from "features/claims/types/claim";
import { formatDate } from "shared/utils/formatDate";
import "features/claims/components/ClaimCard/ClaimCard.scss";

export interface ClaimCardProps {
  claim: ClaimResponse;
}

const ClaimCard = ({ claim }: ClaimCardProps) => {
  const { booking, claimDate, followedBy } = claim;
  const FlagIcon = booking.language ? LANGUAGE_FLAGS[booking.language] : null;
  const flag = FlagIcon ? (
    <FlagIcon className="claim-card__flag" aria-label={booking.language ?? undefined} />
  ) : null;

  return (
    <div className="claim-card">
      <div className="claim-card__header">
        <span className="claim-card__title">
          {booking.customer.name.toUpperCase()} / N°{booking.bookingNumber.toUpperCase()}
        </span>
        {flag}
      </div>

      <div className="claim-card__row">
        <span className="claim-card__info">
          <HomeIcon className="claim-card__icon" />
          {booking.supplier.label}
        </span>
        <span className="claim-card__info">
          <CalendarIcon className="claim-card__icon" />
          {formatDate(claimDate.dateOfStartFollowUp)}
        </span>
      </div>

      <div className="claim-card__row">
        <span className="claim-card__info">
          <UserIcon className="claim-card__icon" />
          {followedBy?.label ?? "-"}
        </span>
        <span className="claim-card__info">
          <InboxIcon className="claim-card__icon" />
          {formatDate(claimDate.dateOfReceivedClaim)}
        </span>
      </div>
    </div>
  );
};

export default ClaimCard;
