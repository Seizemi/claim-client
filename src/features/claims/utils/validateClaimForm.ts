import { ClaimFormState } from "features/claims/types/claimFormState";

export const validateClaimForm = (form: ClaimFormState): string[] => {
  const errors: string[] = [];

  if (form.bookingNumber.trim() === "") {
    errors.push("Le n° du dossier est requis.");
  }
  if (form.customerName.trim() === "") {
    errors.push("Le nom du client est requis.");
  }
  if (form.supplierName.trim() === "") {
    errors.push("Le nom du fournisseur est requis.");
  }
  if (form.state === "") {
    errors.push("L'état est requis.");
  }
  if (form.salesChannel === "") {
    errors.push("Le canal de vente est requis.");
  }
  if (form.reason === "") {
    errors.push("La raison est requise.");
  }
  if (form.solution === "") {
    errors.push("La solution est requise.");
  }
  if (form.skissimType === "") {
    errors.push("Le type Skissim est requis.");
  }
  if (form.service === "") {
    errors.push("La prestation est requise.");
  }
  if (form.refundState === "") {
    errors.push("Le remboursement versé est requis.");
  }
  if (form.compensationReason === "") {
    errors.push("La raison de dédommagement est requise.");
  }
  if (form.dateOfArrival.trim() === "") {
    errors.push("La date d'arrivée du client est requise.");
  }
  if (form.dateOfDeparture !== "" && form.dateOfArrival !== "" && form.dateOfDeparture < form.dateOfArrival) {
    errors.push("La date de départ doit être postérieure ou égale à la date d'arrivée.");
  }

  return errors;
};
