// import React from "react";
import { Button } from "../ui/button";
import { AlignJustify, Bookmark, Heart, Search, ShoppingCart, Sidebar as SidebarIcon } from "lucide-react";
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
      <div className="flex">
        <input type="search" placeholder="Search Product..." className="border-2 border-gray-700 rounded " />
        <button className="w-8 h-8 bg-amber-300 flex justify-center items-center hover:bg-amber-400"><Search/></button>
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
