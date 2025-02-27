import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/components/layout/MainLayout'
import Home from '@/app/page'
import SignIn from '@/features/auth/components/SignIn'
import SignUp from '@/features/auth/components/SignUp'
import Activation from '@/features/auth/components/Activation'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'auth/signin',
                element: <SignIn />,
            },
            {
                path: 'auth/signup',
                element: <SignUp />,
            },
            {
                path: 'auth/activate',
                element: <Activation />,
            },
        ],
    },
])
