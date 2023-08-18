import { domain } from 'hooks/customQueryClient'
import axios from 'axios'
import { create } from 'zustand'
import customAxios from 'utils/axiosUtil'
interface CenterData {
  uuid: string
  name: string
}

interface CenterStoreState {
  centersData: CenterData[]
  setCentersData: (centersData: CenterData[]) => void
  getCentersData: () => Promise<void>
  setAllCenter: (center: CenterData) => void
}

export const useCenterStore = create<CenterStoreState>(set => ({
  centersData: [],
  setCentersData: centersData => set({ centersData }),
  getCentersData: async () => {
    // 수정: getCenterData 메서드 구현
    try {
      const response = await axios.get(`${domain}/center?page=0`)
      const centerData = response.data.response.boards
      set({ centersData: centerData }) // 수정: centersData만 업데이트
      // console.log(centerData);
    } catch (error) {
      console.log(error)
    }
  },
  setAllCenter: (center: CenterData) =>
    set(state => {
      if (
        state.centersData.length === 0 ||
        state.centersData[0].name === '전체'
      ) {
        return state // 이미 '전체'가 0번째에 있는 경우 무시
      }

      return {
        centersData: [
          center,
          ...state.centersData.slice(0, 1),
          ...state.centersData.slice(1),
        ],
      }
    }),
}))

const CenterDataList = async () => {
  try {
    const response = await axios.get(`${domain}/center?page=0`)
    const centersData = response.data.response.boards
    useCenterStore.getState().setCentersData(centersData)
    console.log(centersData)
    return centersData
  } catch (error) {
    console.log(error)
    return []
  }
}

interface Center{
  uuid : string | null,
  name: string | null,
  address : string | null,
  email : string | null,
  phone : string | null,
}
export const CenterUpdate =async (params:Center, accessToken : string| unknown) => {
  try {
    const response = await customAxios.patch(`/center`, params, 
    {
      headers: {
          Authorization : `${accessToken}`
      }
    }
    )
    console.log('수정 완료', response) 
  } catch (error) {
      console.error('Error updating center:', error);
      console.log('수정 에러')
  }
};


export default CenterDataList
