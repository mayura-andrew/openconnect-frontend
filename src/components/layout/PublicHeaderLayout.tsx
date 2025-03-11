import { Outlet } from 'react-router-dom'
import About from '../ui/About'
import Footer from '../ui/Footer'
import HeaderHome from './header/Header-home'

export const PublicHeaderLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <HeaderHome />
            <main className="flex-1">
                <Outlet />
            </main>
            <About />
            <Footer />
        </div>
    )
}