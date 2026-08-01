import { create } from "zustand";
import { toast } from "react-toastify";
import { httpClient } from "shared/services/httpClient";
import { LookupsResponse, LookupsResponseSchema } from "features/claims/types/claim";

const LOOKUPS_ROUTE = "/api/v1.0/Lookups";

interface LookupsState {
  data: LookupsResponse | null;
  status: "idle" | "loading" | "loaded" | "error";
  fetchLookups: () => Promise<void>;
}

export const useLookupsStore = create<LookupsState>((set, get) => ({
  data: null,
  status: "idle",
  fetchLookups: async () => {
    if (get().status === "loading" || get().status === "loaded") {
      return;
    }
    set({ status: "loading" });

    try {
      const response = await httpClient.get(LOOKUPS_ROUTE);
      const data = LookupsResponseSchema.parse(response.data);
      set({ data, status: "loaded" });
    } catch (err) {
      toast.error("Impossible de charger les listes de choix.");
      set({ status: "error" });
    }
  },
}));
