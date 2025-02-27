export interface SignUpRequest {
    name: string
    email: string
    password: string
}

export interface User {
    id: string
    name: string
    email: string
    activated: boolean
    created_at: string
    version: number
}

export interface ApiResponse<T> {
    user: T
}

export interface ValidationError {
    field: string
    message: string
}

export type SignUpResponse = ApiResponse<User>

export interface ApiError {
    message: string
    errors?: Record<string, string[]>
}

export interface SignUpHookResult {
    signUp: (data: SignUpRequest) => void
    isLoading: boolean
    isError: boolean
    error: ApiError | null
    isSuccess?: boolean
    reset?: () => void
}

export interface UseSignUpReturn {
    signUp: (data: SignUpRequest) => void
    isLoading: boolean
    isError: boolean
    error: ApiError | null
    isSuccess: boolean
    reset: () => void
}

export interface ActivationResponse {
    user: User
}

export interface UseActivationReturn {
    activateUser: (token: string) => void
    isLoading: boolean
    isError: boolean
    error: ApiError | null
    isSuccess: boolean
}