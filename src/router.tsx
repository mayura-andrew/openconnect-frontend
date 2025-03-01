import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import SignIn  from './pages/Auth/SignIn'
import  SignUp  from './pages/Auth/SignUp'
import { ForgotPassword } from './pages/Auth/ForgotPassword'
import { ChangePassword } from './pages/Auth/ChangePassword'
import  Activation from './pages/Auth/Activation'
import GoogleCallback  from './pages/Auth/GoogleCallback'

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
        path: '/login',
        element: <SignIn />,
    },
    {
        path: '/signup',
        element: <SignUp />,
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />,
    },
    {
        path: '/reset-password',
        element: <ChangePassword />,
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