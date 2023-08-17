import create from "zustand";

interface CenterData {
  uuid: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

export type State = {
  centerData: CenterData | null;
  setCenterData: (data: CenterData) => void;
};

export const useCenterStore = create<State>((set) => ({
  centerData: null,
  setCenterData: (data) => set({ centerData: data }),
}));
