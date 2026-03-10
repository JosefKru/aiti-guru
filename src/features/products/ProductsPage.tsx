import { useAuthStore } from '../../store/authStore'

export function ProductsPage() {
  const logout = useAuthStore((s) => s.logout)

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <p className="text-xl font-semibold text-gray-900 mb-4">Вы успешно вошли!</p>
        <button
          onClick={logout}
          className="text-sm text-primary underline"
        >
          Выйти
        </button>
      </div>
    </div>
  )
}
