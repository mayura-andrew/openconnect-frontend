import { axiosInstance } from '../../../lib/axios'
import {
    SignUpRequest,
    SignUpResponse,
    ActivationResponse,
    SignInCredentials,
    SignInResponse,
} from '../types'

export const authApi = {
    signUp: async (data: SignUpRequest): Promise<SignUpResponse> => {
        const response = await axiosInstance.post<SignUpResponse>('/users', data)
        return response.data
    },
    
    activateUser: async (token: string): Promise<ActivationResponse> => {
        const response = await axiosInstance.put<ActivationResponse>('/users/activated', {
            token
        })
        return response.data
    },

    signIn: async (credentials: SignInCredentials): Promise<SignInResponse> => {
        const response = await axiosInstance.post<SignInResponse>(
            '/auth/tokens/authentication',
            credentials
        )
        return response.data
    },

    googleSignIn: () => {
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/google/login`
    }
}
