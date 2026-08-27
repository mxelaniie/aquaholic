import { create } from "zustand";

type RiverStore = {
  river: string;
  setRiver: (river: string) => void;
};

export const useRiverStore = create<RiverStore>((set) => ({
  river: "Aare",
  setRiver: (river) => set({ river }),
}));
