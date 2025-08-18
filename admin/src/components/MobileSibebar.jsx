import React from 'react'
import Sidebar from './Sidebar'
import { useContext } from 'react'
import { appStore } from '../store/app.store'

const MobileSibebar = () => {
    const { sidebar, closeSidebar } = useContext(appStore);
    return (
        <div className={`fixed inset-0 z-[500] mt-[50px] transition-all duration-300 ${sidebar ? "visible" : "invisible"}`}>
            <div className={`absolute inset-0 bg-gray-500/55 transition-opacity duration-300 
                ${sidebar ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={closeSidebar}>

            </div>
            <div className={`fixed top-[50px] left-0 shadow-lg transform transition-transform duration-300 ${sidebar?"translate-x-0":"-translate-x-full"}`}>
                <Sidebar />
            </div>
        </div>
    )
}

export default MobileSibebar;