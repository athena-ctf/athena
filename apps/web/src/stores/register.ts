import { create } from "zustand";

type Team =
  | {
      kind: "join";
      team_id: string;
      invite_id: string;
    }
  | {
      kind: "create";
      team_name: string;
    };

export interface RegisterFormState {
  avatarUrl: string;
  displayName: string;
  username: string;
  password: string;
  email: string;
  team: Team;

  setAvatarUrl: (avatarUrl: string) => void;
  setDisplayName: (displayName: string) => void;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setEmail: (email: string) => void;
  setTeam: (team: Team) => void;
}

export const useRegisterStore = create<RegisterFormState>()((set) => ({
  avatarUrl: "",
  displayName: "",
  username: "",
  password: "",
  email: "",
  team: {
    kind: "create",
    team_name: "",
  },

  setAvatarUrl: (avatarUrl: string) => set({ avatarUrl }),
  setDisplayName: (displayName: string) => set({ displayName }),
  setUsername: (username: string) => set({ username }),
  setPassword: (password: string) => set({ password }),
  setEmail: (email: string) => set({ email }),
  setTeam: (team: Team) => set({ team }),
}));
