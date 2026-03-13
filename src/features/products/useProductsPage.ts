import { useState } from "react";
import type { Product } from "../../types";
import { useProductsSearch } from "../../hooks/useProductsSearch";
import { useProductsSort } from "../../hooks/useProductsSort";
import { useProducts } from "./useProducts";

const LIMIT = 20;

export function useProductsPage() {
  const [page, setPage] = useState(1);
  const [localProducts, setLocalProducts] = useState<Product[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const { searchInput, searchQuery, handleSearchChange } = useProductsSearch(() =>
    setPage(1),
  );
  const { sort, handleSortChange } = useProductsSort(() => setPage(1));

  const { data, isLoading, isFetching, isError, refetch } = useProducts({
    page,
    limit: LIMIT,
    search: searchQuery || undefined,
    sort,
  });

  const allIds = data?.products.map((p) => p.id) ?? [];
  const allChecked =
    allIds.length > 0 && allIds.every((id) => selectedIds.includes(id));

  function toggleAll(checked: boolean) {
    setSelectedIds(checked ? allIds : []);
  }

  function toggleOne(id: number, checked: boolean) {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id),
    );
  }

  function handleAdd(
    fields: Omit<
      Product,
      "id" | "description" | "category" | "thumbnail" | "rating"
    >,
  ) {
    setLocalProducts((prev) => [
      {
        ...fields,
        id: Date.now(),
        description: "",
        category: "",
        thumbnail: "",
        rating: 0,
      },
      ...prev,
    ]);
  }

  const totalPages = data ? Math.ceil(data.total / LIMIT) : 0;
  const from = (page - 1) * LIMIT + 1;
  const to = data ? Math.min(page * LIMIT, data.total) : 0;
  const products = [...localProducts, ...(data?.products ?? [])];

  return {
    searchInput,
    handleSearchChange,
    products,
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
    handleAdd,
    page,
    setPage,
    totalPages,
    from,
    to,
    selectedIds,
    allChecked,
    toggleAll,
    toggleOne,
    sort,
    handleSortChange,
  };
}
