import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import SmartHeader from './Header/SmartHeader.componenet'

export const OnboardingLayout = () => {
    const { hasCompletedOnboarding } = useAuth()

    // If user has completed onboarding, redirect to dashboard
    if (hasCompletedOnboarding) {
        return <Navigate to="/myprofile" replace />
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <SmartHeader />
            <main className="flex-grow">
                <Outlet />
            </main>
        </div>
    )
}
