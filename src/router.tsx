import { useAuth } from './context/AuthContext'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'
import { ForgotPassword } from './pages/Auth/ForgotPassword'
import { ResetPassword } from './pages/Auth/ResetPassword'
import Activation from './pages/Auth/Activation'
import GoogleCallback from './pages/Auth/GoogleCallback'
import Dashboard from './pages/Dashboard/Dashboard'
import ProfileOnboarding from './pages/Onboarding/ProfileOnboarding'
// import ProfileView from './pages/Profile/ProfileView'
import { MainLayout } from './components/layout/MainLayout'
import { MyProfileLayout } from './components/layout/MyProfileLayout'
import Spinner from './components/Spinner/Spinner.component'
import MySubmissions from './components/layout/MySubmissions'
import { ViewOtherUsersIdeas } from './components/layout/ViewOtherUsersIdeas'
import toast from 'react-hot-toast'
import { useEffect } from 'react'

// Protected route component
const ProtectedRoute = ({ 
  children, 
  requiresAuth = true,
  requiresOnboarding = false,
}: { 
  children: React.ReactNode, 
  requiresAuth?: boolean,
  requiresOnboarding?: boolean 
}) => {
  const { isAuthenticated, isLoading, hasCompletedOnboarding } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }
  
  if (requiresAuth && !isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }
  
  // Redirect to onboarding if profile is incomplete
  if (requiresOnboarding && !hasCompletedOnboarding) {
    toast.error("Please complete your profile before accessing this page");
    return <Navigate to="/onboarding" />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { isLoading, isAuthenticated, hasCompletedOnboarding } = useAuth();
  const navigate = useNavigate()
  
  useEffect(() => {
    // Global route guard to ensure proper flow
    if (isAuthenticated && !hasCompletedOnboarding) {
      const currentPath = window.location.pathname;
      if (currentPath !== '/onboarding' && !currentPath.startsWith('/auth/')) {
        navigate('/onboarding');
      }
    }
  }, [isAuthenticated, hasCompletedOnboarding]);
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }
  
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
      
      {/* Auth routes - unprotected */}
      <Route path="/auth/login" element={<SignIn />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
      <Route path="/auth/activate" element={<Activation />} />
      <Route path="/auth/callback" element={<GoogleCallback />} />
      
      {/* Onboarding - requires auth but not completed profile */}
      <Route path="/onboarding" element={
        <ProtectedRoute requiresAuth={true} requiresOnboarding={false}>
          <ProfileOnboarding />
        </ProtectedRoute>
      } />
      
      {/* Protected routes - require authentication and completed profile */}
      <Route path="/profile" element={
        <ProtectedRoute requiresAuth={true} requiresOnboarding={true}>
          <MyProfileLayout />
        </ProtectedRoute>
      } />
      
     
      
      <Route path="/dashboard" element={
        <ProtectedRoute requiresAuth={true} requiresOnboarding={true}>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/my-submissions" element={
        <ProtectedRoute requiresAuth={true} requiresOnboarding={true}>
          <MySubmissions />
        </ProtectedRoute>
      } />
      
      <Route path="/view-ideas" element={
        <ProtectedRoute requiresAuth={true} requiresOnboarding={true}>
          <ViewOtherUsersIdeas />
        </ProtectedRoute>
      } />
      
      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;