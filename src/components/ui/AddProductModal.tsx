import { clsx } from "clsx";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  addProductSchema,
  type AddProductFormValues,
} from "../../features/products/schema";
import { useModalAnimation } from "../../hooks/useModalAnimation";
import type { Product } from "../../types";
import { Button } from "./Button";
import { Input } from "./Input";

type AddProductForm = AddProductFormValues;

interface AddProductModalProps {
  onClose: () => void;
  onAdd: (
    product: Omit<
      Product,
      "id" | "description" | "category" | "thumbnail" | "rating"
    >,
  ) => void;
}

const EMPTY: AddProductForm = { title: "", price: "", brand: "", sku: "" };

export function AddProductModal({ onClose, onAdd }: AddProductModalProps) {
  const [form, setForm] = useState<AddProductForm>(EMPTY);
  const [errors, setErrors] = useState<Partial<AddProductForm>>({});
  const { visible, close, overlayRef } = useModalAnimation(onClose);

  function set(field: keyof AddProductForm) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };
  }

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = addProductSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<AddProductForm> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof AddProductForm;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    onAdd({
      title: result.data.title,
      price: Number(result.data.price),
      brand: result.data.brand,
      sku: result.data.sku,
    });
    close();
    setTimeout(() => toast.success("Товар успешно добавлен"), 250);
  }

  return (
    <div
      ref={overlayRef}
      className={clsx(
        "fixed inset-0 z-40 flex items-center justify-center transition-all duration-250",
        visible ? "bg-black/35" : "bg-black/0",
      )}
      onClick={(e) => e.target === overlayRef.current && close()}
    >
      <div
        className={clsx(
          "bg-white rounded-2xl shadow-xl w-120 p-8 transition-all duration-250",
          visible ? "opacity-100 scale-100" : "opacity-0 scale-97",
        )}
      >
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-[20px] font-bold text-gray-900">
            Добавить товар
          </h2>
          <button
            type="button"
            onClick={close}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 1L13 13M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Наименование"
            placeholder="Введите наименование"
            value={form.title}
            onChange={set("title")}
            error={errors.title}
          />
          <Input
            label="Цена, ₽"
            placeholder="0.00"
            value={form.price}
            onChange={set("price")}
            error={errors.price}
            inputMode="decimal"
          />
          <Input
            label="Вендор"
            placeholder="Введите вендора"
            value={form.brand}
            onChange={set("brand")}
            error={errors.brand}
          />
          <Input
            label="Артикул"
            placeholder="Введите артикул"
            value={form.sku}
            onChange={set("sku")}
            error={errors.sku}
          />

          <div className="flex gap-3 mt-3">
            <button
              type="button"
              onClick={close}
              className="flex-1 h-13.5 rounded-xl border border-gray-200 text-[16px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Отмена
            </button>
            <Button type="submit" className="flex-1">
              Добавить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
