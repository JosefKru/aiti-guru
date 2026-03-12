import { z } from "zod";

export const addProductSchema = z.object({
  title: z.string().min(1, "Обязательное поле"),
  price: z
    .string()
    .min(1, "Обязательное поле")
    .refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Введите корректную цену"),
  brand: z.string().min(1, "Обязательное поле"),
  sku: z.string().min(1, "Обязательное поле"),
});

export type AddProductFormValues = z.infer<typeof addProductSchema>;
