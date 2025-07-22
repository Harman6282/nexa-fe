import { create } from "zustand";

type Image = {
  id: string;
  publicId: string;
  url: string;
  productId: string;
};

type Variant = {
  id: string;
  productId: string;
  size: string;
  color: string;
  stock: number;
};

type Category = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discount: number;
  brand: string;
  categoryId: string;
  ratings: number;
  numReviews: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
  images: Image[];
  variants: Variant[];
};

type ProductStore = {
  products: Product[];
  setProducts: (products: Product[]) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  products: [],

  setProducts: (products) => set(() => ({ products })),
}));
