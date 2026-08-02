import { ClaimResponse } from "features/claims/types/claim";
import { ClaimFormState } from "features/claims/types/claimFormState";

const toDateInputValue = (isoDate: string | null): string => (isoDate ? isoDate.slice(0, 10) : "");
const toFormNumber = (value: number | null): string => (value === null ? "" : String(value));
const toFormText = (value: string | null): string => value ?? "";

export const mapClaimResponseToFormState = (claim: ClaimResponse): ClaimFormState => ({
  bookingNumber: claim.booking.bookingNumber,
  customerName: claim.booking.customer.name,
  salesChannel: claim.booking.salesChannel.id,
  dateOfArrival: toDateInputValue(claim.claimDate.dateOfArrival),
  dateOfDeparture: toDateInputValue(claim.claimDate.dateOfDeparture),

  dateOfReceivedClaim: toDateInputValue(claim.claimDate.dateOfReceivedClaim),
  dateOfStartFollowUp: toDateInputValue(claim.claimDate.dateOfStartFollowUp),
  dateLastUpdate: toDateInputValue(claim.claimDate.dateLastUpdate),
  updateReason: toFormText(claim.updateReason),
  dateEndOfFollowUp: toDateInputValue(claim.claimDate.dateEndOfFollowUp),

  state: claim.state,
  followedBy: claim.followedBy?.id ?? "",
  customerAkioNumber: String(claim.booking.customer.akioNumber),
  supplierAkioNumber: String(claim.booking.supplier.supplierAkioNumber),
  service: claim.booking.supplier.service.id,
  supplierName: claim.booking.supplier.id,
  skissimType: claim.booking.skissimType.id,
  product: toFormText(claim.booking.product),
  purposeOfSolution: toFormText(claim.purposeOfSolution),
  claimSummary: toFormText(claim.claimSummary),
  reason: claim.reason.id,
  solution: claim.solution.id,

  claimRefund: toFormNumber(claim.compensation.claimRefund),
  refundState: claim.compensation.refundState.id,
  compensationReason: claim.compensation.compensationReason.id,
  customerVoucher: toFormNumber(claim.compensation.customerVoucher),
  customerUsedVoucher: toFormNumber(claim.compensation.customerUsedVoucher),
  supplierRefund: toFormNumber(claim.compensation.supplierRefund),

  customerSuppInfo: toFormText(claim.customerSuppInfo),
  supplierSuppInfo: toFormText(claim.supplierSuppInfo),
});
