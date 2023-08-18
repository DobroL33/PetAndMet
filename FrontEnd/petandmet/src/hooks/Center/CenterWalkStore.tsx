import { create } from 'zustand'

export interface WalkDetail {
  animal_uuid: string
  center_uuid: string
  date: string
  status: string
  time: number
  user_uuid: string
  walk_id: number
  setAnimalUuid: (animal_uuid: string) => void
  setCenterUuid: (center_uuid: string) => void
  setDate: (date: string) => void
  setStatus: (status: string) => void
  setTime: (time: number) => void
  setUserUuid: (user_uuid: string) => void
  setWalkId: (walk_id: number) => void
}

export const WalkDetailStore = create<WalkDetail>(set => ({
  animal_uuid: '',
  center_uuid: '',
  date: '',
  status: '',
  time: 0,
  user_uuid: '',
  walk_id: 0,
  setAnimalUuid: animal_uuid => set({ animal_uuid }),
  setCenterUuid: center_uuid => set({ center_uuid }),
  setDate: date => set({ date }),
  setStatus: status => set({ status }),
  setTime: time => set({ time }),
  setUserUuid: user_uuid => set({ user_uuid }),
  setWalkId: walk_id => set({ walk_id }),
}))

export interface Walk {
  walk_times: WalkDetail[]
  total: number
  setWalkTimes: (walk_times: WalkDetail[]) => void
  setTotal: (total: number) => void
}

export const WalkStore = create<Walk>(set => ({
  walk_times: [],
  total: 0,
  setWalkTimes: walk_times => set({ walk_times }),
  setTotal: total => set({ total }),
}))
