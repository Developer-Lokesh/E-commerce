import { Home, ShoppingCart, Users, List, Package } from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { appStore } from '../store/app.store'
import { useContext } from 'react';

const Sidebar = () => {

  return (
    <div className='border-r border-gray-400 w-[200px] h-[calc(100vh-50px)] p-2 bg-white overflow-hidden'>
      <div className='flex flex-col gap-5 p-5'>
        <Sidelink icon={Home} link="/" label="Home" />
        <Sidelink icon={Package} link="/products" label="Products" />
        <Sidelink icon={List} link="/categories" label="Categories" />
        <Sidelink icon={ShoppingCart} link="/orders" label="Orders" />
        <Sidelink icon={Users} link="/users" label="Users" />
      </div>
    </div>
  );
};


const Sidelink = ({ icon: Icon, link, label }) => {
  const { closeSidebar } = useContext(appStore);
  const { pathname } = useLocation();
  const isActive = pathname === link;
  return (
    <Link to={link} className={`text-gray-700 flex items-center gap-2 
    ${isActive && "text-gray-950 font-semibold"}`} onClick={closeSidebar}>
      <Icon className='w-5 h-5' />
      {label}
    </Link>
  );
};

export default Sidebar;
