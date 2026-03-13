import { useState } from "react";

export type SortField = "price" | "rating";
export type SortOrder = "asc" | "desc";

export interface SortState {
  field: SortField;
  order: SortOrder;
}

const SORT_STORAGE_KEY = "products_sort";

function loadSort(): SortState | undefined {
  try {
    const raw = localStorage.getItem(SORT_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SortState) : undefined;
  } catch {
    return undefined;
  }
}

function saveSort(sort: SortState) {
  localStorage.setItem(SORT_STORAGE_KEY, JSON.stringify(sort));
}

export function useProductsSort(onReset: () => void) {
  const [sort, setSort] = useState<SortState | undefined>(loadSort);

  function handleSortChange(field: SortField) {
    setSort((prev) => {
      const next: SortState =
        prev?.field === field
          ? { field, order: prev.order === "asc" ? "desc" : "asc" }
          : { field, order: "asc" };
      saveSort(next);
      return next;
    });
    onReset();
  }

  return { sort, handleSortChange };
}
