import { create } from 'zustand'

export interface CenterData {
  uuid: string
  name: string
  address: string
  phone: string
  email: string
  setUuid: (uuid: string) => void
  setName: (name: string) => void
  setAddress: (address: string) => void
  setPhone: (phone: string) => void
  setEmail: (email: string) => void
}

export const CenterDetailStore = create<CenterData>(set => ({
  uuid: '',
  name: '',
  address: '',
  phone: '',
  email: '',
  setUuid: uuid => set({ uuid }),
  setName: name => set({ name }),
  setAddress: address => set({ address }),
  setPhone: phone => set({ phone }),
  setEmail: email => set({ email }),
}))

export interface Center {
  centerData: CenterData | null
  setCenterData: (centerData: CenterData) => void
}

export const CenterStore = create<Center>(set => ({
  centerData: null,
  setCenterData: centerData => set({ centerData }),
}))
