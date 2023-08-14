import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface AccessTokenState {
  accessToken: string | unknown
  centerUuid: string | unknown
  userUuid: string | unknown
  setAccessToken: (accessToken: string | unknown) => void
  setCenterUuid: (centerUuid: string | unknown) => void
  setUserUuid: (userUuid: string | unknown) => void
}

export const useAccessToken = create<AccessTokenState>()(
  devtools(
    persist(
      set => ({
        accessToken: '',
        centerUuid: '',
        userUuid: '',
        setAccessToken: accessToken => set({ accessToken }),
        setCenterUuid: centerUuid => set({ centerUuid }),
        setUserUuid: userUuid => set({ userUuid }),
      }),
      {
        name: 'token',
      }
    )
  )
)
