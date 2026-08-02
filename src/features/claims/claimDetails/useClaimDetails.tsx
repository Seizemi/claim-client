import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { useApi } from "shared/hooks/useApi";
import { ClaimResponseSchema } from "features/claims/types/claim";
import { ClaimFormState } from "features/claims/types/claimFormState";
import { buildClaimRequest } from "features/claims/utils/buildClaimRequest";
import { validateClaimForm } from "features/claims/utils/validateClaimForm";
import { mapClaimResponseToFormState } from "features/claims/utils/mapClaimResponseToFormState";

const claimDetailsRoute = (id: string) => `/api/v1.0/Claim/claim-details/${id}/information`;

// The update endpoint returns 200 OK with no JSON body; accept whatever empty
// shape axios hands back and normalize it so useApi's schema.parse succeeds.
const EmptyResponseSchema = z.union([z.undefined(), z.null(), z.literal("")]).transform(() => undefined);

export const useClaimDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<ClaimFormState | null>(null);

  const { isLoading: isFetching, error: fetchError, request: fetchClaim } = useApi(ClaimResponseSchema);
  const { isLoading: isSubmitting, request: updateClaim } = useApi(EmptyResponseSchema);

  useEffect(() => {
    if (!id) {
      return;
    }
    fetchClaim({ method: "GET", url: claimDetailsRoute(id) }).then((claim) => {
      if (claim) {
        setForm(mapClaimResponseToFormState(claim));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onChange = <K extends keyof ClaimFormState>(field: K, value: ClaimFormState[K]) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const submit = async () => {
    if (!form || !id) {
      return;
    }

    const errors = validateClaimForm(form);
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return;
    }

    let succeeded = false;
    await updateClaim({
      method: "PUT",
      url: claimDetailsRoute(id),
      data: buildClaimRequest(form),
    }).then((result) => {
      succeeded = result !== null;
    });

    if (succeeded) {
      toast.success("Réclamation mise à jour avec succès.");
      navigate("/");
    }
  };

  return { form, isLoading: isFetching, isSubmitting, error: fetchError, onChange, submit };
};
