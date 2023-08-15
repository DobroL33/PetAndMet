import { useQuery } from 'react-query'
import customAxios from 'utils/axiosUtil'

interface Response {
  response: Board
}

interface Board {
  board: Detail
}

export interface Credential {
  type: string
  id: number
}

export interface Detail {
  id: number
  userUuid: string
  centerUuid: string
  title: string
  content: string
  createdAt: string
  updateAt: string
}

export function useBoardDeatil(credential?: Credential) {
  const axiosData = async (
    type: string | undefined,
    id: number | undefined
  ): Promise<Response> => {
    try {
      if (type === '' || id === 0) {
        throw new Error('에러')
      }
      const response = await customAxios.get(`/board/${type}/detail?id=${id}`)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  return useQuery('boardDetail', () =>
    axiosData(credential?.type, credential?.id)
  )
}
