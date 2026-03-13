import { useState } from "react";
import { AddProductModal } from "../../components/ui/AddProductModal";
import { Pagination } from "../../components/ui/Pagination";
import { IconSearch } from "../../components/ui/icons";
import { ProductsHeader } from "./ProductsHeader";
import { ProductsTable } from "./ProductsTable";
import { useProductsPage } from "./useProductsPage";

export function ProductsPage() {
  const [showModal, setShowModal] = useState(false);
  const {
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
  } = useProductsPage();

  return (
    <div className="min-h-screen bg-white">
      {/* Top header */}
      <div className="flex items-center px-7.5 py-5 border-x border-subtle border-20">
        <h1 className="flex-1 text-2xl font-semibold text-gray-900">Товары</h1>
        <div className="flex items-center gap-2 h-12 w-255.75 px-5 bg-subtle rounded-lg">
          <IconSearch />
          <input
            className="flex-1 text-sm placeholder:text-text-muted outline-none"
            placeholder="Найти"
            value={searchInput}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex-1" />
      </div>

      <div className="px-7.5 py-10">
        <ProductsHeader
          isFetching={isFetching}
          onRefetch={refetch}
          onAdd={() => setShowModal(true)}
        />

        {/* Progress bar */}
        {(isLoading || isFetching) && (
          <div className="fixed top-0 left-0 right-0 h-1 z-50 overflow-hidden">
            <div className="absolute inset-y-0 w-1/2 bg-primary animate-progress" />
          </div>
        )}

        {isError && (
          <p className="text-sm text-red-500 mb-4">
            Не удалось загрузить товары
          </p>
        )}

        <ProductsTable
          products={products}
          selectedIds={selectedIds}
          allChecked={allChecked}
          isFetching={isFetching}
          sort={sort}
          onToggleAll={toggleAll}
          onToggleOne={toggleOne}
          onSortChange={handleSortChange}
        />

        {data && (
          <Pagination
            page={page}
            totalPages={totalPages}
            from={from}
            to={to}
            total={data.total}
            onPageChange={setPage}
          />
        )}
      </div>

      {showModal && (
        <AddProductModal
          onClose={() => setShowModal(false)}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
}
