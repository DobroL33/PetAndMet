import { create } from 'zustand'

export interface AnimalSearchList {
  animals: AnimalDetail[]
  total: number
  setAnimals: (animals: AnimalDetail[]) => void
  setTotal: (total: number) => void
}

export interface AnimalDetail {
  adoptionStartDate: string
  adoptionStatus: string
  age: number
  breed: string
  centerUuid: string
  character: string
  enterAge: number
  enteredDate: string
  findPlace: string
  gender: string
  name: string
  noticeData: string
  specie: string
  animal_photo_url: string
  uuid: string
  setAoptionStartDate: (adoptionStartDate: string) => void
  setAdoptionStatus: (adoptionStatus: string) => void
  setAge: (age: number) => void
  setBreed: (breed: string) => void
  setCenterUuid: (centerUuid: string) => void
  setCharacter: (character: string) => void
  setEnterAge: (enterAge: number) => void
  setEnteredDate: (enteredDate: string) => void
  setFindPlace: (findPlace: string) => void
  setGender: (gender: string) => void
  setName: (name: string) => void
  setNoticeData: (noticeData: string) => void
  setSpecie: (specie: string) => void
  setAnimalPhotoUrl: (animal_Photo_url: string) => void
  setUuid: (uuid: string) => void
}

export interface Animal {
  adoptionStartDate: string
  adoptionStatus: string
  age: number
  breed: string
  centerUuid: string
  character: string
  enterAge: number
  enteredDate: string
  findPlace: string
  gender: string
  name: string
  noticeData: string
  specie: string
  animal_photo_url: string
  uuid: string
}

export const AninmalSearchListStore = create<AnimalSearchList>(set => ({
  animals: [],
  total: 0,
  setAnimals: animals => set({ animals }),
  setTotal: total => set({ total }),
}))

export const AnimalSearchStore = create<AnimalDetail>(set => ({
  adoptionStartDate: '',
  adoptionStatus: '',
  age: 0,
  breed: '',
  centerUuid: '',
  character: '',
  enterAge: 0,
  enteredDate: '',
  findPlace: '',
  gender: '',
  name: '',
  noticeData: '',
  specie: '',
  animal_photo_url: '',
  uuid: '',
  setAoptionStartDate: adoptionStartDate => set({ adoptionStartDate }),
  setAdoptionStatus: adoptionStatus => set({ adoptionStatus }),
  setAge: age => set({ age }),
  setBreed: breed => set({ breed }),
  setCenterUuid: centerUuid => set({ centerUuid }),
  setCharacter: character => set({ character }),
  setEnterAge: enterAge => set({ enterAge }),
  setEnteredDate: enteredDate => set({ enteredDate }),
  setFindPlace: findPlace => set({ findPlace }),
  setGender: gender => set({ gender }),
  setName: name => set({ name }),
  setNoticeData: noticeData => set({ noticeData }),
  setSpecie: specie => set({ specie }),
  setAnimalPhotoUrl: animal_photo_url => set({ animal_photo_url }),
  setUuid: uuid => set({ uuid }),
}))
