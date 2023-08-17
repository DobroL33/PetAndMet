import create from "zustand";

interface StoreState {
  animalUuid: string | null;
  centerUuid: string | null;
  setAnimalUuid: (uuid: string | null) => void;
  setCenterUuid: (uuid: string | null) => void;
}

export const useStore = create<StoreState>((set) => ({
  animalUuid: null,
  centerUuid: null,
  setAnimalUuid: (uuid) => set(() => ({ animalUuid: uuid })),
  setCenterUuid: (uuid) => set(() => ({ centerUuid: uuid })),
}));
