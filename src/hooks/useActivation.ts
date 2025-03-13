import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { authApi } from '../api'
import { ActivationResponse, ApiError, UseActivationReturn } from '../types'

export const useActivation = (): UseActivationReturn => {
    const navigate = useNavigate()

    const { mutate, isPending, isError, error, isSuccess } = useMutation<
        ActivationResponse,
        ApiError,
        string
    >({
        mutationFn: authApi.activateUser,
        onSuccess: () => {
            navigate('/auth/login')
        },
        onError: (error) => {
            // toast.error(error.message || 'Failed to activate account')
            console.log(error)
        },
    })

    return {
        activateUser: mutate,
        isLoading: isPending,
        isError,
        error,
        isSuccess,
    }
}
