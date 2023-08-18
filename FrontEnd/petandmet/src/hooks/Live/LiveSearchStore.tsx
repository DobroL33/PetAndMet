import { create } from 'zustand'

export interface LiveList {
  lives: Live[]
  total_count: number
  setLives: (lives: Live[]) => void
  setTotalCount: (total_count: number) => void
}

export interface Live {
  live_id: number
  session_id: string
  session_name: string
  animal_uuid: string
  thumbnail_image: string
  setLiveId: (live_id: number) => void
  setSessionId: (session_id: string) => void
  setSessionName: (session_name: string) => void
  setAnimalUuid: (animal_uuid: string) => void
  setThumbnailImage: (thumbnail_image: string) => void
}

export const LiveListSearchStore = create<LiveList>(set => ({
  lives: [],
  total_count: 0,
  setLives: lives => set({ lives }),
  setTotalCount: total_count => set({ total_count }),
}))

export const LiveDetailStore = create<Live>(set => ({
  live_id: 0,
  session_id: '',
  session_name: '',
  animal_uuid: '',
  thumbnail_image: '',
  setLiveId: live_id => set({ live_id }),
  setSessionId: session_id => set({ session_id }),
  setSessionName: session_name => set({ session_name }),
  setAnimalUuid: animal_uuid => set({ animal_uuid }),
  setThumbnailImage: thumbnail_image => set({ thumbnail_image }),
}))
