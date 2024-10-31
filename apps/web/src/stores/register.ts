import { create } from "zustand";

type Team =
  | {
      kind: "join";
      teamName: string;
      inviteId: string;
    }
  | {
      kind: "create";
      teamName: string;
    };

export interface RegisterFormState {
  displayName: string;
  username: string;
  password: string;
  email: string;
  team: Team;

  setDisplayName: (displayName: string) => void;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setEmail: (email: string) => void;
  setTeam: (team: Team) => void;
}

export const useRegisterStore = create<RegisterFormState>()((set) => ({
  displayName: "",
  username: "",
  password: "",
  email: "",
  team: {
    kind: "create",
    teamName: "",
  },
  token: "",

  setDisplayName: (displayName: string) => set({ displayName: displayName }),
  setUsername: (username: string) => set({ username }),
  setPassword: (password: string) => set({ password }),
  setEmail: (email: string) => set({ email }),
  setTeam: (team: Team) => set({ team }),
}));
