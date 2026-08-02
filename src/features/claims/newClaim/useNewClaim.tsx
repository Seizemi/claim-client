import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { useApi } from "shared/hooks/useApi";
import { useLookupsStore } from "features/claims/lookups/useLookupsStore";
import { buildClaimRequest } from "features/claims/utils/buildClaimRequest";
import { validateClaimForm } from "features/claims/utils/validateClaimForm";
import { EMPTY_CLAIM_FORM_STATE, ClaimFormState } from "features/claims/types/claimFormState";

const NEW_CLAIM_ROUTE = "/api/v1.0/Claim/new-claim/claim";

export const useNewClaim = () => {
  const [form, setForm] = useState<ClaimFormState>(EMPTY_CLAIM_FORM_STATE);
  const { isLoading, request } = useApi(z.string());
  const navigate = useNavigate();
  const lookups = useLookupsStore((state) => state.data);

  useEffect(() => {
    const noneSkissimType = lookups?.skissimTypes.find((option) => option.value === "None");
    if (!noneSkissimType) {
      return;
    }
    setForm((prev) => (prev.skissimType === "" ? { ...prev, skissimType: noneSkissimType.id } : prev));
  }, [lookups]);

  const onChange = <K extends keyof ClaimFormState>(field: K, value: ClaimFormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submit = async () => {
    const errors = validateClaimForm(form);
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
