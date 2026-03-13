import { useMutation } from '@tanstack/react-query'
import instance from '../../api/instance'
import { useAuthStore } from '../../store/authStore'
import type { AuthResponse } from '../../types'

const SESSION_EXPIRES_MINS = 30
const PERSISTENT_EXPIRES_MINS = 30 * 24 * 60 // 30 days

interface LoginPayload {
  username: string
  password: string
  remember: boolean
}

async function loginRequest(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await instance.post<AuthResponse>('/auth/login', {
    username: payload.username.trim(),
    password: payload.password.trim(),
    expiresInMins: payload.remember ? PERSISTENT_EXPIRES_MINS : SESSION_EXPIRES_MINS,
  })
  return data
}

export function useLogin() {
  const setToken = useAuthStore((s) => s.setToken)

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data, variables) => {
      setToken(data.accessToken, variables.remember)
    },
  })
}
