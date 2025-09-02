import { create } from "zustand";
import { persist } from "zustand/middleware";

// ? Product store starts here
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

export type adminProductsSchema = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
};

type ProductStore = {
  products: ProductSchema[];
  adminProducts: adminProductsSchema[];
  totalPages: number;
  setProducts: (products: ProductSchema[]) => void;
  setAdminProducts: (products: adminProductsSchema[]) => void;

  setTotalPages: (totalPages: number) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  adminProducts: [],
  totalPages: 0,

  setProducts: (products) => set(() => ({ products })),
  setTotalPages: (totalPages) => set(() => ({ totalPages })),
  setAdminProducts: (adminProducts) => set(() => ({ adminProducts })),
}));

// ? user store starts here

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

type Addresses = {
  id?: string;
  lineOne: string;
  lineTwo?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
};

export interface CartItems {
  id: string;
  productId: string;
  product: ProductSchema;
  variant: Variant;
  quantity: number;
  inStock: boolean;
}

export type Wishlist = {
  id: string;
  name: string;
  image: string;
  productId: string;
  slug: string;
  price: string;
};

type UserStore = {
  user: User | null;
  cartItems: CartItems[] | null;
  addresses: Addresses[] | null;
  wishlist: Wishlist[] | null;
  setUser: (user: User) => void;
  setCartItems: (cart: CartItems[]) => void;
  removeFromCart: (id: string) => void;
  setAddresses: (address: Addresses[]) => void;
  clearCart: () => void;
  increaseQuantity: (id: string, qty: number) => void;
  decreaseQuantity: (id: string, qty: number) => void;
  setWishlist: (wishlist: Wishlist[]) => void;
};

export const userStore = create<UserStore>((set) => ({
  user: null,
  cartItems: null,
  addresses: null,
  wishlist: null,

  setUser: (user) => set(() => ({ user })),
  setCartItems: (cartItems) => set(() => ({ cartItems })),
  setAddresses: (addresses) => set(() => ({ addresses })),
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

  setWishlist: (wishlist) =>
    set((state) => ({
      wishlist,
    })),
}));

// ? user Cart Store starts here

export interface OrderDetails {
  cartItems: CartItems[] | null;
  originalTotal: number;
  discount: number;
  deliveryCharges: number;
  total: number;
}

interface CartState {
  orderDetails: OrderDetails | null;
  setOrderDetails: (details: OrderDetails) => void;
  clearOrderDetails: () => void;
  clearPersistedData: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      orderDetails: null,
      setOrderDetails: (details) => set({ orderDetails: details }),
      clearOrderDetails: () => set({ orderDetails: null }),
      clearPersistedData: () => {
        set({ orderDetails: null });
        localStorage.removeItem("cart-storage");
      },
    }),
    { name: "cart-storage" }
  )
);
