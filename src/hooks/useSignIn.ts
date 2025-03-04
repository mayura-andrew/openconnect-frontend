// src/hooks/useSignIn.ts
import { useAuth } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { 
  SignInCredentials, 
  ApiError,
  UseSignInReturn
} from '@/types'
import { useState } from 'react'
import toast from 'react-hot-toast'

export const useSignIn = (): UseSignInReturn => {
  const { login, isLoading } = useAuth()
  const navigate = useNavigate()
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const signIn = async (credentials: SignInCredentials) => {
    setIsError(false)
    setError(null)
    
    try {
      const user = await login(credentials.email, credentials.password)
      setIsSuccess(true)
      
      // Navigate user based on their onboarding status
      if (!user.hasCompletedProfile) {
        navigate('/onboarding')
      } else {
        navigate('/profile')
      }
      
      return user
    } catch (err: any) {
      setIsError(true)
      setError(err)
      throw err
    }
  }
  
  const reset = () => {
    setIsError(false)
    setError(null)
    setIsSuccess(false)
  }

  return {
    signIn,
    isLoading,
    isError,
    error,
    isSuccess,
    reset,
  }
}