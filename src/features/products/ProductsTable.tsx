import { TableCheckbox } from "../../components/ui/TableCheckbox";
import type { Product } from "../../types";
import { ProductRow } from "./ProductRow";

interface ProductsTableProps {
  products: Product[];
  selectedIds: number[];
  allChecked: boolean;
  isFetching: boolean;
  onToggleAll: (checked: boolean) => void;
  onToggleOne: (id: number, checked: boolean) => void;
}

export function ProductsTable({
  products,
  selectedIds,
  allChecked,
  isFetching,
  onToggleAll,
  onToggleOne,
}: ProductsTableProps) {
  return (
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
                  onChange={(e) => onToggleAll(e.target.checked)}
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
