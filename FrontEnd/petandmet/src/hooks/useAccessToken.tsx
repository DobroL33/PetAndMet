import { create } from 'zustand'

interface AccessTokenState {
  accessToken: string | unknown
  setAccessToken: (accessToken: string | unknown) => void
}

export const useAccessToken = create<AccessTokenState>(set => ({
  accessToken: '',
  setAccessToken: accessToken => set({ accessToken }),
}))
