import type { components } from "@repo/api";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AuthState {
  is_logged_in: boolean;
  player?: components["schemas"]["PlayerModel"];

  login: (player: components["schemas"]["PlayerModel"]) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, _) => ({
      is_logged_in: false,

      login: (player: components["schemas"]["PlayerModel"]) => {
        set({ is_logged_in: true, player });
      },
      logout: () => {
        set({
          is_logged_in: false,
          player: undefined,
        });
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
