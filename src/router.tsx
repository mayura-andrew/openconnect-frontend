import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Activation from './pages/Auth/Activation'
import { ForgotPassword } from './pages/Auth/ForgotPassword'
import GoogleCallback from './pages/Auth/GoogleCallback'
import ResetPassword from './pages/Auth/ResetPassword'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'
import { PublicLayout } from './components/layout/PublicLayout.component'
import Community from './pages/Community'
import { AuthenticatedLayout } from './components/layout/AuthenticatedLayout'
import ProfileOnboarding from './pages/Onboarding'
import { OnboardingLayout } from './components/layout/OnboardingLayout'
import UserProfilePage from './components/common/profile/UserProfileView.component'
import MyProfileView from './components/common/profile/MyProfileView.component'
import MySubmissions from './components/common/profile/MySubmission.component'
import { ViewOtherUsersIdeas } from './components/common/profile/ViewOtherUserIdeas.component'

export const Router = () => {
    return (
        <Routes>
            <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/myprofile" element={<MyProfileView />} />
                <Route path="/community" element={<Community />} />
                <Route path="/profile/:userId" element={<UserProfilePage />} />
                <Route path="/mysubmission" element={<MySubmissions />} />
                <Route path="/view-ideas" element={<ViewOtherUsersIdeas />} />
            </Route>

            <Route path="/auth/login" element={<SignIn />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route
                path="/auth/signup/forgot-password"
                element={<ForgotPassword />}
            />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />
            <Route path="/auth/activate" element={<Activation />} />
            <Route path="/auth/callback" element={<GoogleCallback />} />

            <Route element={<AuthenticatedLayout />}>
                <Route element={<OnboardingLayout />}>
                    <Route path="/onboarding" element={<ProfileOnboarding />} />
                </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}
