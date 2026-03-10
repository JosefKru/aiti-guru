import { create } from 'zustand'

interface AuthState {
  token: string | null
  setToken: (token: string, remember: boolean) => void
  logout: () => void
}

function getInitialToken(): string | null {
  return localStorage.getItem('token') ?? sessionStorage.getItem('token')
}

export const useAuthStore = create<AuthState>()((set) => ({
  token: getInitialToken(),
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
