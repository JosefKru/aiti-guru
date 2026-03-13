import { clsx } from "clsx";
import { IconChevronLeft, IconChevronRight } from "./icons";

interface PaginationProps {
  page: number;
  totalPages: number;
  from: number;
  to: number;
  total: number;
  onPageChange: (page: number) => void;
}

function getPageWindow(page: number, totalPages: number): number[] {
  const windowSize = Math.min(totalPages, 5);
  let start = Math.max(1, page - 2);
  const end = Math.min(totalPages, start + 4);
  start = Math.max(1, end - 4);
  return Array.from({ length: windowSize }, (_, i) => start + i);
}

export function Pagination({
  page,
  totalPages,
  from,
  to,
  total,
  onPageChange,
}: PaginationProps) {
  const pages = getPageWindow(page, totalPages);

  return (
    <div className="flex items-center justify-between mt-6">
      <span className="text-sm text-gray-500">
        Показано {from}–{to} из {total}
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="w-8 h-8 flex items-center justify-center rounded text-gray-400 hover:text-gray-700 disabled:opacity-30 transition-colors"
        >
          <IconChevronLeft />
        </button>
        {pages.map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={clsx(
                "w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors",
                page === p
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-100",
              )}
            >
              {p}
            </button>
          ),
        )}
        <button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded text-gray-400 hover:text-gray-700 disabled:opacity-30 transition-colors"
        >
          <IconChevronRight />
        </button>
      </div>
    </div>
  );
}
