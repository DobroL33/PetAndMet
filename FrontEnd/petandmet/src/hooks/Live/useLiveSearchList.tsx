import { useQuery } from 'react-query'
import customAxios from 'utils/axiosUtil'
import { LiveListSearchStore } from './LiveSearchStore'

export interface CenterUuidCredential {
  center_uuid: string | null
}

export function useCenterLiveList(credential: CenterUuidCredential) {
  const liveListSearch = LiveListSearchStore()
  const axiosData = async () => {
    try {
      const centerUuid = credential.center_uuid
      const response = await customAxios.get(`/live/search?uuid=${centerUuid}`)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  return useQuery('centerLiveList', axiosData, {
    onSuccess: data => {
      if (data && data.response !== undefined) {
        console.log(data.response)
        liveListSearch.setLives(data.response.lives)
        liveListSearch.setTotalCount(data.response.total_count)
      }
    },
  })
}
