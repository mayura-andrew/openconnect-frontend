import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { LoadingScreen } from '@/components/common/LoadingScreen.component'
import toast from 'react-hot-toast'

const GoogleCallback = () => {
    const [searchParams] = useSearchParams()
    const { handleGoogleAuth } = useAuth()
    const navigate = useNavigate()
    const [isProcessing, setIsProcessing] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Extract token from URL parameters
    const token = searchParams.get('token')

    useEffect(() => {
        const processGoogleAuth = async () => {
            try {
                if (!token) {
                    setError('Authentication failed: No token received')
                    toast.error('Authentication failed')
                    navigate('/auth/login')
                    return
                }

                // Process the Google auth with our context handler
                const user = await handleGoogleAuth(token)

                // Remove return path from session storage
                const returnPath =
                    sessionStorage.getItem('googleAuthReturnTo') || '/'
                sessionStorage.removeItem('googleAuthReturnTo')

                console.log('Google auth return path:', returnPath)
                // Navigate based on profile completion status
                if (user.has_profile_created === false) {
                    console.log('Redirecting to onboarding...')
                    navigate('/onboarding')
                } else {
                    console.log('Redirecting to community...')
                    navigate('/community')
                }
            } catch (err: any) {
                console.error('Google auth error:', err)
                setError(err.message || 'Authentication failed')
                toast.error(err.message || 'Authentication failed')
                navigate('/auth/login')
            } finally {
                setIsProcessing(false)
            }
        }

        processGoogleAuth()
    }, [token, handleGoogleAuth, navigate])

    if (isProcessing) {
        return <LoadingScreen message="Completing Google authentication..." />
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <h1 className="text-xl font-bold text-red-600 mb-4">
                    Authentication Error
                </h1>
                <p className="text-gray-600">{error}</p>
                <button
                    onClick={() => navigate('/auth/login')}
                    className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
                >
                    Return to Login
                </button>
            </div>
        )
    }

    return null
}

export default GoogleCallback
