import React from 'react'
import { ShieldUser } from 'lucide-react';
import { PanelRightClose } from 'lucide-react';
import { PanelRightOpen } from 'lucide-react';
import { useContext } from 'react';
import { appStore } from '../store/app.store';
import { authStore } from '../store/auth.store';

const Navbar = () => {
  const { logout, user } = useContext(authStore)
  const { sidebar, openSidebar, closeSidebar } = useContext(appStore)
  return (
    <div className='flex justify-between item-center p-3 border-b border-gray-400 h-[50px] select-none'>

      <div className=' flex item-center gap-2'>
        <div className='sm:hidden cursor-pointer'>
          {sidebar ? <PanelRightOpen onClick={closeSidebar} /> : <PanelRightClose onClick={openSidebar} />}
        </div>
        <h1>Admin</h1>
      </div>


      <div className='flex items-center gap-2'>
        <ShieldUser />
        <button onClick={logout} className='bg-red-400 cursor-pointer rounded text-xs text-white text-sembold p-1'>Logout</button>
      </div>
    </div>

  )
}

export default Navbar