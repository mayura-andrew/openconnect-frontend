// src/App.tsx
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { AppProvider } from './context/AppContext'
import { QueryProvider } from './features/auth/providers/QueryProvider'

export function App() {
    return (
        <QueryProvider>
            <AppProvider>
                <RouterProvider router={router} />
            </AppProvider>
        </QueryProvider>
    )
}
