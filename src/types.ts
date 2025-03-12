import { ReactNode } from 'react'

export interface ApiError {
  message?: string
  type?: 'auth_error' | 'validation_error' | 'server_error'
  error?: {
    // email?: string | string[]
    // username?: string | string[]
    // password?: string | string[]
    [key: string]: string | string[] | undefined
  }
}

export interface SignUpRequest {
  username: string
  email: string
  password: string
}

// User data returned after success
export interface UserData {
  id: string
  created_at: string
  username: string
  email: string
  user_type: string
  activated: boolean
  has_completed_profile: boolean
  version: number
}

export interface SignUpSuccessResponse {
  user: UserData
}

export interface SignUpErrorResponse {
  error: {
    [key: string]: string | string[] | undefined
  }
}

export type SignUpResponse = SignUpSuccessResponse | SignUpErrorResponse

export function isSignUpError(response: SignUpResponse): response is SignUpErrorResponse {
  return 'error' in response
}

export interface ActivationSuccessResponse {
  user: UserData
}

export interface ActivationErrorResponse {
  error: {
    [key: string]: string | string[] | undefined
  }
}
export type ActivationResponse = ActivationSuccessResponse | ActivationErrorResponse

export function isActivationError(
  response: ActivationResponse
): response is ActivationErrorResponse {
  return 'error' in response
}

export interface SignInCredentials {
  email: string
  password: string
}

export interface AuthToken {
  token: string
  expiry: string
}

export interface SignInSuccessResponse {
  authentication_token: AuthToken
}

export interface SignInErrorResponse {
  error: {
    [key: string]: string | string[] | undefined
  }
}

export type SignInResponse = SignInSuccessResponse | SignInErrorResponse

export function isSignInError(response: SignInResponse): response is SignInErrorResponse {
  return 'error' in response
}

export interface User extends UserData {
  firstname?: string
  lastname?: string
  title?: string
  bio?: string
  faculty?: string
  program?: string
  avatar?: string | File
  skills?: string[]
  linkedin?: string
  github?: string
  fb?: string
  uni?: string
  year?: string
  degree?: string
  mobile?: string
  updated_at?: string
}

export interface UserProfileResponse {
  profile: User
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ForgotPasswordResponse {
  message: string
  error?: ApiError
}

export interface ResetPasswordRequest {
  password: string
  token: string
}

export interface ResetPasswordResponse {
  message: string
  error?: ApiError
}

export interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<User | undefined>
  logout: () => void
  signup: (email: string, password: string, username: string) => Promise<void>
  createProfile: (data: Partial<User>) => Promise<User>
  hasCompletedOnboarding: boolean
  handleGoogleAuth: (token: string) => Promise<User>
}

export interface UseActivationReturn {
  activateUser: (token: string) => void
  isLoading: boolean
  isError: boolean
  error: ApiError | null
  isSuccess: boolean
}

export interface UseForgotPasswordReturn {
  requestReset: (data: ForgotPasswordRequest) => void
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

export interface UseResetPasswordReturn {
  resetPassword: (data: ResetPasswordRequest) => void
  isLoading: boolean
  isError: boolean
  error: ApiError | null
  isSuccess: boolean
  reset: () => void
}

export interface UseSignInReturn {
  signIn: (credentials: SignInCredentials) => void
  isLoading: boolean
  isError: boolean
  error: ApiError | null
  isSuccess: boolean
  reset: () => void
}

export interface UseSignUpReturn {
  signUp: (data: SignUpRequest) => void
  isLoading: boolean
  isError: boolean
  error: ApiError | null
  isSuccess: boolean
  reset: () => void
}

export interface Idea {
  id: string
  title: string
  description: string
  created_at: string
  updated_at: string
  user_id: string
  idea_source_id?: string
  pdf?: string
  category?: string
  tags?: string[] | null
  status?: string
  learning_outcome?: string
  recommended_level?: string
  github_link?: string
  website_link?: string
  version?: number
  feedback?: string
}

export interface UserProfileWithIdeas {
  profile: User
  ideas: Idea[]
  ideas_count: number
  limit?: number
  offset?: number
}

export interface UserProfileByIdResponse {
  response: UserProfileWithIdeas
}

export interface ProfileWithIdeas {
  profile: User
  ideas: Idea[]
}

export interface ProfileWithIdeasResponse {
  count: number
  profiles: ProfileWithIdeas[]
}

export interface SuccessMessageProps {
  title: string
  description: string
}

export interface SuccessMessageModalProps extends SuccessMessageProps {
  isOpen: boolean
  onClose: () => void
  email?: string
  type?: 'signup' | 'accountExists' | 'passwordReset' | 'passwordResetComplete'
}

export interface EmptyStateProps {
  title: string
  description: string
  icon?: ReactNode
  actionLabel?: string
  onAction?: () => void
  secondaryActionLabel?: string
  onSecondaryAction?: () => void
}

export interface ProfileOnboardingData {
  firstname?: string
  lastname?: string
  title: string
  faculty: string
  program: string
  degree: string
  year: string
  uni: string
  mobile?: string
  bio?: string
  skills: string[]
  linkedin: string
  github: string
  fb: string
  avatar?: File | string
}

export interface IdeaSubmissionRequest {
  title: string
  description: string
  pdf?: string
  category: string
  tags: string[]
  user_id?: string
  learning_outcome: string
  recommended_level: string
  github_link?: string
  website_link?: string
}

export interface IdeaSubmissionResponse {
  idea: {
    id: string
    title: string
    description: string
    created_at: string
    updated_at: string
    user_id: string
    idea_source_id?: string
    pdf?: string
    category?: string
    tags?: string[]
    status?: string
    learning_outcome?: string
    recommended_level?: string
    github_link?: string
    website_link?: string
    version?: number
  }
}
