import React from 'react'
import Sidebar from '../../components/Sidebar'
import { Outlet } from 'react-router-dom'

const DashboardLayouts = () => {
    return (
        <div className='flex h-screen bg-background'>
            <Sidebar />
            <main className='flex-1 p-6 overflow-y-auto'>
                <Outlet />
            </main>
        </div>
    )
}

export default DashboardLayouts