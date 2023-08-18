import { useQuery, UseQueryResult } from 'react-query'
import customAxios from 'utils/axiosUtil'
import {
  AninmalSearchListStore,
  AnimalSearchStore,
  Animal,
} from 'hooks/Animal/AnimalListStore'

export interface CenterUuidCredential {
  center_uuid: string | undefined
  adoptionStatus: string | undefined
  size: number | undefined
}

export function useAnimalSearch(credential: CenterUuidCredential) {
  const animalList = AninmalSearchListStore()
  const axiosData = async () => {
    try {
      const center = credential.center_uuid
      const adoptionStatus = credential.adoptionStatus
      const size = credential.size
      let url = `/animal/search`
      if (center !== undefined) {
        url += `?centerUuid=${center}`
      }
      if (adoptionStatus !== undefined) {
        url += `?adoptionStatus=${adoptionStatus}`
      }
      if (size !== undefined) {
        url += `&size=${size}`
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
        animalList.setAnimals(data.response.animals)
        animalList.setTotal(data.response.total)
      }
    },
  })
}

interface Result {
  response: Animal
}

export function useAnimalDetail(uuid: string) {
  const animal = AnimalSearchStore()
  const axiosData = async (): Promise<Result> => {
    try {
      const response = await customAxios.get(`/animal/detail?uuid=${uuid}`)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  return useQuery<Result>('animalDetail', axiosData, {
    onSuccess: data => {
      if (data && data.response !== undefined) {
        animal.setAge(data.response.age)
        animal.setAdoptionStatus(data.response.adoptionStatus)
        animal.setAnimalPhotoUrl(data.response.animal_photo_url)
        animal.setAoptionStartDate(data.response.adoptionStartDate)
        animal.setBreed(data.response.breed)
        animal.setCenterUuid(data.response.centerUuid)
        animal.setCharacter(data.response.character)
        animal.setEnterAge(data.response.enterAge)
        animal.setEnteredDate(data.response.enteredDate)
        animal.setFindPlace(data.response.findPlace)
        animal.setGender(data.response.gender)
        animal.setName(data.response.name)
        animal.setUuid(data.response.uuid)
        animal.setSpecie(data.response.specie)
        animal.setNoticeData(data.response.noticeData)
      }
    },
  })
}
