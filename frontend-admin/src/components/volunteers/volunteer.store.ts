import { create } from 'zustand'

export interface EditVolunteerState {
    setId: any
    id: number
}

export const useEditVolunteerStore = create<EditVolunteerState>()((set: any) => ({
    id: -1,
    setId: (id: number) => set((state: EditVolunteerState) => ({ id: id })),
}))
