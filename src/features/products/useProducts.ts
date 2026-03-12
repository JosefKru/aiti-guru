import { useQuery } from "@tanstack/react-query";
import instance from "../../api/instance";
import type { ProductsResponse } from "../../types";

interface UseProductsParams {
  page: number;
  limit: number;
  search?: string;
}

async function fetchProducts({
  page,
  limit,
  search,
}: UseProductsParams): Promise<ProductsResponse> {
  const skip = (page - 1) * limit;
  const url = search ? "/products/search" : "/products";
  const { data } = await instance.get<ProductsResponse>(url, {
    params: { limit, skip, ...(search ? { q: search } : {}) },
  });
  return data;
}

export function useProducts({ page, limit, search }: UseProductsParams) {
  return useQuery({
    queryKey: ["products", page, limit, search],
    queryFn: () => fetchProducts({ page, limit, search }),
  });
}
