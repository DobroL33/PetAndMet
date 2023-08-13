import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface OpenSessionInfo {
  sessionId: string
  setSessionId: (sessionId: string) => void
}

export const useOpenSessionInfo = create<OpenSessionInfo>()(
  devtools(
    persist(
      set => ({
        sessionId: '',
        setSessionId: sessionId => set({ sessionId }),
      }),
      {
        name: 'test',
      }
    )
  )
)
