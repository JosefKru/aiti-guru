import { useRef, useState } from "react";
import { debounce } from "../lib/debounce";

export function useProductsSearch(onReset: () => void) {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSetSearch = useRef(
    debounce((value: unknown) => {
      setSearchQuery(value as string);
      onReset();
    }, 400),
  ).current;

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
    debouncedSetSearch(e.target.value);
  }

  return { searchInput, searchQuery, handleSearchChange };
}
