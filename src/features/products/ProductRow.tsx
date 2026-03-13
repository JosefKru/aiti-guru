import { clsx } from "clsx";
import { TableCheckbox } from "../../components/ui/TableCheckbox";
import { IconDots, IconPlus } from "../../components/ui/icons";
import type { Product } from "../../types";

interface ProductRowProps {
  product: Product;
  selected: boolean;
  onToggle: (checked: boolean) => void;
}

export function ProductRow({ product, selected, onToggle }: ProductRowProps) {
  const isLowRating = product.rating < 3;
  const priceInt = Math.floor(product.price).toLocaleString("ru-RU");
  const priceDec = (product.price % 1).toFixed(2).slice(1);

  return (
    <tr className="border-t border-light hover:bg-gray-50 transition-colors h-17.75 text-[16px]">
      <td className="pl-4.5">
        <div className="flex items-center gap-4.5">
          <TableCheckbox
            checked={selected}
            onChange={(e) => onToggle(e.target.checked)}
          />
          <div className="w-12 h-12 rounded-lg bg-gray-100 shrink-0 overflow-hidden">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center gap-1 w-52.5 mr-44.25">
            <p className="font-bold leading-tight truncate">{product.title}</p>
            <p className="text-[14px] text-muted">{product.category}</p>
          </div>
        </div>
      </td>
      <td className="font-bold">{product.brand ?? "—"}</td>
      <td>{product.sku}</td>
      <td>
        <span className={clsx(isLowRating ? "text-danger" : "text-black")}>
          {product.rating}
        </span>
        /5
      </td>
      <td>
        <span>{priceInt}</span>
        <span className="text-text-muted">{priceDec}</span>
      </td>
      <td>
        <div className="flex items-center gap-8 justify-end pr-29.5">
          <button className="w-13 h-6.75 rounded-full flex items-center justify-center text-white shrink-0 bg-primary hover:opacity-90 transition-opacity">
            <IconPlus />
          </button>
          <button className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 border border-gray-200 transition-colors">
            <IconDots />
          </button>
        </div>
      </td>
    </tr>
  );
}
