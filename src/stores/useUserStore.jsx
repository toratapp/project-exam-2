import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user: user }),
      clearUser: () => set({ user: null }),
    }),
    { name: "user" }
  )
);

export const useUser = () => useUserStore((state) => state.user);
export const useToken = () => useUserStore((state) => state.user?.data.accessToken);
export const useUserName = () => useUserStore((state) => state.user?.data.name);

export const useUserActions = () => {
  const { setUser, clearUser } = useUserStore();
  return { setUser, clearUser };
};
