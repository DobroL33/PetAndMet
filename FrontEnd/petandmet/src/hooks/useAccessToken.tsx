import { String } from 'lodash'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface AccessTokenState {
  accessToken: string | null | unknown
  centerUuid: string
  userUuid: string | null
  setAccessToken: (accessToken: string | null | unknown) => void
  setCenterUuid: (centerUuid: string) => void
  setUserUuid: (userUuid: string | null) => void
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
