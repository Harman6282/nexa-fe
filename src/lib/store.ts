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
  categoryName: string;
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
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
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
  increaseQuantity: (id: string) =>
    set((state) => ({
      cartItems: state.cartItems?.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.min(item.quantity + 1, item.variant.stock),
            }
          : item
      ),
    })),

  decreaseQuantity: (id: string) =>
    set((state) => ({
      cartItems: state.cartItems
        ?.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0),
    })),
}));
