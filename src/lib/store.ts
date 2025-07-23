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

export type ProductSchema = {
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
  products: ProductSchema[];
  setProducts: (products: ProductSchema[]) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  products: [],

  setProducts: (products) => set(() => ({ products })),
}));

type Count = {
  cart: number;
  address: number;
  order: number;
};

type User = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  address: [];
  cart: [];
  _count: Count;
  order: [];
  createdAt: Date;
  updateAt: Date;
};

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
};

export const userStore = create<UserStore>((set) => ({
  user: null,

  setUser: (user) => set(() => ({ user })),
}));
