import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'
import { ForgotPassword } from './pages/Auth/ForgotPassword'
import { ResetPassword } from './pages/Auth/ResetPassword'
import Activation from './pages/Auth/Activation'
import GoogleCallback from './pages/Auth/GoogleCallback'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        children: [
            {
                index: true,
                element: <Home />,
            },
        ],
    },
    // Auth routes (separate from main layout)
    {
        path: '/auth/login',
        element: <SignIn />,
    },
    {
        path: '/auth/signup',
        element: <SignUp />,
    },
    {
        path: '/auth/forgot-password',
        element: <ForgotPassword />,
    },
    {
        path: '/auth/reset-password',
        element: <ResetPassword />,
    },
    {
        path: '/auth/activate',
        element: <Activation />,
    },
    {
        path: '/auth/callback',
        element: <GoogleCallback />,
    },
    // Legacy paths for backward compatibility
    {
        path: '/auth/signin',
        element: <SignIn />,
    },
    {
        path: '/auth/signup',
        element: <SignUp />,
    },
])
