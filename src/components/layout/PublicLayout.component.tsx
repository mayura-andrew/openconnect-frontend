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
      <main className="flex-1">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
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
