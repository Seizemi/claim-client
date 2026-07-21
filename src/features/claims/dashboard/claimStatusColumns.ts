import { ClaimState } from "features/claims/types/claim";

export interface ClaimStatusColumn {
  state: ClaimState;
  label: string;
  accent: "pink" | "blue";
}

export const CLAIM_STATUS_COLUMNS: ClaimStatusColumn[] = [
  { state: "AwaitingSupplier", label: "En attente fournisseur", accent: "pink" },
  { state: "AwaitingClient", label: "En attente client", accent: "pink" },
  { state: "Terminate", label: "Terminés", accent: "blue" },
  { state: "ClosedWithoutResponse", label: "Clos sans réponse", accent: "blue" },
];
