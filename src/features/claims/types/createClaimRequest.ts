import { ClaimState } from "features/claims/types/claim";

export interface CustomerRequest {
  name: string;
  akioNumber: number;
}

export interface SupplierRequest {
  label: string;
  value: string;
  supplierAkioNumber: number;
  serviceId: string;
}

export interface BookingRequest {
  bookingNumber: string;
  salesChannelId: string;
  skissimTypeId: string;
  product: string | null;
  customer: CustomerRequest;
  supplier: SupplierRequest;
}

export interface ClaimDateRequest {
  dateOfReceivedClaim: string | null;
  dateOfStartFollowUp: string | null;
  dateLastUpdate: string | null;
  dateOfDeparture: string | null;
  dateEndOfFollowUp: string | null;
  dateOfArrival: string | null;
}

export interface CompensationRequest {
  customerVoucher: number | null;
  customerUsedVoucher: number | null;
  supplierRefund: number | null;
  claimRefund: number | null;
  refundStateId: string;
  compensationReasonId: string;
}

export interface ClaimRequest {
  state: ClaimState;
  followedById: string | null;
  reasonId: string;
  claimSummary: string | null;
  solutionId: string;
  purposeOfSolution: string | null;
  updateReason: string | null;
  customerSuppInfo: string | null;
  supplierSuppInfo: string | null;
  booking: BookingRequest;
  claimDate: ClaimDateRequest;
  compensation: CompensationRequest;
}
