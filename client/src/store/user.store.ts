import type { IAddress, ICart, IUser, IWishlist } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUserStore {
  loading: boolean;
  setLoading: (data: boolean) => void;

  user: IUser | null;
  setUser: (data: IUser | null) => void;

  addresses: IAddress[];
  setAddresses: (data: IAddress[]) => void;
  addAddress: (data: IAddress) => void;
  updateAddress: (id: string, data: IAddress) => void;
  deleteAddress: (id: string) => void;

  cart: ICart[];
  setCart: (data: ICart[]) => void;
  addCartItem: (item: ICart) => void;
  removeCartItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;

  wishlist: IWishlist[];
  setWishlist: (data: IWishlist[]) => void;
  addWishlistItem: (item: IWishlist) => void;
  removeWishlistItem: (itemId: string) => void;

  moveToCart: (data: IWishlist) => void;
  rollbackToWishlist: (data: IWishlist) => void;
}

const useUserStore = create<IUserStore>()(
  persist(
    (set, get) => ({
      loading: true,
      setLoading: (data) => set({ loading: data }),

      user: null,
      setUser: (data) => set({ user: data }),

      addresses: [],
      setAddresses: (data) => set({ addresses: data }),
      addAddress: (data) => set((state) => ({ addresses: [...state.addresses, data] })),
      updateAddress: (id, data) =>
        set((state) => ({ addresses: state.addresses.map((item) => (item._id === id ? data : item)) })),
      deleteAddress: (id) => set((state) => ({ addresses: state.addresses.filter((item) => item._id !== id) })),

      cart: [],
      setCart: (data) => set({ cart: data }),
      addCartItem: (item) => set((state) => ({ cart: [...state.cart, item] })),
      removeCartItem: (itemId) => set((state) => ({ cart: state.cart.filter((item) => item.item._id !== itemId) })),
      updateQuantity: (itemId, quantity) =>
        set((state) => ({ cart: state.cart.map((item) => (item.item._id === itemId ? { ...item, quantity } : item)) })),

      wishlist: [],
      setWishlist: (data) => set({ wishlist: data }),
      addWishlistItem: (item) => set((state) => ({ wishlist: [...state.wishlist, item] })),
      removeWishlistItem: (itemId) =>
        set((state) => ({ wishlist: state.wishlist.filter((w) => w.item._id !== itemId) })),

      moveToCart: (data) => {
        const { cart, wishlist } = get();
        const existing = cart.find((c) => c.item._id === data.item._id);
        let updatedCart;
        if (existing) {
          updatedCart = cart.map((c) =>
            c.item._id === data.item._id ? { ...c, quantity: c.quantity + 1 } : c
          );
        } else {
          updatedCart = [...cart, { item: data.item, quantity: 1 }];
        }
        set({
          cart: updatedCart,
          wishlist: wishlist.filter((w) => w.item._id !== data.item._id),
        });
      },

      rollbackToWishlist: (data) => {
        const { cart, wishlist } = get();
        const existing = cart.find((c) => c.item._id === data.item._id);
        let updatedCart;
        if (existing && existing.quantity > 1) {
          updatedCart = cart.map((c) =>
            c.item._id === data.item._id ? { ...c, quantity: c.quantity - 1 } : c
          );
        } else {
          updatedCart = cart.filter((c) => c.item._id !== data.item._id);
        }
        set({
          cart: updatedCart,
          wishlist: [...wishlist, { item: data.item }],
        });
      },
    }),
    {
      name: "user-store", // localStorage key
    }
  )
);

export default useUserStore;


