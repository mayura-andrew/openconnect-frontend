import { useAuth } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useLoading } from '@/context/LoadingContext'
import { SignInCredentials, ApiError, UseSignInReturn } from '@/types'
import { useState } from 'react'

export const useSignIn = (): UseSignInReturn => {
    const { login } = useAuth()
    const { startLoading, stopLoading } = useLoading()
    const navigate = useNavigate()
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState<ApiError | null>(null)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const signIn = async (credentials: SignInCredentials) => {
        setIsError(false)
        setError(null)
        setIsLoading(true)
        startLoading('Signing in...')

        try {
            const user = await login(credentials.email, credentials.password)
            setIsSuccess(true)

            console.log('user', user)
            console.log(
                'User has completed profile:',
                user?.has_completed_profile
            )

            
            // Navigate based on profile completion
            if (user?.has_completed_profile == false) {
                console.log('Redirecting to onboarding...')
                navigate('/onboarding')
            } else if (user?.user_type === 'admin') {
                console.log('Redirecting to admin dashboard...')
                navigate('/admin/ideas')
            } else {
                console.log('Redirecting to community...')
                navigate('/community')
            }

            return user
        } catch (err: any) {
            setIsError(true)
            const errorMessage =
                err?.message || 'Failed to sign in. Please try again.'
            setError({ message: errorMessage })
            throw { message: errorMessage }
        } finally {
            setIsLoading(false)
            stopLoading()
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
