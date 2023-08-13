import create from "zustand";

interface UserAccess {
  user_uuid: string | null;
  user_token: string | null;
  setUserUUID: (uuid: string | null) => void;
  setUserToken: (token: string | null) => void;
}

export const useUserAccess = create<UserAccess>((set) => ({
  user_uuid: null,
  user_token: null,
  setUserUUID: (uuid) => set({ user_uuid: uuid }),
  setUserToken: (token) => set({ user_token: token }),
}));
