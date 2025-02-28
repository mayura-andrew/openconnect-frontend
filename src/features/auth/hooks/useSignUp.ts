import { toast } from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { authApi } from '../api'
import {
    SignUpResponse,
    ApiError,
    SignUpRequest,
    UseSignUpReturn,
} from '../types'

export const useSignUp = (): UseSignUpReturn => {
    const { mutate, isPending, isError, error, isSuccess, reset } = useMutation<
        SignUpResponse,
        ApiError,
        SignUpRequest
    >({
        mutationFn: async (data: SignUpRequest) => {
            try {
                const response = await authApi.signUp(data)
                return response
            } catch (error: any) {
                throw error.response?.data || error
            }
        },
        onSuccess: (data) => {
            toast.success(
                'Registration successful! Please check your email for verification.', {
                    duration: 5000,
                    position: 'top-right'
                }
            )
            console.log(data)
        },
        onError: (error: any) => {
            if (error.error?.email) {
                toast.error('An account with this email already exists. Please sign in', {
                    duration: 5000,
                    position: 'top-right'
                })
            } else {
                toast.error(error.message || 'Registration failed. Please try again.', {
                    duration: 5000,
                    position: 'top-right'
                })
            }
        },
    })

    return {
        signUp: mutate,
        isLoading: isPending,
        isError,
        error,
        isSuccess,
        reset,
    }
}
