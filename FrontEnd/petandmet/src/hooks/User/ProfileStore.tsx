import { create } from 'zustand'

export interface Profile {
  attendance: number
  setAttendance: (attendance: number) => void
  name: string
  setName: (name: string) => void
  email: string
  setEmail: (email: string) => void
  phone_number: string
  setPhone: (phone_number: string) => void
  donate_grade: string
  setDonate_grade: (donate_grade: string) => void
  walk_grade: string
  setWalk_grade: (walk_grade: string) => void
}

export const useProfile = create<Profile>(set => ({
  attendance: 0,
  setAttendance: attendance => set({ attendance }),
  name: '',
  setName: name => set({ name }),
  email: '',
  setEmail: email => set({ email }),
  phone_number: '',
  setPhone: phone_number => set({ phone_number }),
  donate_grade: '',
  setDonate_grade: donate_grade => set({ donate_grade }),
  walk_grade: '',
  setWalk_grade: walk_grade => set({ walk_grade }),
}))
