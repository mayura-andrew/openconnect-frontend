import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryProvider } from './context/QueryProvider'
import { LoadingProvider } from './context/LoadingContext'
import { Toaster } from './components/common/Toaster.component'
import { AuthProvider } from './context/AuthContext'
import { Router } from './router'
import { AppProvider } from './context/AppContext'

export function App() {
  return (
    <LoadingProvider>
      <QueryProvider>
        <BrowserRouter>
          <AuthProvider>
            <AppProvider>
              <Router />
              <Toaster />
            </AppProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryProvider>
    </LoadingProvider>
  )
}
