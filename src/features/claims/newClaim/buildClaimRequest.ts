import { ClaimRequest } from "features/claims/types/createClaimRequest";
import { NewClaimFormState } from "features/claims/newClaim/newClaimFormState";
import { toIsoDateTime } from "shared/utils/toIsoDateTime";

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

export const buildClaimRequest = (form: NewClaimFormState): ClaimRequest => ({
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
      label: form.supplierName.trim(),
      value: form.supplierName.trim(),
      supplierAkioNumber: toAkioNumber(form.supplierAkioNumber),
      serviceId: form.service,
    },
  },
  claimDate: {
    dateOfReceivedClaim: toIsoDateTime(form.dateOfReceivedClaim),
    dateOfStartFollowUp: toIsoDateTime(form.dateOfStartFollowUp),
    dateLastUpdate: toIsoDateTime(form.dateLastUpdate),
    dateOfDeparture: toIsoDateTime(form.dateOfDeparture),
    dateEndOfFollowUp: toIsoDateTime(form.dateEndOfFollowUp),
    dateOfArrival: toIsoDateTime(form.dateOfArrival),
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
