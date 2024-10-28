import { create } from "zustand";

export interface ResetFormState {
  new_password: string;
  code: string;

  setNewPassword: (new_password: string) => void;
  setCode: (code: string) => void;
}

export const useRegisterStore = create<ResetFormState>()((set) => ({
  new_password: "",
  code: "",

  setNewPassword: (new_password: string) => set({ new_password }),
  setCode: (code: string) => set({ code }),
}));
