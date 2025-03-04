import { useState, useEffect, createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi, profileApi } from '@/api'
import toast from 'react-hot-toast'
import { User } from '@/types'

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, username: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<User>;
  hasCompletedOnboarding: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setIsLoading(true)
        const token = localStorage.getItem('token')
        if (!token) {
          setUser(null)
          return
        }
        
        const userData = await authApi.getCurrentUser()
        setUser(userData)
        setHasCompletedOnboarding(!!userData.hasCompletedProfile)
      } catch (error) {
        localStorage.removeItem('token')
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }
    
    checkAuthStatus()
  }, [])

  const updateProfile = async (data: Partial<User>) => {
    try {
      setIsLoading(true)
      const updatedUser = await profileApi.updateProfile(data)
      setUser(prevUser => prevUser ? { ...prevUser, ...updatedUser } : updatedUser)
      
      if (data.hasCompletedProfile) {
        setHasCompletedOnboarding(true)
      }
      
      toast.success('Profile updated successfully')
      return updatedUser
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await authApi.signIn({ email, password })
      localStorage.setItem('token', response.authentication_token.token)
      setUser(response.user)
      setHasCompletedOnboarding(!!response.user.hasCompletedProfile)
      
      // Let the login component or route guards handle navigation based on hasCompletedOnboarding
      toast.success('Successfully signed in!')
      return response.user
    } catch (error: any) {
      console.error('Login error:', error)
      toast.error(error?.message || 'Login failed')
      throw error
    } finally {
      setIsLoading(false)
    }
  }
  
  const signup = async (email: string, password: string, username: string) => {
    setIsLoading(true)
    try {
      await authApi.signUp({ email, password, username })
      // Don't navigate - wait for email activation
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/auth/login')
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      isAuthenticated: !!user,
      login,
      logout,
      signup,
      updateProfile,
      hasCompletedOnboarding
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}