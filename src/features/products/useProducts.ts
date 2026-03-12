import { useQuery } from '@tanstack/react-query'
import instance from '../../api/instance'
import type { ProductsResponse } from '../../types'

interface UseProductsParams {
  page: number
  limit: number
}

async function fetchProducts({ page, limit }: UseProductsParams): Promise<ProductsResponse> {
  const skip = (page - 1) * limit
  const { data } = await instance.get<ProductsResponse>('/products', {
    params: { limit, skip },
  })
  return data
}

export function useProducts({ page, limit }: UseProductsParams) {
  return useQuery({
    queryKey: ['products', page, limit],
    queryFn: () => fetchProducts({ page, limit }),
  })
}
