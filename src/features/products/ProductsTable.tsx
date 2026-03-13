import { clsx } from "clsx";
import { TableCheckbox } from "../../components/ui/TableCheckbox";
import type { Product } from "../../types";
import type { SortField, SortState } from "../../hooks/useProductsSort";
import { ProductRow } from "./ProductRow";

interface ProductsTableProps {
  products: Product[];
  selectedIds: number[];
  allChecked: boolean;
  isFetching: boolean;
  sort?: SortState;
  onToggleAll: (checked: boolean) => void;
  onToggleOne: (id: number, checked: boolean) => void;
  onSortChange: (field: SortField) => void;
}

function SortArrows({ field, sort }: { field: SortField; sort?: SortState }) {
  const active = sort?.field === field;
  const asc = active && sort?.order === "asc";
  const desc = active && sort?.order === "desc";
  return (
    <span className="inline-flex flex-col ml-1 gap-0.5">
      <span className={clsx("text-[8px] leading-none", asc ? "text-primary" : "text-muted")}>▲</span>
      <span className={clsx("text-[8px] leading-none", desc ? "text-primary" : "text-muted")}>▼</span>
    </span>
  );
}

export function ProductsTable({
  products,
  selectedIds,
  allChecked,
  isFetching,
  sort,
  onToggleAll,
  onToggleOne,
  onSortChange,
}: ProductsTableProps) {
  return (
    <div className="relative">
      {isFetching && (
        <div className="absolute inset-0 z-10 bg-white/60 rounded" />
      )}
      <table className="w-full border-collapse">
        <thead className="font-bold text-muted text-[16px] h-18.25">
          <tr>
            <th className="w-72 pl-4.5 text-left">
              <div className="flex items-center gap-3">
                <TableCheckbox
                  checked={allChecked}
                  onChange={(e) => onToggleAll(e.target.checked)}
                />
                Наименование
              </div>
            </th>
            <th className="text-left">Вендор</th>
            <th className="text-left">Артикул</th>
            <th
              className="text-left cursor-pointer select-none hover:text-gray-600"
              onClick={() => onSortChange("rating")}
            >
              <span className="inline-flex items-center">
                Оценка
                <SortArrows field="rating" sort={sort} />
              </span>
            </th>
            <th
              className="text-left cursor-pointer select-none hover:text-gray-600"
              onClick={() => onSortChange("price")}
            >
              <span className="inline-flex items-center">
                Цена, ₽
                <SortArrows field="price" sort={sort} />
              </span>
            </th>
            <th className="w-29.5" />
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              selected={selectedIds.includes(product.id)}
              onToggle={(checked) => onToggleOne(product.id, checked)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
