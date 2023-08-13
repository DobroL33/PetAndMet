import create from "zustand";

interface UserStore {
  user_uuid: string | null;
  setUserUUID: (uuid: string | null) => void;
}

export const useUserAccess = create<UserStore>((set) => ({
  user_uuid: null,
  setUserUUID: (uuid) => set({ user_uuid: uuid }),
}));
