import { domain } from "../customQueryClient"
import axios from "axios"
import { create } from 'zustand'

interface CenterData{
    uuid : string,
    name : string
}

interface CenterStoreState {
  centersData: CenterData[];
  setCentersData: (centersData: CenterData[]) => void;
}

export const useCenterStore = create<CenterStoreState>((set) => ({
  centersData: [],
  setCentersData: (centersData) => set({ centersData }),
}));

const CenterDataList = async () => {
    try {
      const response = await axios.get(`${domain}/center?page=0`)
      const centersData = response.data.response.boards

      useCenterStore.getState().setCentersData(centersData)
      return centersData
    } catch (error) {
      console.log(error)
      return [];
    }
  };
  
  export default CenterDataList;