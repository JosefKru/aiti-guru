import { create } from 'zustand'
import { getToken } from '../lib/token'

interface AuthState {
  token: string | null
  setToken: (token: string, remember: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  token: getToken(),
  setToken: (token, remember) => {
    if (remember) {
      localStorage.setItem('token', token)
      sessionStorage.removeItem('token')
    } else {
      sessionStorage.setItem('token', token)
      localStorage.removeItem('token')
    }
    set({ token })
  },
  logout: () => {
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    set({ token: null })
  },
}))
