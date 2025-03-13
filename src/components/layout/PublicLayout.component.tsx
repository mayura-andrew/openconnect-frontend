import { Outlet } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import About from '../common/About.component'
import Footer from '../common/Footer.component'
import SmartHeader from './Header/SmartHeader.componenet'
import { RequestPanel } from './Header/RequestPanel'

export const PublicLayout = () => {
    const { requests, isRequestPanelOpen, setIsRequestPanelOpen } = useApp()

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <SmartHeader />
            <main className="flex-grow">
                <div className="mx-auto">
                    <Outlet />
                </div>
            </main>
            <About />
            <Footer />
            <RequestPanel
                requests={requests}
                isOpen={isRequestPanelOpen}
                onClose={() => setIsRequestPanelOpen(false)}
            />
        </div>
    )
}
