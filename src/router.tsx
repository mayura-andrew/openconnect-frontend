// src/router.tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { PublicLayout } from './components/layout/PublicLayout'
import { AuthenticatedLayout } from './components/layout/AuthenticatedLayout'
import { OnboardingLayout } from './components/layout/OnboardingLayout'
import { MainLayout } from './components/layout/MainLayout'

// Pages
import Home from './pages/Home'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'
import ProfileOnboarding from './pages/Onboarding/index'
import { MyProfileLayout } from './components/layout/MyProfileLayout'
import MySubmissions from './components/layout/MySubmissions'
import { ViewOtherUsersIdeas } from './components/layout/ViewOtherUsersIdeas'
import { ForgotPassword } from './pages/Auth/ForgotPassword'
import Community from './pages/Community'
import { Feed } from './pages/Feed/index'
import ResetPassword from './pages/Auth/ResetPassword'
import Activation from './pages/Auth/Activation'
import GoogleCallback from './pages/Auth/GoogleCallback'
import UserProfilePage from './components/common/UserProfile'
import { PublicHeaderLayout } from './components/layout/PublicHeaderLayout'


export const Router = () => {
    return (
        <Routes>
            {/* Public Routes with Public Header */}
            <Route element={<PublicHeaderLayout />}>
                <Route path="/" element={<Home />} />
                
            </Route>

            {/* Auth Routes */}
            <Route element={<PublicLayout />}>
                <Route path="/auth/login" element={<SignIn />} />
                <Route path="/auth/signup" element={<SignUp />} />
                <Route path="/auth/forgot-password" element={<ForgotPassword />} />
                <Route path="/auth/reset-password" element={<ResetPassword />} />
                <Route path="/auth/activation" element={<Activation />} />
                <Route path="/auth/google/callback" element={<GoogleCallback />} />
            </Route>

            {/* Protected Routes with Dynamic Header (based on auth state) */}
            <Route element={<AuthenticatedLayout />}>
                <Route element={<MainLayout />}>
                <Route path="/community" element={<Community />} />
                <Route path="/profile/:userId" element={<UserProfilePage />} />
                    <Route path="/profile/:userId" element={<UserProfilePage />} />
                    <Route path="/profile" element={<MyProfileLayout />} />
                    <Route path="/my-submissions" element={<MySubmissions />} />
                    <Route path="/view-ideas" element={<ViewOtherUsersIdeas />} />
                    <Route path="/feed" element={<Feed />} />
                </Route>
            </Route>

            {/* Onboarding Routes */}
            <Route element={<OnboardingLayout />}>
                <Route path="/onboarding" element={<ProfileOnboarding />} />
            </Route>

            {/* Catch All */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}