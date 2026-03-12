import { clsx } from "clsx";
import { useState } from "react";
import { AddProductModal } from "../../components/ui/AddProductModal";
import type { Product } from "../../types";
import { Pagination } from "../../components/ui/Pagination";
import { TableCheckbox } from "../../components/ui/TableCheckbox";
import {
  IconDots,
  IconPlus,
  IconPlusCircle,
  IconRefresh,
  IconSearch,
} from "../../components/ui/icons";
import { useProducts } from "./useProducts";

const LIMIT = 20;

export function ProductsPage() {
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [localProducts, setLocalProducts] = useState<Product[]>([]);
  const { data, isLoading, isFetching, isError, refetch } = useProducts({
    page,
    limit: LIMIT,
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

  function handleAdd(fields: Omit<Product, "id" | "description" | "category" | "thumbnail" | "rating">) {
    setLocalProducts((prev) => [
      { ...fields, id: Date.now(), description: "", category: "", thumbnail: "", rating: 0 },
      ...prev,
    ]);
  }

  const totalPages = data ? Math.ceil(data.total / LIMIT) : 0;
  const from = (page - 1) * LIMIT + 1;
  const to = data ? Math.min(page * LIMIT, data.total) : 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Top header */}
      <div className="flex items-center gap-6 px-8 py-5 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-900 shrink-0">
          Товары
        </h1>
        <div className="flex flex-1 max-w-xl items-center gap-2 h-10 px-4 bg-gray-100 rounded-lg">
          <IconSearch />
          <input
            className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none"
            placeholder="Найти"
          />
        </div>
      </div>

      <div className="px-7.5 py-10">
        {/* Panel */}
        <div className="flex items-center justify-between mb-10">
          <span className="text-[20px] font-bold">Все позиции</span>
          <div className="flex items-center gap-3  h-10.5">
            <button
              onClick={() => refetch()}
              className="w-10.5 border h-full border-[#ECECEB] flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors rounded-lg"
            >
              <IconRefresh className={isFetching ? "animate-spin" : ""} />
            </button>
            <button
              onClick={() => setShowModal(true)}
              className={clsx(
                "flex items-center justify-center gap-2 px-4 rounded-lg h-full w-36.75 text-[14px] font-semibold text-white font-['Cairo',sans-serif]",
                "bg-[#242EDB]",
                "[box-shadow:inset_0_0_0_1px_#367AFF]",
                "hover:opacity-90 transition-opacity",
              )}
            >
              <IconPlusCircle />
              Добавить
            </button>
          </div>
        </div>

        {/* Progress bar */}
        {(isLoading || isFetching) && (
          <div className="fixed top-0 left-0 right-0 h-0.5 z-50 overflow-hidden">
            <div
              className="absolute inset-y-0 w-1/2 bg-primary"
              style={{ animation: "progress-slide 1.2s ease-in-out infinite" }}
            />
          </div>
        )}

        {isError && (
          <p className="text-sm text-red-500 mb-4">
            Не удалось загрузить товары
          </p>
        )}

        {/* Table */}
        <div className="relative">
          {isFetching && (
            <div className="absolute inset-0 z-10 bg-white/60 rounded" />
          )}
          <table className="w-full border-collapse">
            <thead className="font-bold text-[#B2B3B9] text-[16px] h-18.25">
              <tr>
                <th className="w-72 pl-4.5 text-left">
                  <div className="flex items-center gap-3">
                    <TableCheckbox
                      checked={allChecked}
                      onChange={(e) => toggleAll(e.target.checked)}
                    />
                    Наименование
                  </div>
                </th>
                <th className="text-left">Вендор</th>
                <th className="text-left">Артикул</th>
                <th className="text-left">Оценка</th>
                <th className="text-left">Цена, ₽</th>
                <th className="w-29.5" />
              </tr>
            </thead>
            <tbody>
              {[...localProducts, ...(data?.products ?? [])].map((product) => {
                const isLowRating = product.rating < 3;
                const priceInt = Math.floor(product.price).toLocaleString(
                  "ru-RU",
                );
                const priceDec = (product.price % 1).toFixed(2).slice(1);

                return (
                  <tr
                    key={product.id}
                    className="border-t border-[#E2E2E2] hover:bg-gray-50 transition-colors h-17.75 text-[16px]"
                  >
                    <td className="pl-4.5">
                      <div className="flex items-center gap-4.5">
                        <TableCheckbox
                          checked={selectedIds.includes(product.id)}
                          onChange={(e) =>
                            toggleOne(product.id, e.target.checked)
                          }
                        />
                        <div className="w-12 h-12 rounded-lg bg-gray-100 shrink-0 overflow-hidden">
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col justify-center gap-1 w-[210px] mr-44.25">
                          <p className="font-bold leading-tight truncate">
                            {product.title}
                          </p>
                          <p className="text-[14px] text-[#B2B3B9]">
                            {product.category}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="font-bold">{product.brand ?? "—"}</td>
                    <td>{product.sku}</td>
                    <td>
                      <span
                        className={clsx(
                          isLowRating ? "text-[#F11010]" : "text-black",
                        )}
                      >
                        {product.rating}
                      </span>
                      /5
                    </td>
                    <td>
                      <span>{priceInt}</span>
                      <span className="text-[#999999]">{priceDec}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-8 justify-end pr-29.5">
                        <button className="w-[52px] h-[27px] rounded-full flex items-center justify-center text-white shrink-0 bg-[#242EDB] hover:opacity-90 transition-opacity">
                          <IconPlus />
                        </button>
                        <button className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 border border-gray-200 transition-colors">
                          <IconDots />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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
