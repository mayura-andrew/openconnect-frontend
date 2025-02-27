import { axiosInstance } from '../../../lib/axios'
import { SignUpRequest, SignUpResponse, ActivationResponse } from '../types'

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
    }
}