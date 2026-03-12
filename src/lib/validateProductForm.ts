interface ProductForm {
  title: string;
  price: string;
  brand: string;
  sku: string;
}

export function validateProductForm(form: ProductForm): Partial<ProductForm> {
  const errors: Partial<ProductForm> = {};
  if (!form.title.trim()) errors.title = "Обязательное поле";
  if (!form.price.trim()) {
    errors.price = "Обязательное поле";
  } else if (isNaN(Number(form.price)) || Number(form.price) <= 0) {
    errors.price = "Введите корректную цену";
  }
  if (!form.brand.trim()) errors.brand = "Обязательное поле";
  if (!form.sku.trim()) errors.sku = "Обязательное поле";
  return errors;
}
