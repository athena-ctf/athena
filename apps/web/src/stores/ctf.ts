import { create } from "zustand";
import ctf from "../../ctf.json";

type CtfType = Omit<typeof ctf, "level_map" | "sponsors" | "prizes"> & {
  level_map: {
    [key: string]: {
      name: string;
      color: string;
    };
  };
  sponsors: Record<string, { name: string; logo: string }>;
  prizes: Record<string, string>;
};

export const useConfigStore = create<CtfType>()(() => ctf);
