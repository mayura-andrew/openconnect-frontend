// src/App.tsx
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { AppProvider } from './context/AppContext'
import { QueryProvider } from './context/QueryProvider'
import { Toaster } from './components/common/Toaster.component'

export function App() {
    return (
        <QueryProvider>
        <AppProvider>
            <RouterProvider router={router} />
            <Toaster />
        </AppProvider>
        </QueryProvider>
    )
}
