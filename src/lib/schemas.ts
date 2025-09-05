export interface Variant {
  size: string;
  stock: number;
}

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  brand: string;
  discount: number;
  categoryName: string;
  variants: Variant[];
  images: File[];
}
