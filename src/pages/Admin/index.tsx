import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '@/components/admin/AdminSidebar.component'
import { useAuth } from '@/context/AuthContext'

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { logout } = useAuth()

    const handleLogout = () => {
        logout()
    }

    return (
        <div className="h-screen flex overflow-hidden bg-gray-50">
            <AdminSidebar 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen} 
                onLogout={handleLogout}
            />
            <div className="flex flex-col w-0 flex-1 overflow-hidden">
                <main className="flex-1 relative overflow-y-auto focus:outline-none">
                    <div className="py-6 px-4 sm:px-6 md:px-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}
