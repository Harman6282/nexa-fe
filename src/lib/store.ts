import { create } from "zustand";

export type ImageSchema = {
  id: string;
  publicId: string;
  url: string;
  productId: string;
};

type Variant = {
  id: string;
  productId: string;
  size: string;
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
  categoryName: string;
  ratings: number;
  numReviews: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
  images: ImageSchema[];
  variants: Variant[];
};

type ProductStore = {
  products: ProductSchema[];
  totalPages: number;
  setProducts: (products: ProductSchema[]) => void;
  setTotalPages: (totalPages: number) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  totalPages: 0,

  setProducts: (products) => set(() => ({ products })),
  setTotalPages: (totalPages) => set(() => ({ totalPages })),
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
  cart: {
    id: string;
    userId: string;
  }[];
  _count: Count;
  order: [];
  createdAt: Date;
  updateAt: Date;
};

export interface CartItems {
  id: string;
  productId: string;
  product: ProductSchema;
  variant: Variant;
  quantity: number;
  inStock: boolean;
}

type UserStore = {
  user: User | null;
  cartItems: CartItems[] | null;
  setUser: (user: User) => void;
  setCartItems: (cart: CartItems[]) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  increaseQuantity: (id: string, qty: number) => void;
  decreaseQuantity: (id: string, qty: number) => void;
};

export const userStore = create<UserStore>((set) => ({
  user: null,
  cartItems: null,

  setUser: (user) => set(() => ({ user })),
  setCartItems: (cartItems) => set(() => ({ cartItems })),
  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems?.filter((item) => item.id != id),
    })),
  clearCart: () => set({ cartItems: [] }),
  increaseQuantity: (id: string, qty: number) =>
    set((state) => ({
      cartItems: state.cartItems?.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: qty || Math.min(item.quantity + 1, item.variant.stock),
            }
          : item
      ),
    })),

  decreaseQuantity: (id: string, qty: number) =>
    set((state) => ({
      cartItems: state.cartItems
        ?.map((item) =>
          item.id === id
            ? { ...item, quantity: qty || item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0),
    })),
}));
