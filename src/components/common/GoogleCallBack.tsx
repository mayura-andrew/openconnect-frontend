import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LoadingScreen } from '@/components/common/LoadingScreen';
import toast from 'react-hot-toast';

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  
  // Extract token from URL parameters
  const token = searchParams.get('token');
  const returnPath = sessionStorage.getItem('googleAuthReturnTo') || '/';

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        if (!token) {
          setError('Authentication failed: No token received');
          toast.error('Authentication failed');
          navigate('/auth/login');
          return;
        }

        // Store the token for future API requests
        localStorage.setItem('token', token);
        
        // Remove return path from session storage
        sessionStorage.removeItem('googleAuthReturnTo');
        
        // If user data is already loaded (via AuthContext's useEffect)
        if (user) {
          console.log('Google auth successful:', user);
          console.log('Has completed profile:', !!user.has_completed_profile);
          
          // Navigate based on profile completion status
          if (user.has_completed_profile === false) {
            console.log('Redirecting to onboarding...');
            navigate('/onboarding');
          } else {
            console.log('Redirecting to community...');
            navigate('/community');
          }
        } else {
          // If user data isn't loaded yet, go to a safe default
          navigate('/');
        }
      } catch (err: any) {
        console.error('Google auth error:', err);
        setError(err.message || 'Authentication failed');
        toast.error(err.message || 'Authentication failed');
        navigate('/auth/login');
      }
    };

    handleGoogleCallback();
  }, [token, user, navigate]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-xl font-bold text-red-600 mb-4">Authentication Error</h1>
        <p className="text-gray-600">{error}</p>
        <button 
          onClick={() => navigate('/auth/login')}
          className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
        >
          Return to Login
        </button>
      </div>
    );
  }

  return <LoadingScreen message="Completing authentication..." />;
};

export default GoogleCallback;
