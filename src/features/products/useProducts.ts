import { useQuery } from "@tanstack/react-query";
import instance from "../../api/instance";
import type { SortState } from "../../hooks/useProductsSort";
import type { ProductsResponse } from "../../types";

interface UseProductsParams {
  page: number;
  limit: number;
  search?: string;
  sort?: SortState;
}

async function fetchProducts({
  page,
  limit,
  search,
  sort,
}: UseProductsParams): Promise<ProductsResponse> {
  const skip = (page - 1) * limit;
  const url = search ? "/products/search" : "/products";
  const { data } = await instance.get<ProductsResponse>(url, {
    params: {
      limit,
      skip,
      ...(search ? { q: search } : {}),
      ...(sort ? { sortBy: sort.field, order: sort.order } : {}),
    },
  });
  return data;
}

export function useProducts({ page, limit, search, sort }: UseProductsParams) {
  return useQuery({
    queryKey: ["products", page, limit, search, sort],
    queryFn: () => fetchProducts({ page, limit, search, sort }),
  });
}
