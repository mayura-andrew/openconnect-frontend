import { axiosInstance } from '@/lib/axios'
import {
    SignUpRequest,
    SignUpResponse,
    ActivationResponse,
    SignInCredentials,
    SignInResponse,
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    ResetPasswordRequest,
    ResetPasswordResponse,
    User,
    ProfileResponse,
    ProfileWithIdeasResponse,
    UserProfileWithIdeas,
    Idea,
    UserProfileDetailResponse,
} from '../types'

export const authApi = {
    signUp: async (data: SignUpRequest): Promise<SignUpResponse> => {
        try {
            const response = await axiosInstance.post<SignUpResponse>(
                '/users',
                data
            )

            if (response.data && response.data.error) {
                throw {
                    error: response.data.error,
                    status: response.status,
                    isResponseError: true,
                }
            }

            return response.data
        } catch (error: any) {
            if (error.isResponseError) {
                throw error
            }

            if (error.response?.data) {
                throw error.response.data
            }

            throw { message: 'An unexpected error occurred' }
        }
    },

    activateUser: async (token: string): Promise<ActivationResponse> => {
        const response = await axiosInstance.put<ActivationResponse>(
            '/users/activated',
            {
                token,
            }
        )
        return response.data
    },

        signIn: async (credentials: SignInCredentials): Promise<SignInResponse> => {
        try {
            const response = await axiosInstance.post<{
                authentication_token: {
                    token: string;
                    expiry: string;
                };
            }>('/auth/tokens/authentication', credentials);
    
            // Store the token immediately for subsequent requests
            if (response.data.authentication_token) {
                localStorage.setItem(
                    'token',
                    response.data.authentication_token.token
                );
                localStorage.setItem(
                    'token_expiry',
                    response.data.authentication_token.expiry
                );
    
                // Now fetch the user profile with the new token
                try {
                    const userResponse = await profileApi.getCurrentProfile();
                    console.log('userResponse', userResponse);
                    
                    // Extract the correct user profile from the nested response
                    let profileData;
                    
                    // Check if the response has the nested profile structure
                    if (userResponse.profile && typeof userResponse.profile === 'object') {
                        profileData = userResponse.profile;
                    } else if (userResponse.hasProfileCreated && userResponse.profile) {
                        profileData = userResponse.profile;
                    } else {
                        profileData = userResponse;
                    }
                    
                    // Return combined data with properly structured user data
                    return {
                        authentication_token: response.data.authentication_token,
                        user: profileData
                    };
                } catch (profileError) {
                    // If profile fetch fails, remove token and rethrow
                    localStorage.removeItem('token');
                    localStorage.removeItem('token_expiry');
                    console.error("Failed to fetch user profile after login:", profileError);
                    throw new Error("Authentication succeeded but couldn't load user profile");
                }
            } else {
                throw new Error("Authentication token not received from server");
            }
        } catch (error: any) {
            if (error.response?.data?.error) {
                throw { message: error.response.data.error };
            }
            throw error;
        }
    },
googleSignIn: () => {
    const backendUrl = import.meta.env.VITE_API_URL;
    
    // Clean up any existing tokens
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiry');
    sessionStorage.removeItem('googleAuthState');

    // Save the current path to return to after authentication
    sessionStorage.setItem('googleAuthReturnTo', window.location.pathname);

    // Redirect to backend Google auth endpoint
    window.location.href = `${backendUrl}/auth/google/login`;
},

// Add this new method for handling the Google OAuth callback
processGoogleCallback: async (token: string): Promise<User> => {
    try {
        // Store the token for subsequent requests
        localStorage.setItem('token', token);
        
        // Use the token to fetch the user profile
        const userResponse = await profileApi.getCurrentProfile();
        console.log('Google Auth userResponse:', userResponse);
        
        // Extract the correct user profile from the nested response
        let profileData;
        
        // Check if the response has the nested profile structure
        if (userResponse.profile && typeof userResponse.profile === 'object') {
            profileData = userResponse.profile;
        } else if (userResponse.has_completed_profile && userResponse.profile) {
            profileData = userResponse.profile;
        } else {
            profileData = userResponse;
        }
        
        return profileData;
    } catch (error) {
        console.error("Failed to process Google authentication:", error);
        localStorage.removeItem('token');
        throw error;
    }
},

    requestPasswordReset: async (
        data: ForgotPasswordRequest
    ): Promise<ForgotPasswordResponse> => {
        try {
            const response = await axiosInstance.post<ForgotPasswordResponse>(
                '/auth/tokens/password-reset-request',
                data
            )

            if (response.data && response.data.error) {
                throw {
                    error: response.data.error,
                    status: response.status,
                    isResponseError: true,
                }
            }

            return response.data
        } catch (error: any) {
            if (error.isResponseError) {
                throw error
            }

            if (error.response?.data) {
                throw error.response.data
            }

            throw { message: 'An unexpected error occurred' }
        }
    },

    resetPassword: async (
        data: ResetPasswordRequest
    ): Promise<ResetPasswordResponse> => {
        try {
            const response = await axiosInstance.put<ResetPasswordResponse>(
                '/users/password-reset',
                data
            )

            if (response.data && response.data.error) {
                throw {
                    error: response.data.error,
                    status: response.status,
                    isResponseError: true,
                }
            }

            return response.data
        } catch (error: any) {
            if (error.isResponseError) {
                throw error
            }

            if (error.response?.data) {
                throw error.response.data
            }

            throw { message: 'An unexpected error occurred' }
        }
    },

    getCurrentUser: async (): Promise<User> => {
        try {
            const response =
                await axiosInstance.get<ProfileResponse>('/profile')

            if (response.data && response.data.error) {
                throw {
                    error: response.data.error,
                    status: response.status,
                    isResponseError: true,
                }
            }
            // Backend returns data in an envelope with "profile" key
            return response.data.profile
        } catch (error: any) {
            if (error.isResponseError) {
                throw error
            }

            if (error.response?.data) {
                throw error.response.data
            }

            throw { message: 'Failed to fetch current user profile' }
        }
    },
}

export const profileApi = {
        getCurrentProfile: async (): Promise<User> => {
        const response = await axiosInstance.get<ProfileResponse>('/profile');
        
        // Handle nested profile structure
        if (response.data?.has_completed_profile && response.data?.profile) {
            return response.data.profile;
        }
        
        // Handle standard profile structure
        if (response.data?.profile) {
            return response.data.profile;
        }
        
        // Fallback
        return response.data as any;
    },

    updateProfile: async (data: Partial<User>): Promise<User> => {
        const response = await axiosInstance.put<ProfileResponse>(
            '/profile/new',
            data
        )
        return response.data.profile
    },

    getProfilesWithIdeas: async (
        limit: number,
        offset: number = 0
    ): Promise<ProfileWithIdeasResponse> => {
        const response = await axiosInstance.get<ProfileWithIdeasResponse>(
            '/profiles-with-ideas',
            {
                params: { limit, offset },
            }
        )
        return response.data
    },

    getUserProfileById: async (
        userId: string
    ): Promise<UserProfileWithIdeas> => {
        try {
            const response = await axiosInstance.get<UserProfileDetailResponse>(
                `/profiles/id/${userId}`
            )

            // Access the correct nested structure
            const profileData = response.data.response
            const profile = profileData.profile
            const ideas = profileData.ideas || []

            // Create a complete user profile with ideas
            const userProfile: UserProfileWithIdeas = {
                id: profile.id,
                name: `${profile.firstname || ''} ${profile.lastname || ''}`.trim(),
                firstname: profile.firstname,
                lastname: profile.lastname,
                username: profile.username,
                email: profile.email,
                title: profile.title || '',
                faculty: profile.faculty || '',
                program: profile.program || '',
                bio: profile.bio,
                image: profile.avatar_url || profileData.avatarURL || '',
                avatarURL: profile.avatar_url || profileData.avatarURL,
                avatar: profile.avatar,
                skills: profile.skills || [],
                ideas: ideas,
                ideas_count: profileData.ideas_count,
                linkedin: profile.linkedin,
                github: profile.github,
                fb: profile.fb,
                uni: profile.uni,
                year: profile.year,
                degree: profile.degree,
                mobile: profile.mobile,
                created_at: profile.created_at,
                updated_at: profile.updated_at,
                has_completed_profile: profile.has_completed_profile,
                user_type: profile.user_type,
            }

            return userProfile
        } catch (error) {
            console.error('Error fetching user profile:', error)
            throw error
        }
    },
}
// uploadProfileImage: async (file: File): Promise<{url: string}> => {
//     const formData = new FormData()
//     formData.append('avatar', file)
//     const response = await axiosInstance.post('/user/profile/avatar', formData)
//     return response.data
// },

// updateSkills: async (skills: strings[]): Promise<User> => {
//     const response = await axiosInstance.put('/user/profile/skills', {skills})
//     return response.data
// },

// getProfileByUsername: async (username: string): Promise<User> => {
//     const response = await axiosInstance.get<User>(`/users/profile/${username}`)
//     return response.data
// }

// searchProfiles: async (query: string, filters?: Record<string, any>): Promise<User[]> => {
//     const response = await axiosInstance.get<User[]>('/user/profiles/search', {
//         params: {
//             query,
//             ...filters
//         }
//     })
//     return response.data
// }
