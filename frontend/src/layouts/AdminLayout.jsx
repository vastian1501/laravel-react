import React from 'react'
import AdminSidebar from '../components/AdminSidebar'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const AdminLayout = () => {

    useAuth({middleware:'admin'})

    return (
        <div className="md:flex">
            <AdminSidebar />

            <main className='flex-1 px-4 h-screen overflow-y-scroll bg-amber-100'>
                <Outlet />
            </main>

        </div>

    )
}

export default AdminLayout
