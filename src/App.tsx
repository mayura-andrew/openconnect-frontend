// src/App.tsx
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './router'
import { AppProvider } from './context/AppContext'
import { Toaster } from './components/common/Toaster.component'
import { QueryProvider } from './context/QueryProvider'
import { AuthProvider } from './context/AuthContext'

export function App() {
    return (
        <QueryProvider>
            <BrowserRouter>
                <AuthProvider>
                    <AppProvider>
                        <AppRoutes />
                        <Toaster />
                    </AppProvider>
                </AuthProvider>
            </BrowserRouter>
        </QueryProvider>
    )
}