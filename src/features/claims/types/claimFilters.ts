export interface ClaimColumnFilters {
  customerName: string;
  bookingNumber: string;
  customerAkioNumber: string;
  supplierAkioNumber: string;
}

export const EMPTY_CLAIM_COLUMN_FILTERS: ClaimColumnFilters = {
  customerName: "",
  bookingNumber: "",
  customerAkioNumber: "",
  supplierAkioNumber: "",
};
