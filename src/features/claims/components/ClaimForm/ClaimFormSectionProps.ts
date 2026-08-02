import { ClaimFormState } from "features/claims/types/claimFormState";

export interface ClaimFormSectionProps {
  form: ClaimFormState;
  onChange: <K extends keyof ClaimFormState>(field: K, value: ClaimFormState[K]) => void;
}
