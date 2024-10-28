import { create } from "zustand";

export interface RegisterFormState {
  display_name: string;
  username: string;
  password: string;
  email: string;
  team_choice_kind: "join" | "create";
  teamname: string;
  inviteCode: string;
  code: string;

  setDisplayName: (displayName: string) => void;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setEmail: (email: string) => void;
  setTeamChoiceKind: (teamChoiceKind: "join" | "create") => void;
  setTeamname: (teamname: string) => void;
  setInviteCode: (inviteCode: string) => void;
  setCode: (code: string) => void;
}

export const useRegisterStore = create<RegisterFormState>()((set) => ({
  display_name: "",
  username: "",
  password: "",
  email: "",
  team_choice_kind: "join",
  teamname: "",
  inviteCode: "",
  code: "",

  setDisplayName: (displayName: string) => set({ display_name: displayName }),
  setUsername: (username: string) => set({ username }),
  setPassword: (password: string) => set({ password }),
  setEmail: (email: string) => set({ email }),
  setTeamChoiceKind: (teamChoiceKind: "join" | "create") =>
    set({ team_choice_kind: teamChoiceKind }),
  setTeamname: (teamname: string) => set({ teamname }),
  setInviteCode: (inviteCode: string) => set({ inviteCode }),
  setCode: (code: string) => set({ code }),
}));
