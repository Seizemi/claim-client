import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { useApi } from "shared/hooks/useApi";
import { buildClaimRequest } from "features/claims/newClaim/buildClaimRequest";
import { validateNewClaim } from "features/claims/newClaim/validateNewClaim";
import { EMPTY_NEW_CLAIM_FORM_STATE, NewClaimFormState } from "features/claims/newClaim/newClaimFormState";

const NEW_CLAIM_ROUTE = "/api/v1.0/Claim/new-claim/claim";

export const useNewClaim = () => {
  const [form, setForm] = useState<NewClaimFormState>(EMPTY_NEW_CLAIM_FORM_STATE);
  const { isLoading, request } = useApi(z.string());
  const navigate = useNavigate();

  const onChange = <K extends keyof NewClaimFormState>(field: K, value: NewClaimFormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submit = async () => {
    const errors = validateNewClaim(form);
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return;
    }

    const result = await request({
      method: "POST",
      url: NEW_CLAIM_ROUTE,
      data: buildClaimRequest(form),
    });

    if (result) {
      toast.success("Réclamation créée avec succès.");
      navigate("/");
    }
  };

  return { form, onChange, submit, isLoading };
};
