import { useNavigate } from 'react-router-dom'
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
    const navigate = useNavigate()

    const { mutate, isPending, isError, error, isSuccess, reset } = useMutation<
        SignUpResponse,
        ApiError,
        SignUpRequest
    >({
        mutationFn: authApi.signUp,
        onSuccess: (data) => {
            toast.success(
                'Registration successful! Please check your email for verification.'
            )
            console.log(data)
        },
        onError: (error) => {
            if (error.errors) {
                Object.entries(error.errors).forEach(([field, messages]) => {
                    messages.forEach((message) => {
                        toast.error(`${field}: ${message}`)
                    })
                })
            } else {
                toast.error(
                    error.message || 'Something went wrong during registration'
                )
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
