import { useQuery, UseQueryResult } from 'react-query'
import customAxios from 'utils/axiosUtil'
import { AninmalSearchListStore } from 'hooks/Animal/AnimalListStore'

export interface CenterUuidCredential {
  center_uuid: string | null
}

export function useAnimalSearch(credential: CenterUuidCredential) {
  const animalList = AninmalSearchListStore()
  const axiosData = async () => {
    try {
      const center = credential.center_uuid
      let url = `/animal/search`
      if (center !== null) {
        url += `?centerUuid=${center}`
      }
      const response = await customAxios.get(url)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  return useQuery('animalSearch', axiosData, {
    onSuccess: data => {
      if (data && data.response !== undefined) {
        console.log(data.response)
        animalList.setAnimals(data.response.animals)
        animalList.setTotal(data.response.total)
      }
    },
  })
}
