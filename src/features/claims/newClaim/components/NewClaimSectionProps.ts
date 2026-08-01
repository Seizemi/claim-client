import { NewClaimFormState } from "features/claims/newClaim/newClaimFormState";

export interface NewClaimSectionProps {
  form: NewClaimFormState;
  onChange: <K extends keyof NewClaimFormState>(field: K, value: NewClaimFormState[K]) => void;
}
