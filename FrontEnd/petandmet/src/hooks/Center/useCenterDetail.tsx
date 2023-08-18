import { useQuery } from 'react-query'
import customAxios from 'utils/axiosUtil'
import { CenterStore, CenterData } from 'hooks/Center/CenterDetailStore'

interface Result {
  board: CenterData
}

interface Response {
  response: Result
}

export function useCenterDetail(center_uuid: string | undefined) {
  const centerData = CenterStore()

  const axiosData = async (): Promise<Response> => {
    try {
      const response = await customAxios.get(`/center/detail?id=${center_uuid}`)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  return useQuery<Response>('centerDetail', axiosData, {
    onSuccess: data => {
      if (data && data.response !== undefined) {
        centerData.setCenterData(data.response.board)
      }
    },
  })
}
