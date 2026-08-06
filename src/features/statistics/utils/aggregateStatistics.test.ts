import { aggregateStatistics } from "features/statistics/utils/aggregateStatistics";
import { ClaimResponse, ClaimState, LookupResponse } from "features/claims/types/claim";

const lookup = (label: string): LookupResponse => ({ id: label, label, value: label });

interface ClaimOverrides {
  state?: ClaimState;
  language?: string;
  skissimLabel?: string;
  solutionLabel?: string;
  dateOfReceivedClaim?: string | null;
  customerVoucher?: number | null;
  customerUsedVoucher?: number | null;
  supplierRefund?: number | null;
  claimRefund?: number | null;
}

const buildClaim = (overrides: ClaimOverrides = {}): ClaimResponse => ({
  id: "claim-1",
  state: overrides.state ?? "AwaitingSupplier",
  followedBy: null,
  reason: lookup("Reason"),
  claimSummary: null,
  solution: lookup(overrides.solutionLabel ?? "Avoir"),
  purposeOfSolution: null,
  updateReason: null,
  customerSuppInfo: null,
  supplierSuppInfo: null,
  booking: {
    id: "booking-1",
    bookingNumber: "B-1",
    salesChannel: { id: "sc-1", label: "Direct", value: "direct", language: overrides.language ?? "Fr" },
    seasonLabel: null,
    seasonValue: null,
    skissimType: lookup(overrides.skissimLabel ?? "Skissim Premium"),
    product: null,
    customer: { id: "cust-1", name: "Customer", akioNumber: 1 },
    supplier: { id: "sup-1", label: "Supplier", value: "supplier", supplierAkioNumber: 1, service: lookup("Service") },
  },
  claimDate: {
    id: "date-1",
    dateOfReceivedClaim: overrides.dateOfReceivedClaim === undefined ? "2024-10-01" : overrides.dateOfReceivedClaim,
    dateOfStartFollowUp: null,
    dateLastUpdate: null,
    dateOfDeparture: null,
    dateEndOfFollowUp: null,
    dateOfArrival: null,
  },
  compensation: {
    id: "comp-1",
    customerVoucher: overrides.customerVoucher ?? null,
    customerUsedVoucher: overrides.customerUsedVoucher ?? null,
    supplierRefund: overrides.supplierRefund ?? null,
    claimRefund: overrides.claimRefund ?? null,
    refundState: lookup("Refund state"),
    compensationReason: lookup("Compensation reason"),
  },
});

test("returns empty breakdowns for an empty claim list", () => {
  const stats = aggregateStatistics([]);

  expect(stats.weeklyLanguageCounts).toEqual([]);
  expect(stats.statusBreakdown).toEqual(
    expect.arrayContaining([expect.objectContaining({ label: "En attente fournisseur", value: 0 })])
  );
  expect(stats.skissimBreakdown).toEqual([]);
  expect(stats.solutionBreakdown).toEqual([]);
  expect(stats.refundBreakdown.customerVoucher.value).toBe(0);
});

test("buckets weekly claim counts by language and totals them", () => {
  const claims = [
    buildClaim({ language: "Fr", dateOfReceivedClaim: "2024-10-01" }), // ISO week 40
    buildClaim({ language: "Fr", dateOfReceivedClaim: "2024-10-02" }), // same ISO week 40
    buildClaim({ language: "Nl", dateOfReceivedClaim: "2024-10-01" }),
    buildClaim({ language: "En", dateOfReceivedClaim: "2025-01-06" }), // ISO week 2, next year
  ];

  const { weeklyLanguageCounts } = aggregateStatistics(claims);

  expect(weeklyLanguageCounts).toEqual([
    { week: "S40", Fr: 2, Nl: 1, En: 0, total: 3 },
    { week: "S2", Fr: 0, Nl: 0, En: 1, total: 1 },
  ]);
});

test("ignores claims with a null received date or an unrecognized language when bucketing weeks", () => {
  const claims = [buildClaim({ dateOfReceivedClaim: null }), buildClaim({ language: "De" })];

  expect(aggregateStatistics(claims).weeklyLanguageCounts).toEqual([]);
});

test("counts status breakdown across all four known states, including zero-count ones", () => {
  const claims = [buildClaim({ state: "AwaitingSupplier" }), buildClaim({ state: "AwaitingSupplier" })];

  const { statusBreakdown } = aggregateStatistics(claims);

  expect(statusBreakdown).toEqual([
    { label: "En attente fournisseur", value: 2, color: expect.any(String) },
    { label: "En attente client", value: 0, color: expect.any(String) },
    { label: "Terminés", value: 0, color: expect.any(String) },
    { label: "Clos sans réponse", value: 0, color: expect.any(String) },
  ]);
});

test("groups skissim and solution breakdowns by whatever labels are present in the data", () => {
  const claims = [
    buildClaim({ skissimLabel: "Skissim Select", solutionLabel: "Avoir" }),
    buildClaim({ skissimLabel: "Skissim Select", solutionLabel: "Remboursement" }),
    buildClaim({ skissimLabel: "Autres", solutionLabel: "Avoir" }),
  ];

  const { skissimBreakdown, solutionBreakdown } = aggregateStatistics(claims);

  expect(skissimBreakdown).toEqual(
    expect.arrayContaining([
      { label: "Skissim Select", value: 2, color: expect.any(String) },
      { label: "Autres", value: 1, color: expect.any(String) },
    ])
  );
  expect(solutionBreakdown).toEqual(
    expect.arrayContaining([
      { label: "Avoir", value: 2, color: expect.any(String) },
      { label: "Remboursement", value: 1, color: expect.any(String) },
    ])
  );
});

test("sums refund fields across claims, treating null as 0", () => {
  const claims = [
    buildClaim({ customerVoucher: 100, supplierRefund: 50, claimRefund: null }),
    buildClaim({ customerVoucher: null, supplierRefund: 25, claimRefund: 10, customerUsedVoucher: 5 }),
  ];

  const { refundBreakdown } = aggregateStatistics(claims);

  expect(refundBreakdown.customerVoucher.value).toBe(100);
  expect(refundBreakdown.customerUsedVoucher.value).toBe(5);
  expect(refundBreakdown.supplierRefund.value).toBe(75);
  expect(refundBreakdown.claimRefund.value).toBe(10);
});
