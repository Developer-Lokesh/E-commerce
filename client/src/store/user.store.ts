import type { IUser } from "@/types/types";
import { create } from "zustand";

interface IUserStore {
  user: IUser | null;
  setUser: (user: IUser) => void;
}

const useUserStore = create<IUserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useUserStore;