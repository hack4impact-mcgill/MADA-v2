import { create } from 'zustand'

export interface AuthState {
    setAuth: (value: boolean) => void
    auth: boolean
}

export const useAuthStore = create<AuthState>()((set: any) => ({
    auth: false,
    setAuth: (value) => set((state: AuthState) => ({ auth: value })),
}))
