import { ClaimRequest } from "features/claims/types/createClaimRequest";
import { ClaimFormState } from "features/claims/types/claimFormState";
import { toDateOnlyOrNull } from "shared/utils/toDateOnlyOrNull";

const toNullableText = (value: string): string | null => (value.trim() === "" ? null : value.trim());

const toNullableNumber = (value: string): number | null => {
  if (value.trim() === "") {
    return null;
  }
  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
};

const toAkioNumber = (value: string): number => {
  const parsed = Number(value);
  return value.trim() === "" || Number.isNaN(parsed) ? 0 : parsed;
};

export const buildClaimRequest = (form: ClaimFormState): ClaimRequest => ({
  state: form.state as ClaimRequest["state"],
  followedById: form.followedBy === "" ? null : form.followedBy,
  reasonId: form.reason,
  claimSummary: toNullableText(form.claimSummary),
  solutionId: form.solution,
  purposeOfSolution: toNullableText(form.purposeOfSolution),
  updateReason: toNullableText(form.updateReason),
  customerSuppInfo: toNullableText(form.customerSuppInfo),
  supplierSuppInfo: toNullableText(form.supplierSuppInfo),
  booking: {
    bookingNumber: form.bookingNumber.trim(),
    salesChannelId: form.salesChannel,
    skissimTypeId: form.skissimType,
    product: toNullableText(form.product),
    customer: {
      name: form.customerName.trim(),
      akioNumber: toAkioNumber(form.customerAkioNumber),
    },
    supplier: {
      id: form.supplierName.trim(),
    },
  },
  claimDate: {
    dateOfReceivedClaim: toDateOnlyOrNull(form.dateOfReceivedClaim),
    dateOfStartFollowUp: toDateOnlyOrNull(form.dateOfStartFollowUp),
    dateLastUpdate: toDateOnlyOrNull(form.dateLastUpdate),
    dateOfDeparture: toDateOnlyOrNull(form.dateOfDeparture),
    dateEndOfFollowUp: toDateOnlyOrNull(form.dateEndOfFollowUp),
    dateOfArrival: toDateOnlyOrNull(form.dateOfArrival),
  },
  compensation: {
    customerVoucher: toNullableNumber(form.customerVoucher),
    customerUsedVoucher: toNullableNumber(form.customerUsedVoucher),
    supplierRefund: toNullableNumber(form.supplierRefund),
    claimRefund: toNullableNumber(form.claimRefund),
    refundStateId: form.refundState,
    compensationReasonId: form.compensationReason,
  },
});
