import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LoadingScreen } from '../common/LoadingScreen.component';

export const AdminRoute = () => {
  const { isAuthenticated, isLoading, isAdmin } = useAuth();
  
  if (isLoading) {
    return <LoadingScreen message="Checking admin access..." />;
  }
  
  if (!isAuthenticated) {
    console.log('User not authenticated, redirecting to login');
    return <Navigate to="/auth/login" replace />;
  }
  
  if (!isAdmin) {
    console.log('User is not an admin, redirecting to home');
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
};
