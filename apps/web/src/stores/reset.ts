import { create } from "zustand";

export interface ResetFormState {
  email: string;
  token: string;

  setEmail: (email: string) => void;
  setToken: (token: string) => void;
}

export const useResetStore = create<ResetFormState>()((set) => ({
  email: "",
  token: "",

  setEmail: (email: string) => set({ email }),
  setToken: (token: string) => set({ token }),
}));
