import {create} from 'zustand'

interface idCountStore{
    id : number
    increaseId: () => void
}

export const idCountStore = create<idCountStore>(set => ({
    id: 100,
    increaseId: () => set(state => ({id: state.id + 1})),
}))

export{}