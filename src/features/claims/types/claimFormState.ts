import { ClaimState } from "features/claims/types/claim";

export interface ClaimFormState {
  bookingNumber: string;
  customerName: string;
  salesChannel: string;
  dateOfArrival: string;
  dateOfDeparture: string;

  dateOfReceivedClaim: string;
  dateOfStartFollowUp: string;
  dateLastUpdate: string;
  updateReason: string;
  dateEndOfFollowUp: string;

  state: ClaimState | "";
  followedBy: string;
  customerAkioNumber: string;
  supplierAkioNumber: string;
  service: string;
  supplierName: string;
  skissimType: string;
  product: string;
  purposeOfSolution: string;
  claimSummary: string;
  reason: string;
  solution: string;

  claimRefund: string;
  refundState: string;
  compensationReason: string;
  customerVoucher: string;
  customerUsedVoucher: string;
  supplierRefund: string;

  customerSuppInfo: string;
  supplierSuppInfo: string;
}

export const EMPTY_CLAIM_FORM_STATE: ClaimFormState = {
  bookingNumber: "",
  customerName: "",
  salesChannel: "",
  dateOfArrival: "",
  dateOfDeparture: "",

  dateOfReceivedClaim: "",
  dateOfStartFollowUp: "",
  dateLastUpdate: "",
  updateReason: "",
  dateEndOfFollowUp: "",

  state: "",
  followedBy: "",
  customerAkioNumber: "",
  supplierAkioNumber: "",
  service: "",
  supplierName: "",
  skissimType: "",
  product: "",
  purposeOfSolution: "",
  claimSummary: "",
  reason: "",
  solution: "",

  claimRefund: "",
  refundState: "",
  compensationReason: "",
  customerVoucher: "",
  customerUsedVoucher: "",
  supplierRefund: "",

  customerSuppInfo: "",
  supplierSuppInfo: "",
};
