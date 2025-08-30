import { url } from "@/lib/utils";
import useUserStore from "@/store/user.store";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useAuth = () => {
  const { user, setUser, setCart, setWishlist, setAddresses, setLoading: setUserLoading } = useUserStore();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(token ? true : false);

  useEffect(() => {
    if (!user && loading) {
      const fetchInfo = async () => {
        try {
          const res = await fetch(`${url}/user/me`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await res.json();
          // console.log(data, "data")
          if (data.success) {
            setUser(data.data.user);
            setCart(data.data.cart);
            setWishlist(data.data.wishlist);
            setAddresses(data.data.addresses);
            console.log(data.data.addresses);
          } else {
            throw new Error(data.error || "something went wrong!");
          }
        } catch (error: any) {
          // alert(error);
          localStorage.removeItem("token");
          localStorage.removeItem("refToken");
        } finally {
          setLoading(false);
          setUserLoading(false);
        }
      };

      fetchInfo();
    } else {
      setLoading(false);
      setUserLoading(false);
    }
  }, []);

  return { user, loading };
};

// import type { IAddress, ICart, IUser, IWishlist } from "@/types";
// import { create } from "zustand";

// interface IUserStore {
//   loading: boolean;
//   setLoading: (data: boolean) => void;

//   user: IUser | null;
//   setUser: (data: IUser | null) => void;

//   addresses: IAddress[] | null;
//   setAddresses: (data: IAddress[] | null) => void;

//   addAddress: (data: IAddress) => void;
//   updateAddress: (id: string, data: IAddress) => void;
//   deleteAddress: (id: string) => void;

//   cart: ICart[] | null;
//   setCart: (data: ICart[] | null) => void;

//   addCartItem: (item: ICart) => void;
//   removeCartItem: (itemId: string) => void;
//   updateQuantity: (itemId: string, quantity: number) => void;

//   wishlist: IWishlist[] | null;
//   setWishlist: (data: IWishlist[] | null) => void;

//   addWishlistItem: (item: IWishlist) => void;
//   removeWishlistItem: (itemId: string) => void;

//   moveToCart: (data: IWishlist) => void;
//   rollbackToWishlist: (data: IWishlist) => void;
// }

// const useUserStore = create<IUserStore>((set) => ({
//   loading: true,
//   setLoading: (data) => set({ loading: data }),

//   user: null,
//   setUser: (data) => set({ user: data }),

//   addresses: null,
//   setAddresses: (data) => set({ addresses: data }),

//   addAddress: (data) => set((state) => ({ addresses: [...state.addresses!, data] })),
//   updateAddress: (id, data) =>
//     set((state) => ({ addresses: state.addresses!.map((item) => (item._id === id ? data : item)) })),
//   deleteAddress: (id) => set((state) => ({ addresses: state.addresses!.filter((item) => item._id !== id) })),

//   cart: null,
//   setCart: (data) => set({ cart: data }),

//   addCartItem: (item) => set((state) => ({ cart: [...state.cart!, item] })),
//   removeCartItem: (itemId) => set((state) => ({ cart: state.cart!.filter((item) => item.item._id !== itemId) })),
//   updateQuantity: (itemId, quantity) =>
//     set((state) => ({ cart: state.cart!.map((item) => (item.item._id === itemId ? { ...item, quantity } : item)) })),

//   wishlist: null,
//   setWishlist: (data) => set({ wishlist: data }),

//   addWishlistItem: (item) => set((state) => ({ wishlist: [...state.wishlist!, item] })),
//   removeWishlistItem: (itemId) =>
//     // @ts-ignore
//     set((state) => ({ wishlist: state.wishlist!.filter((item) => (item.item._id || item.item) !== itemId) })),

//   moveToCart: (data) =>
//     set((state) => {
//       const item = state.cart?.find((item) => item.item._id === data.item._id);
//       let updatedCart;

//       if (item) {
//         updatedCart = state.cart?.map((item) =>
//           item.item._id === data.item._id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       } else {
//         updatedCart = [...state.cart!, { item: data.item, quantity: 1 }];
//       }

//       return {
//         cart: updatedCart,
//         wishlist: state.wishlist?.filter((item) => item.item._id !== data.item._id),
//       };
//     }),
//   rollbackToWishlist: (data) =>
//     set((state) => {
//       const item = state.cart?.find((item) => item.item._id === data.item._id);
//       let updatedCart;

//       if (item && item.quantity > 1) {
//         updatedCart = state.cart?.map((item) =>
//           item.item._id === data.item._id ? { ...item, quantity: item.quantity - 1 } : item
//         );
//       } else {
//         updatedCart = state.cart?.filter((item) => item.item._id !== data.item._id);
//       }

//       return {
//         wishlist: [...state.wishlist!, { item: data.item }],
//         cart: updatedCart,
//       };
//     }),
// }));

// export default useUserStore;

// import { url } from "@/lib/utils";
// import useUserStore from "@/store/user.store";
// import { useEffect, useState } from "react";
// // import { toast } from "sonner";

// export const useAuth = () => {
//   const { user, setUser, setCart, setWishlist } = useUserStore();
//   const token = localStorage.getItem("token");
//   const [loading, setLoading] = useState(token ? true : false);

//   useEffect(() => {
//     if (!user && loading) {
//       const fetchInfo = async () => {
//         try {
//           const res = await fetch(`${url}/user/me`, {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });

//           const data = await res.json();
//           if (data.success) {
//             setUser(data.data.user);
//             setCart(data.data.cart);
//             setWishlist(data.data.wishlist);
//           } else {
//             throw new Error(data.error || "something went wrong!");
//           }
//         } catch (error: any) {
//           localStorage.removeItem("token");
//           localStorage.removeItem("refToken");
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchInfo();
//     }
//   }, []);

//   return { user, loading };
// };

// // import { url } from "@/lib/utils";
// // import useUserStore from "@/store/user.store";
// // import { useEffect, useState } from "react";
// // // import { toast } from "sonner";

// // export const useAuth = () => {
// //   const { user, setUser, setCart , setWishlist  } = useUserStore();
// //   const token = localStorage.getItem("token");
// //   const [loading, setLoading] = useState(token ? true : false);

// //   useEffect(() => {
// //     if (!user && loading) {
// //       const fetchInfo = async () => {
// //         try {
// //           const res = await fetch(`${url}/user/me`, {
// //             method: "GET",
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           });

// //           const data = await res.json();
// //           if (data.success) {
// //             setUser(data.data);
// //             setCart(data.data.cart);
// //             setWishlist(data.data.wishlist);
// //           } else {
// //             throw new Error(data.error || "something went wrong!");
// //           }
// //         } catch (error: any) {
// //           localStorage.removeItem("token");
// //           localStorage.removeItem("refToken");
// //         } finally {
// //           setLoading(false);
// //         }
// //       };

// //       fetchInfo();
// //     }
// //   }, []);

// //   return { user, loading };
// // };