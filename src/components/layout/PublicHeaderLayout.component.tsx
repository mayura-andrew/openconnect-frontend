import { Outlet } from 'react-router-dom'
import Footer from '../common/Footer.component'
import About from '../common/About.component'
import HeaderHome from './Header/HeaderHome'

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
