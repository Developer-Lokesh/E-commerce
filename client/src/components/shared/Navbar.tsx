// import React from "react";
import { Button } from "../ui/button";
import { AlignJustify, Bookmark, Heart, ShoppingCart, Sidebar as SidebarIcon } from "lucide-react";
import useAppStore from "@/store/app.store";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUserStore from "@/store/user.store";

const Navbar = () => {
  const { openSidebar } = useAppStore();
  const { setUser, cart, wishlist } = useUserStore();
  const { user, loading } = useAuth();
  console.log(user, "Navbar");

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refToken");
    setUser(null);
  };

  return (
    <div className="w-full h-[60px] flex justify-between items-center px-5 py-3 border-b border-gray-300 shadow-lg">
      <div className="flex items-center gap-3">
        <AlignJustify onClick={openSidebar} className="cursor-pointer" />
        <Sidebar />
        <Link to="/">
          <h1 className="text-2xl font-bold">Devil's Vault</h1>
        </Link>
      </div>

      {user ? (
        <div className="flex items-center gap-3">
          <Link to="/cart" className="relative">
            {cart!?.length > 0 && (
              <p className="text-xs bg-red-500 text-white w-4 h-4 rounded-full absolute top-[-5px] right-[-5px] flex items-center justify-center">
                {cart?.length}
              </p>
            )}
            <ShoppingCart className="cursor-pointer" />
          </Link>
          <Link to="/wishlist" className="relative">
            {wishlist!?.length > 0 && (
              <p className="text-xs bg-red-500 text-white w-4 h-4 rounded-full absolute top-[-5px] right-[-5px] flex items-center justify-center">
                {wishlist?.length}
              </p>
            )}
            <Heart className="cursor-pointer" />
          </Link>
          <Button size={"sm"} onClick={logOut}>
            Log Out
          </Button>
          <Avatar className="cursor-pointer">
            <AvatarFallback className="uppercase">{user.name[0]}</AvatarFallback>
          </Avatar>
        </div>
      ) : (
        <Button variant="link" className="cursor-pointer">
          <Link to="/login">Sign In</Link>
        </Button>
      )}
    </div>
  );
};

export default Navbar;

// import { Button } from "../ui/button";
// import { AlignJustify, Heart, LogOut, Search, ShoppingCart, Sidebar as SidebarIcon } from "lucide-react";
// import useAppStore from "@/store/app.store";
// import Sidebar from "./Sidebar";
// import { Link } from "react-router-dom";
// import { useAuth } from "@/hooks/useAuth";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import useUserStore from "@/store/user.store";
// import useFetch from "@/hooks/useFetch";

// const Navbar = () => {
//   const { openSidebar } = useAppStore();
//   const { setUser, cart } = useUserStore(); 
//   const { user, loading } = useAuth();
//   console.log(user, "this is navbar")
//   const { data: categories, loading: categoriesLoading } = useFetch("http://localhost:4000/categories");

//   const logOut = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("reftoken");
//     setUser(null);
//   };

//   return (
//     <div className="w-full h-[60px] flex justify-between items-center px-5 py-3 border-b border-gray-300 shadow-lg">
//       {/* Left Section */}
//       <div className="flex items-center gap-3">
//         <AlignJustify onClick={openSidebar} className="cursor-pointer" />
//         <Sidebar />
//         <Link to="/">
//           <h1 className="text-2xl font-bold">Devil's Vault</h1>
//         </Link>
//       </div>

//       {/* Search Section */}
//       <div className="flex">
//         <select
//           name="Category"
//           className="bg-gray-100 border-t border-l border-b  border-black"
//         >
//           <option value="">Category</option>
//           {categories &&
//             categories.map((cat) => (
//               <option key={cat._id} value={cat.slug}>
//                 {cat.name}
//               </option>
//             ))}
//         </select>
//         <input
//           type="text"
//           placeholder="Search product..."
//           className="border bg-gray-100 border-black focus:border-blue-500 pl-10 w-70 outline-none"
//         />
//         <Search className="bg-yellow-300 w-8 h-8 border-t border-b border-r border-black hover:bg-yellow-400 cursor-pointer" />
//       </div>

//       {/* Nav Buttons */}
//       <Button className="bg-gray-300 text-black border-2 border-black !px-6 !py-3 hover:bg-blue-500 hover:text-white cursor-pointer">
//         Home
//       </Button>
//       <Button className="bg-gray-300 text-black border-2 border-black !px-6 !py-3 hover:bg-blue-500 hover:text-white cursor-pointer">
//         Contact
//       </Button>

//       {/* Wishlist */}
//       <button>
//         <Heart className="text-red-500 cursor-pointer" />
//       </button>

//       {/* Right Section */}
//       {user ? (
//         <div className="flex items-center gap-2">
//           {/* Cart */}
//           <div className="relative">
//             {cart && cart?.length > 0 && (
//               <p className="text-xs bg-red-500 text-white w-4 h-4 rounded-full absolute top-[-5px] right-[-5px] flex items-center justify-center">
//                 {cart.length}
//               </p>
//             )}
//             <ShoppingCart className="cursor-pointer bg-amber-400" />
//           </div>

//           {/* Logout */}
//           <Button size="sm" onClick={logOut} className="cursor-pointer bg-red-400 w-25">
//             Logout <LogOut />
//           </Button>

//           {/* Avatar */}
//           <Avatar className="cursor-pointer">
//             <AvatarFallback className="uppercase">
//               {user.name[0]}
//             </AvatarFallback>
//           </Avatar>
//         </div>
//       ) : (
//         <Button variant="link" className="cursor-pointer">
//           <Link to="/login">Sign In</Link>
//         </Button>
//       )}
//     </div>
//   );
// };

// export default Navbar;
