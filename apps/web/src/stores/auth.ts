import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AuthState {
    is_logged_in: boolean;
    access_token: string;
    refresh_token: string;
    player?: any;

    login: (username: string, password: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, _) => ({
            is_logged_in: false,
            access_token: "",
            refresh_token: "",

            login: (username, password) => {},
            logout: () => {
                set({
                    is_logged_in: false,
                    access_token: "",
                    refresh_token: "",
                    player: undefined,
                });
            },
        }),
        {
            name: "auth-store",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
