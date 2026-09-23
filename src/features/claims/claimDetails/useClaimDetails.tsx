import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { z } from "zod";
import { useApi } from "shared/hooks/useApi";
import { apiBaseUrl } from "shared/services/httpClient";
import { ClaimResponseSchema, LockAcquireResponseSchema } from "features/claims/types/claim";
import { ClaimFormState } from "features/claims/types/claimFormState";
import { buildClaimRequest } from "features/claims/utils/buildClaimRequest";
import { validateClaimForm } from "features/claims/utils/validateClaimForm";
import { mapClaimResponseToFormState } from "features/claims/utils/mapClaimResponseToFormState";
import { CURRENT_USER_ID, CURRENT_USER_NAME } from "features/claims/currentUser";

const claimDetailsRoute = (id: string) => `/api/v1.0/Claim/claim-details/${id}/information`;
const claimLockRoute = (id: string) => `/api/v1.0/Claim/claim-details/${id}/lock`;
const claimUnlockRoute = (id: string) => `/api/v1.0/Claim/claim-details/${id}/unlock`;

// The update/unlock endpoints return 200 OK with no JSON body; accept whatever
// empty shape axios hands back and normalize it so useApi's schema.parse succeeds.
const EmptyResponseSchema = z.union([z.undefined(), z.null(), z.literal("")]).transform(() => undefined);

export const useClaimDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<ClaimFormState | null>(null);
  const [originalForm, setOriginalForm] = useState<ClaimFormState | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const isEditingRef = useRef(false);
  useEffect(() => {
    isEditingRef.current = isEditing;
  }, [isEditing]);

  const { isLoading: isFetching, error: fetchError, request: fetchClaim } = useApi(ClaimResponseSchema);
  const { isLoading: isSubmitting, request: updateClaim } = useApi(EmptyResponseSchema, {
    onError: (err) => {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        toast.error("Réclamation bloquée par un autre utilisateur, vos modifications n'ont pas été enregistrées.");
        return true;
      }
      return false;
    },
  });
  const { isLoading: isLocking, request: lockRequest } = useApi(LockAcquireResponseSchema);
  const { request: unlockRequest } = useApi(EmptyResponseSchema);

  useEffect(() => {
    if (!id) {
      return;
    }
    setForm(null);
    setOriginalForm(null);
    setIsEditing(false);
    fetchClaim({ method: "GET", url: claimDetailsRoute(id) }).then((claim) => {
      if (claim) {
        const mapped = mapClaimResponseToFormState(claim);
        setForm(mapped);
        setOriginalForm(mapped);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Releases the lock via a beacon when the user leaves without submitting or
  // cancelling: covers both React-router unmount (nav away, id change) and
  // pagehide (tab close/refresh), since unmount alone isn't reliable there.
  useEffect(() => {
    const releaseLockBeacon = () => {
      if (isEditingRef.current && id) {
        const body = new Blob([JSON.stringify({ userId: CURRENT_USER_ID })], { type: "application/json" });
        navigator.sendBeacon(`${apiBaseUrl}${claimUnlockRoute(id)}`, body);
      }
    };
    window.addEventListener("pagehide", releaseLockBeacon);
    return () => {
      window.removeEventListener("pagehide", releaseLockBeacon);
      releaseLockBeacon();
    };
  }, [id]);

  const onChange = <K extends keyof ClaimFormState>(field: K, value: ClaimFormState[K]) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const startEditing = async () => {
    if (!id) {
      return;
    }
    const result = await lockRequest({
      method: "POST",
      url: claimLockRoute(id),
      data: { userId: CURRENT_USER_ID, userName: CURRENT_USER_NAME },
    });
    if (!result) {
      return;
    }
    if (!result.acquired || !result.claim) {
      const lockedBy = result.lockedByUserName ? ` par ${result.lockedByUserName}` : "";
      toast.error(`Réclamation bloquée${lockedBy}.`);
      return;
    }

    const mapped = mapClaimResponseToFormState(result.claim);
    setForm(mapped);
    setOriginalForm(mapped);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    if (!id) {
      return;
    }
    setForm(originalForm);
    setIsEditing(false);
    unlockRequest({ method: "POST", url: claimUnlockRoute(id), data: { userId: CURRENT_USER_ID } });
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
      setIsEditing(false);
      toast.success("Réclamation mise à jour avec succès.");
      await unlockRequest({ method: "POST", url: claimUnlockRoute(id), data: { userId: CURRENT_USER_ID } });
      navigate("/");
    }
  };

  return {
    form,
    isLoading: isFetching,
    isSubmitting,
    isEditing,
    isLocking,
    error: fetchError,
    onChange,
    submit,
    startEditing,
    cancelEditing,
  };
};
