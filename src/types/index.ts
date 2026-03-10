export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  thumbnail: string
  brand: string
  sku: string
  rating: number
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
}
