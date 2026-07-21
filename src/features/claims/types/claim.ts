import { z } from "zod";

// Mirrors ClaimApi's Modules.Claims.Domain.Enums.* — member names are serialized
// verbatim as strings (JsonStringEnumConverter, no naming policy override).
export const ClaimStateSchema = z.enum([
  "AwaitingSupplier",
  "AwaitingClient",
  "Terminate",
  "ClosedWithoutResponse",
]);
export type ClaimState = z.infer<typeof ClaimStateSchema>;

export const ClaimSolutionSchema = z.enum([
  "Remboursement",
  "Voucher",
  "RemboursementAndVoucher",
  "RejectionOfRequest",
]);
export type ClaimSolution = z.infer<typeof ClaimSolutionSchema>;

export const SalesChannelSchema = z.enum([
  "TravelskiCom",
  "TravelskiCoUk",
  "TravelskiNl",
  "Lastminute",
  "Airbnb",
  "BookingCom",
  "Cgos",
  "CarrefourVoyages",
  "ELeclerc",
  "Veepee",
  "Expedia",
  "LidlVoyages",
  "Meyclub",
  "Showroomprivee",
  "WiismilevVoyages",
]);
export type SalesChannel = z.infer<typeof SalesChannelSchema>;

export const LanguageSchema = z.enum(["Fr", "En", "Nl"]);
export type Language = z.infer<typeof LanguageSchema>;

export const BookingServiceSchema = z.enum([
  "Hebergement",
  "Skipass",
  "LocationDeSki",
  "Esf",
  "Foodpack",
  "SkitrainUk",
  "Transfert",
  "Assurance",
  "Parking",
  "Activites",
]);
export type BookingService = z.infer<typeof BookingServiceSchema>;

export const SkissimTypeSchema = z.enum(["Select", "Premium", "Classic"]);
export type SkissimType = z.infer<typeof SkissimTypeSchema>;

export const RefundStateSchema = z.enum([
  "Refunded",
  "NotRefunded",
  "AwaitingRib",
  "AwaitingStripe",
]);
export type RefundState = z.infer<typeof RefundStateSchema>;

export const CustomerResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  akioNumber: z.number(),
});
export type CustomerResponse = z.infer<typeof CustomerResponseSchema>;

export const SupplierResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  supplierAkioNumber: z.number(),
});
export type SupplierResponse = z.infer<typeof SupplierResponseSchema>;

export const BookingResponseSchema = z.object({
  id: z.string(),
  bookingNumber: z.string(),
  salesChannel: SalesChannelSchema.nullable(),
  language: LanguageSchema.nullable(),
  seasonLabel: z.string(),
  seasonValue: z.string(),
  service: BookingServiceSchema.nullable(),
  skissim: z.boolean().nullable(),
  skissimType: SkissimTypeSchema.nullable(),
  product: z.string().nullable(),
  customer: CustomerResponseSchema,
  supplier: SupplierResponseSchema,
});
export type BookingResponse = z.infer<typeof BookingResponseSchema>;

export const ClaimDateResponseSchema = z.object({
  id: z.string(),
  dateOfReceivedClaim: z.string().nullable(),
  dateOfStartFollowUp: z.string().nullable(),
  dateLastUpdate: z.string().nullable(),
  dateOfDeparture: z.string().nullable(),
  dateEndOfFollowUp: z.string().nullable(),
  dateOfArrival: z.string().nullable(),
});
export type ClaimDateResponse = z.infer<typeof ClaimDateResponseSchema>;

export const CompensationResponseSchema = z.object({
  id: z.string(),
  customerVoucher: z.number().nullable(),
  customerUsedVoucher: z.number().nullable(),
  supplierRefund: z.number().nullable(),
  claimRefund: z.number().nullable(),
  refundState: RefundStateSchema.nullable(),
});
export type CompensationResponse = z.infer<typeof CompensationResponseSchema>;

export const ClaimResponseSchema = z.object({
  id: z.string(),
  state: ClaimStateSchema,
  followedBy: z.string().nullable(),
  reason: z.string().nullable(),
  claimSummary: z.string().nullable(),
  solution: ClaimSolutionSchema.nullable(),
  purposeOfSolution: z.string().nullable(),
  updateReason: z.string().nullable(),
  customerSuppInfo: z.string().nullable(),
  supplierSuppInfo: z.string().nullable(),
  booking: BookingResponseSchema,
  claimDate: ClaimDateResponseSchema,
  compensation: CompensationResponseSchema,
});
export type ClaimResponse = z.infer<typeof ClaimResponseSchema>;

export const PagedClaimResponseSchema = z.object({
  items: z.array(ClaimResponseSchema),
  pageNumber: z.number(),
  pageSize: z.number(),
  totalCount: z.number(),
  totalPages: z.number(),
});
export type PagedClaimResponse = z.infer<typeof PagedClaimResponseSchema>;
