import { clsx } from "clsx";
import { IconPlusCircle, IconRefresh } from "../../components/ui/icons";

interface ProductsHeaderProps {
  isFetching: boolean;
  onRefetch: () => void;
  onAdd: () => void;
}

export function ProductsHeader({ isFetching, onRefetch, onAdd }: ProductsHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-10">
      <span className="text-[20px] font-bold">Все позиции</span>
      <div className="flex items-center gap-3 h-10.5">
        <button
          onClick={onRefetch}
          className="w-10.5 border h-full border-[#ECECEB] flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors rounded-lg"
        >
          <IconRefresh className={isFetching ? "animate-spin" : ""} />
        </button>
        <button
          onClick={onAdd}
          className={clsx(
            "flex items-center justify-center gap-2 px-4 rounded-lg h-full w-36.75 text-[14px] font-semibold text-white font-['Cairo',sans-serif]",
            "bg-[#242EDB]",
            "hover:opacity-90 transition-opacity",
          )}
        >
          <IconPlusCircle />
          Добавить
        </button>
      </div>
    </div>
  );
}
