export interface ProfileWithIdeasResponse {
    profiles: {
        profile: {
            id: string
            username?: string
            email?: string
            user_type?: string
            firstname?: string
            lastname?: string
            year?: string
            avatar?: string
            avatar_url?: string
            title?: string
            bio?: string
            faculty?: string
            program?: string
            degree?: string
            uni?: string
            mobile?: string
            linkedin?: string
            github?: string
            fb?: string
            skills: string[]
            has_completed_profile?: boolean
            created_at?: string
            updated_at?: string
        }
        ideas: Idea[]
    }[]
    count: number
}

// What we transform the API response into for our components
export interface TransformedProfilesResponse {
    profiles: UserProfile[]
    count: number
}

// export interface User {
//     id: string
//     username: string
//     email: string
//     user_type?: string
//     profile?: UserProfile
//     has_completed_profile?: boolean


export interface ProfileResponse {
    has_completed_profile?: boolean
    profile: User
    error?: string
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

export interface ProfessionalNetworkGridProps {
    users: UserProfile[]
    searchQuery: string
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    facultyFilter: string
    sortBy: string
    onFacultyChange: (value: string) => void
    onSortChange: (value: string) => void
    filteredUsers: UserProfile[]
    totalCount?: number
    currentPage?: number
    onPageChange?: (page: number) => void
    limit?: number
}

export interface RouterContext {
    requests: Array<{
        id: number
        name: string
        title: string
        image: string
    }>
    users: UserProfile[]
    isRequestPanelOpen: boolean
    setIsRequestPanelOpen: (isOpen: boolean) => void
}

export interface SearchParams {
    query: string
    page: number
    limit: number
}

export interface ProfessionalNetworkHeaderProps {
    searchQuery: string
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    facultyFilter: string
    sortBy: string
    onFacultyChange: (value: string) => void
    onSortChange: (value: string) => void
    totalUsers: number
    filteredUsers: number
}

export interface SignUpRequest {
    username: string
    email: string
    password: string
}
export interface ApiResponse<T> {
    user: T
    error?: ApiError
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
    message?: string
    type?: 'auth_error' | 'validation_error' | 'server_error'
    error?: {
        email?: string | string[]
        username?: string | string[]
        password?: string | string[]
        [key: string]: string | string[] | undefined
    }
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

export interface SignInResponse {
    authentication_token: AuthenticationToken
    user: User
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

export interface SignUpError extends ApiError {
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

export interface SuccessMessageProps {
    title: string
    description: string
}

export interface ForgotPasswordRequest {
    email: string
}

export interface ForgotPasswordResponse {
    message: string
    error?: ApiError
}

export interface UseForgotPasswordReturn {
    requestReset: (data: ForgotPasswordRequest) => void
    isLoading: boolean
    isError: boolean
    error: ApiError | null
    isSuccess: boolean
    reset: () => void
}

export interface ResetPasswordRequest {
    password: string
    token: string
}

export interface ResetPasswordResponse {
    message: string
    error?: ApiError
}

export interface UseResetPasswordReturn {
    resetPassword: (data: ResetPasswordRequest) => void
    isLoading: boolean
    isError: boolean
    error: ApiError | null
    isSuccess: boolean
    reset: () => void
}

export interface SuccessMessageModalProps extends SuccessMessageProps {
    isOpen: boolean
    onClose: () => void
    email?: string
    type?:
        | 'signup'
        | 'accountExists'
        | 'passwordReset'
        | 'passwordResetComplete'
}

// First, update the Idea interface to match what's coming from the backend
export interface Idea {
    id: string
    title: string
    description: string
    created_at: string
    updated_at: string
    user_id: string
    idea_source_id: string
    pdf?: string
    category: string
    tags: string[]
    status: string
    learning_outcome?: string
    recommended_level?: string
    github_link?: string
    website_link?: string
    version: number
}

// Create an interface for the user profile API response
export interface UserProfileDetailResponse {
    response: {
        avatarURL: string
        ideas: Idea[]
        ideas_count: number
        limit: number
        offset: number
        profile: {
            id: string
            username: string
            email: string
            user_type: string
            firstname?: string
            lastname?: string
            year?: string
            avatar?: string
            avatar_url?: string
            title?: string
            bio?: string
            faculty?: string
            program?: string
            degree?: string
            uni?: string
            mobile?: string
            linkedin?: string
            github?: string
            fb?: string
            skills: string[]
            has_completed_profile: boolean
            created_at: string
            updated_at: string
        }
    }
}

// Extend the UserProfileWithIdeas to include additional fields from the response
export interface UserProfileWithIdeas extends UserProfile {
    ideas: Idea[]
    ideas_count?: number
    degree?: string
    uni?: string
    mobile?: string
    created_at?: string
    updated_at?: string
    has_completed_profile?: boolean
    user_type?: string
}


export interface BaseUser {
    id: string
    username: string
    email: string
    user_type?: string
    has_completed_profile?: boolean
}

export interface ProfileData {
    firstname?: string;
    lastname?: string;
    title?: string;
    faculty?: string;
    program?: string;
    bio?: string;
    uni?: string;
    year?: string;
    degree?: string;
    avatar?: string;
    avatar_url?: string;
    mobile?: string;
    linkedin?: string;
    github?: string;
    fb?: string;
    skills?: string[];
    created_at?: string;
    updated_at?: string;
}
  
export interface User extends BaseUser, ProfileData {
    profile?: ProfileData;
}

export interface UserProfile extends BaseUser, ProfileData {
    name?: string;
    image?: string;
    avatarURL?: string;
}
export interface UserProfileWithIdeas extends UserProfile {
    ideas: Idea[];
    ideas_count?: number;
} 

export interface ProfileResponse {
    profile: User;
    hasProfileCreated?: boolean;
    has_completed_profile?: boolean;
    error?: string;
  }
  
  // Authentication token structure
export interface AuthenticationToken {
    token: string;
    expiry: string;
  }
