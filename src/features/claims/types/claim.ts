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

export const LanguageSchema = z.enum(["Fr", "En", "Nl"]);
export type Language = z.infer<typeof LanguageSchema>;

// Mirrors ClaimApi's lookup entities (Reason/Solution/FollowedBy/RefundState/
// CompensationReason/Service/SkissimType) — DB-backed, serialized as { id, label, value }.
export const LookupResponseSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string(),
});
export type LookupResponse = z.infer<typeof LookupResponseSchema>;

export const SalesChannelResponseSchema = LookupResponseSchema.extend({
  language: z.string(),
});
export type SalesChannelResponse = z.infer<typeof SalesChannelResponseSchema>;

export const CustomerResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  akioNumber: z.number(),
});
export type CustomerResponse = z.infer<typeof CustomerResponseSchema>;

export const SupplierResponseSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string(),
  supplierAkioNumber: z.number(),
  service: LookupResponseSchema,
});
export type SupplierResponse = z.infer<typeof SupplierResponseSchema>;

export const BookingResponseSchema = z.object({
  id: z.string(),
  bookingNumber: z.string(),
  salesChannel: SalesChannelResponseSchema,
  language: LanguageSchema.nullable(),
  seasonLabel: z.string().nullable(),
  seasonValue: z.string().nullable(),
  skissimType: LookupResponseSchema,
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
  refundState: LookupResponseSchema,
  compensationReason: LookupResponseSchema,
});
export type CompensationResponse = z.infer<typeof CompensationResponseSchema>;

export const ClaimResponseSchema = z.object({
  id: z.string(),
  state: ClaimStateSchema,
  followedBy: LookupResponseSchema.nullable(),
  reason: LookupResponseSchema,
  claimSummary: z.string().nullable(),
  solution: LookupResponseSchema,
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

// Mirrors ClaimApi's GetLookups response — fetched once at startup and kept in
// memory to feed multiple-choice fields in create/update claim.
export const LookupsResponseSchema = z.object({
  reasons: z.array(LookupResponseSchema),
  solutions: z.array(LookupResponseSchema),
  followedBies: z.array(LookupResponseSchema),
  refundStates: z.array(LookupResponseSchema),
  compensationReasons: z.array(LookupResponseSchema),
  salesChannels: z.array(SalesChannelResponseSchema),
  services: z.array(LookupResponseSchema),
  suppliers: z.array(SupplierResponseSchema),
  skissimTypes: z.array(LookupResponseSchema),
});
export type LookupsResponse = z.infer<typeof LookupsResponseSchema>;
