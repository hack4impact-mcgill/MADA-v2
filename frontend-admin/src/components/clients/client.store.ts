import { create } from 'zustand'

export interface EditClientState {
    setId: any
    id: number
}

export const useEditClientStore = create<EditClientState>()((set: any) => ({
    id: -1,
    setId: (id: number) => set((state: EditClientState) => ({ id: id })),
}))
