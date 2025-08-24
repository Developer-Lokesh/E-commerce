import type { ICart, IUser, IWishlist } from "@/types/types";
import { create } from "zustand";

interface IUserStore {
  user: IUser | null;
  setUser: (data: IUser | null) => void;

  cart: ICart[] | null;
  setCart: (data: ICart[] | null) => void;

  addCartItem: (item: ICart) => void;
  removeCartItem: (itemId: string) => void;

  wishlist: IWishlist[] | null;
  setWishlist: (data: IWishlist[] | null) => void;
}

const useUserStore = create<IUserStore>((set) => ({
  user: null,
  setUser: (data) => set({ user: data }),

  cart: null,
  setCart: (data) => set({ cart: data }),

  addCartItem: (item) => set((state) => ({ cart: [...state.cart!, item] })),
  removeCartItem: (itemId) => set((state) => ({ cart: state.cart!.filter((item) => item.item !== itemId) })),

  wishlist: null,
  setWishlist: (data) => set({ wishlist: data }),
}));

export default useUserStore;


// import type { ICart, IUser, IWishlist } from "@/types/types";
// import { create } from "zustand";

// interface IUserStore {
//   user: IUser | null;
//   setUser: (user: IUser) => void;

//   Cart: ICart[] | null;
//   setCart: (data: ICart[] | null) => void;

//   addCartItem: (item: ICart | null) => void;
//   removeCartItem: (itemId: ICart | null) => void;

//   Wishlist: IWishlist[] | null;
//   setWishlist: (data: IWishlist[] | null) => void;
// }

// const useUserStore = create<IUserStore>((set) => ({
//   user: null,
//   setUser: (data) => set({ user: data }),

//   Cart: null,
//   setCart: (data) => set({Cart:data}),

//   addCartItem: (item) => set((state) => ({ Cart: [...state.Cart!, item]})),
//   removeCartItem: (itemId) => set((state)=> ({Cart: state.Cart!.filter((item)=>  item.id !== itemId)}))

//   Wishlist : null,
//   setWishlist : (data) => set({Wishlist: data}),

// }));

// export default useUserStore;










