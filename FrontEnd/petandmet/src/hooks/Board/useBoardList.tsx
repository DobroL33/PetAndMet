import { useQuery } from 'react-query'
import customAxios from 'utils/axiosUtil'

export interface Credential {
  center_uuid: string
  type: string
  page: number
  size: number
}

interface Board {
  boards: Detail[]
  total: number
}

export interface Detail {
  id: number
  user_uuid: string
  center_uuid: string
  user_name: string
  center_name: string
  title: string
  content: string
  created_at: string
  update_at: string
}

export function useBoardList(credential: Credential) {
  const axiosData = async (): Promise<Board> => {
    try {
      const type = credential.type
      const center = credential.center_uuid
      const page = credential.page
      const size = credential.size
      let url = `/board/${type}`
      if (page !== 0) {
        url += `?page=${page}`
      } else {
        url += '?page=0'
      }
      if (size !== 0) {
        url += `&size=${size}`
      }
      if (center !== '') {
        url += `&center_uuid=${center}`
      }
      const response = await customAxios.get(url)
      return response.data.response
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  return useQuery('boardList', axiosData)
}
