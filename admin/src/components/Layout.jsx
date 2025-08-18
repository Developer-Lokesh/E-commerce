import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import DesktopSidebar from './DesktopSidebar';
import MobileSibebar from './MobileSibebar';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className='flex'>
        <DesktopSidebar/>
        <MobileSibebar/>
        <div className='flex-1 p-3'>{children}</div>
      </div>
    </div>
  );
};


export default Layout