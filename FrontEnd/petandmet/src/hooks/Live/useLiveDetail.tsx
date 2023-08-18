import { useQuery } from 'react-query'
import customAxios from 'utils/axiosUtil'

export function getLiveDetail(id: number) {
  const axiosData = async () => {
    try {
      const response = await customAxios.get(`/live/detail?id=${id}`)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  return useQuery('liveDetail', axiosData, {
    onSuccess: data => {
      if (data && data.response !== undefined) {
      }
    },
  })
}
