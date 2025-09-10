import { url } from "@/lib/utils";
import useUserStore from "@/store/user.store";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useAuth = () => {
  const { user, setUser, setCart, setWishlist, setAddresses, setLoading: setUserLoading } = useUserStore();
  // console.log(user, "useAuth")
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(!!token); // true only if token exists

  useEffect(() => {
    const fetchInfo = async () => {
      if (!token) {
        setLoading(false);
        setUserLoading(false);
        return;
      }

      if (user) {
        setLoading(false);
        setUserLoading(false);
        return;
      }

      try {
        const res = await fetch(`${url}/user/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setUser(data.data.user);
          setCart(data.data.cart || []);
          setWishlist(data.data.wishlist || []);
          setAddresses(data.data.addresses || []);
        } else {
          throw new Error(data.error || "Something went wrong!");
        }
      } catch (error: any) {
        console.error("Auth error:", error);
        toast.error(error.message || "Authentication failed");

        // logout on failure
        localStorage.removeItem("token");
        localStorage.removeItem("refToken");
        setUser(null);
      } finally {
        setLoading(false);
        setUserLoading(false);
      }
    };

    fetchInfo();
  }, [token]); // only run when token changes

  return { user, loading };
};


// import { url } from "@/lib/utils";
// import useUserStore from "@/store/user.store";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";

// export const useAuth = () => {
//   const { user, setUser, setCart, setWishlist, setAddresses, setLoading: setUserLoading } = useUserStore();
//   const token = localStorage.getItem("token");
//   console.log(token, "token")
//   const [loading, setLoading] = useState(token ? true : false);
//   console.log(user,"UseAuth")

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
//           // console.log(data, "data")
//           if (data.success) {
//             setUser(data.data.user);
//             setCart(data.data.cart);
//             setWishlist(data.data.wishlist);
//             setAddresses(data.data.addresses);
//             // console.log(data.data.addresses);
//           } else {
//             throw new Error(data.error || "something went wrong!");
//           }
//         } catch (error) {
//           console.log(error);
//           alert(error);
//           localStorage.removeItem("token");
//           localStorage.removeItem("refToken");
//         } finally {
//           setLoading(false);
//           setUserLoading(false);
//         }
//       };

//       fetchInfo();
//     } else {
//       setLoading(false);
//       setUserLoading(false);
//     }
//   }, [token, user]);

//   return { user, loading };
// };

