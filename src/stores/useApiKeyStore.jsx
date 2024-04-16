import { create } from "zustand";
import { persist } from "zustand/middleware";

const useApiKeyStore = create(
  persist(
    (set) => ({
      apiKey: null,
      setApiKey: (apiKey) => set({ apiKey }),
      clearApiKey: () => set({ apiKey: null }),
    }),
    { name: "apiKey" }
  )
);

export const useApiKey = () => useApiKeyStore(state => state.apiKey);

export const useApiKeyActions = () => {
  const { setApiKey, clearApiKey } = useApiKeyStore();
  return { setApiKey, clearApiKey };
};
