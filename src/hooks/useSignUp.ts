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
        mutationFn: (data: SignUpRequest) => authApi.signUp(data),
        onSuccess: () => {
            toast.success(
                'Registration successful! Please check your email for verification.', {
                    duration: 5000,
                    position: 'top-right'
                }
            )
        },
        onError: (error: ApiError) => {
            // Only show toast for errors other than 'email already exists'
            const isEmailExistsError = 
                error.error?.email && 
                Array.isArray(error.error.email) && 
                error.error.email.some(msg => msg.includes('already exists'));
            
            if (!isEmailExistsError) {
                toast.error(error.message || 'Failed to create account', {
                    duration: 5000,
                    position: 'top-right'
                });
            }
        }
    });

    return {
        signUp: mutate,
        isLoading: isPending,
        isError,
        error,
        isSuccess,
        reset,
    }
}
