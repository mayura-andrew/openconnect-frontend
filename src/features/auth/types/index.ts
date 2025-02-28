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

export interface ValidationErrors {
    [key: string]: string[]
}
export type SignUpResponse = ApiResponse<User>

export interface ApiError {
  message: string;
  type?: 'auth_error' | 'validation_error' | 'server_error';
  errors?: Record<string, string[]>;
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

export interface SignInCredentials {
    email: string
    password: string
}

export interface AuthenticationToken {
    token: string
    expiry: string
}

export interface SignInResponse {
    authentication_token: AuthenticationToken
}

export interface UseSignInReturn {
    signIn: (credentials: SignInCredentials) => void
    isLoading: boolean
    isError: boolean
    error: ApiError | null
    isSuccess: boolean
    reset: () => void
}

export interface UseGoogleAuthReturn {
    googleSignIn: () => void
    isLoading: boolean
    isError: boolean
    error: ApiError | null
    isSuccess: boolean
}

export interface SignUpError extends  ApiError {
    errors?: {
        email?: string[]
        name?: string[]
        password?: string[]
    }
}

export interface SignUpValidationError {
    field: keyof SignUpRequest
    message: string
}