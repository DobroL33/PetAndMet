import { useQuery } from 'react-query'
import customAxios from 'utils/axiosUtil'
import { LiveListSearchStore } from './LiveSearchStore'

export function useCenterLiveList(credential: string | undefined) {
  const liveListSearch = LiveListSearchStore()
  const axiosData = async () => {
    try {
      const centerUuid = credential
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
