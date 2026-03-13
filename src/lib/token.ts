export function getToken(): string | null {
  return sessionStorage.getItem('token') ?? localStorage.getItem('token')
}
