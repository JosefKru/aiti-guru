import { clsx } from "clsx";
import { useState } from "react";
import { useProducts } from "./useProducts";

const LIMIT = 20;

export function ProductsPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useProducts({ page, limit: LIMIT });

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
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9CA3AF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
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
            <button className='w-10.5 border h-full border-[#ECECEB] flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors rounded-lg'>
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.2373 13.2662C14.3656 13.395 14.4376 13.5695 14.4376 13.7513C14.4376 13.9331 14.3656 14.1076 14.2373 14.2364C14.1436 14.3284 11.9298 16.5 8.25 16.5C5.0368 16.5 2.70445 14.575 1.375 13.0754V15.125C1.375 15.3073 1.30257 15.4822 1.17364 15.6111C1.0447 15.7401 0.869836 15.8125 0.6875 15.8125C0.505164 15.8125 0.330295 15.7401 0.201364 15.6111C0.072433 15.4822 0 15.3073 0 15.125V11C0 10.8177 0.072433 10.6428 0.201364 10.5139C0.330295 10.3849 0.505164 10.3125 0.6875 10.3125H4.8125C4.99484 10.3125 5.1697 10.3849 5.29864 10.5139C5.42757 10.6428 5.5 10.8177 5.5 11C5.5 11.1823 5.42757 11.3572 5.29864 11.4861C5.1697 11.6151 4.99484 11.6875 4.8125 11.6875H2.01437C3.07312 13.0066 5.24219 15.125 8.25 15.125C11.3438 15.125 13.2464 13.2808 13.2653 13.2619C13.3948 13.1336 13.5699 13.062 13.7522 13.0628C13.9344 13.0636 14.1089 13.1368 14.2373 13.2662ZM15.8125 0.6875C15.6302 0.6875 15.4553 0.759933 15.3264 0.888864C15.1974 1.0178 15.125 1.19266 15.125 1.375V3.42461C13.7955 1.925 11.4632 0 8.25 0C4.57016 0 2.35641 2.17164 2.26359 2.26359C2.13436 2.39237 2.06158 2.56721 2.06126 2.74964C2.06094 2.93208 2.1331 3.10718 2.26187 3.23641C2.39065 3.36564 2.56549 3.43842 2.74793 3.43874C2.93036 3.43906 3.10546 3.3669 3.23469 3.23813C3.25359 3.21922 5.15625 1.375 8.25 1.375C11.2578 1.375 13.4269 3.49336 14.4856 4.8125H11.6875C11.5052 4.8125 11.3303 4.88493 11.2014 5.01386C11.0724 5.1428 11 5.31766 11 5.5C11 5.68234 11.0724 5.8572 11.2014 5.98614C11.3303 6.11507 11.5052 6.1875 11.6875 6.1875H15.8125C15.9948 6.1875 16.1697 6.11507 16.2986 5.98614C16.4276 5.8572 16.5 5.68234 16.5 5.5V1.375C16.5 1.19266 16.4276 1.0178 16.2986 0.888864C16.1697 0.759933 15.9948 0.6875 15.8125 0.6875Z"
                  fill="#515161"
                />
              </svg>
            </button>
            <button
              className={clsx(
                "flex items-center justify-center gap-2 px-4 rounded-lg h-full w-36.75 text-[14px] font-semibold text-white font-['Cairo',sans-serif]",
                "bg-[#242EDB]",
                "[box-shadow:inset_0_0_0_1px_#367AFF]",
                "hover:opacity-90 transition-opacity",
              )}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v8M8 12h8" />
              </svg>
              Добавить
            </button>
          </div>
        </div>

        {/* Progress bar */}
        {isLoading && (
          <div className="w-full h-0.5 bg-gray-100 rounded overflow-hidden mb-4">
            <div className="h-full w-1/3 bg-primary rounded animate-pulse" />
          </div>
        )}

        {isError && (
          <p className="text-sm text-red-500 mb-4">
            Не удалось загрузить товары
          </p>
        )}

        {/* Table */}
        <table className="w-full border-collapse">
          <thead className="font-bold text-[#B2B3B9] text-[16px] h-18.25">
            <tr>
              <th className="pl-4.5 text-left">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="w-5.5 h-5.5 shrink-0 rounded cursor-pointer transition-colors checked:bg-[#3C538E]"
                  />
                  Наименование
                </div>
              </th>
              <th className="text-left">Вендор</th>
              <th className="text-left">Артикул</th>
              <th className="text-left">Оценка</th>
              <th className="text-left pr-4">Цена, ₽</th>
              <th className="w-20" />
            </tr>
          </thead>
          <tbody>
            {data?.products.map((product) => {
              const isLowRating = product.rating < 3;
              const priceInt = Math.floor(product.price).toLocaleString(
                "ru-RU",
              );
              const priceDec = (product.price % 1).toFixed(2).slice(1);

              return (
                <tr
                  key={product.id}
                  className="border-t border-[#E2E2E2] hover:bg-gray-50 transition-colors h-16.5 text-[16px]"
                >
                  <td className="w-69.5 pl-4.5 pr-3">
                    <div className="flex items-center gap-4.5">
                      <input
                        type="checkbox"
                        className="w-5.5 h-5.5 shrink-0 appearance-none rounded cursor-pointer transition-colors ring-1 ring-[#B2B3B9] checked:bg-[#3C538E] checked:ring-[#B2B3B9]"
                      />
                      <div className="w-12 h-12 rounded-lg bg-gray-100 shrink-0 overflow-hidden">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="font-bold leading-tight">
                          {product.title}
                        </p>
                        <p className="text-[14px] text-[#B2B3B9]">
                          {product.category}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="w-33 font-bold">{product.brand ?? "—"}</td>
                  <td className="w-33">{product.sku}</td>
                  <td className="w-33">
                    <span
                      className={clsx(
                        isLowRating ? "text-red-500 " : "text-gray-900",
                      )}
                    >
                      {product.rating}
                    </span>
                    /5
                  </td>
                  <td className="w-33 pr-4">
                    <span>{priceInt}</span>
                    <span className="text-[#999999]">{priceDec}</span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        className={clsx(
                          "w-7 h-7 rounded-full flex items-center justify-center text-white shrink-0",
                          "[background:linear-gradient(to_bottom,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0)_100%),#242EDB]",
                          "[box-shadow:inset_0_0_0_1px_#367AFF]",
                          "hover:opacity-90 transition-opacity",
                        )}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 5V19"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M5 12H19"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                      <button className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 border border-gray-200 transition-colors">
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13 0C10.4288 0 7.91543 0.762437 5.77759 2.1909C3.63975 3.61935 1.97351 5.64968 0.989572 8.02512C0.0056327 10.4006 -0.251811 13.0144 0.249797 15.5362C0.751405 18.0579 1.98953 20.3743 3.80762 22.1924C5.6257 24.0105 7.94208 25.2486 10.4638 25.7502C12.9856 26.2518 15.5995 25.9944 17.9749 25.0104C20.3503 24.0265 22.3807 22.3603 23.8091 20.2224C25.2376 18.0846 26 15.5712 26 13C25.9964 9.5533 24.6256 6.24882 22.1884 3.81163C19.7512 1.37445 16.4467 0.00363977 13 0ZM13 24C10.8244 24 8.69767 23.3549 6.88873 22.1462C5.07979 20.9375 3.66989 19.2195 2.83733 17.2095C2.00477 15.1995 1.78693 12.9878 2.21137 10.854C2.63581 8.72022 3.68345 6.7602 5.22183 5.22183C6.76021 3.68345 8.72022 2.6358 10.854 2.21136C12.9878 1.78692 15.1995 2.00476 17.2095 2.83733C19.2195 3.66989 20.9375 5.07979 22.1462 6.88873C23.3549 8.69767 24 10.8244 24 13C23.9967 15.9164 22.8367 18.7123 20.7745 20.7745C18.7123 22.8367 15.9164 23.9967 13 24ZM14.5 13C14.5 13.2967 14.412 13.5867 14.2472 13.8334C14.0824 14.08 13.8481 14.2723 13.574 14.3858C13.2999 14.4993 12.9983 14.5291 12.7074 14.4712C12.4164 14.4133 12.1491 14.2704 11.9393 14.0607C11.7296 13.8509 11.5867 13.5836 11.5288 13.2926C11.471 13.0017 11.5007 12.7001 11.6142 12.426C11.7277 12.1519 11.92 11.9176 12.1667 11.7528C12.4133 11.588 12.7033 11.5 13 11.5C13.3978 11.5 13.7794 11.658 14.0607 11.9393C14.342 12.2206 14.5 12.6022 14.5 13ZM20 13C20 13.2967 19.912 13.5867 19.7472 13.8334C19.5824 14.08 19.3481 14.2723 19.074 14.3858C18.7999 14.4993 18.4983 14.5291 18.2074 14.4712C17.9164 14.4133 17.6491 14.2704 17.4393 14.0607C17.2296 13.8509 17.0867 13.5836 17.0288 13.2926C16.9709 13.0017 17.0007 12.7001 17.1142 12.426C17.2277 12.1519 17.42 11.9176 17.6667 11.7528C17.9133 11.588 18.2033 11.5 18.5 11.5C18.8978 11.5 19.2794 11.658 19.5607 11.9393C19.842 12.2206 20 12.6022 20 13ZM9.00001 13C9.00001 13.2967 8.91203 13.5867 8.74721 13.8334C8.58239 14.08 8.34812 14.2723 8.07403 14.3858C7.79994 14.4993 7.49834 14.5291 7.20737 14.4712C6.9164 14.4133 6.64912 14.2704 6.43935 14.0607C6.22957 13.8509 6.08671 13.5836 6.02883 13.2926C5.97095 13.0017 6.00065 12.7001 6.11419 12.426C6.22772 12.1519 6.41998 11.9176 6.66665 11.7528C6.91332 11.588 7.20333 11.5 7.50001 11.5C7.89783 11.5 8.27936 11.658 8.56067 11.9393C8.84197 12.2206 9.00001 12.6022 9.00001 13Z"
                            fill="#B2B3B9"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        {data && (
          <div className="flex items-center justify-between mt-6">
            <span className="text-sm text-gray-500">
              Показано {from}–{to} из {data.total}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 flex items-center justify-center rounded text-gray-400 hover:text-gray-700 disabled:opacity-30 transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              {Array.from(
                { length: Math.min(totalPages, 5) },
                (_, i) => i + 1,
              ).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={clsx(
                    "w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors",
                    page === p
                      ? "[background:linear-gradient(to_bottom,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0)_100%),#242EDB] [box-shadow:inset_0_0_0_1px_#367AFF] text-white"
                      : "text-gray-600 hover:bg-gray-100",
                  )}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded text-gray-400 hover:text-gray-700 disabled:opacity-30 transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
