import { profileApi } from '@/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

interface ProfileUpdateInput {
    firstname?: string
    lastname?: string
    avatar?: string
    title?: string
    bio?: string
    faculty?: string
    program?: string
    degree?: string
    year?: string
    uni?: string
    mobile?: string
    linkedin?: string
    github?: string
    fb?: string
    skills?: string[]
}

export function useProfileUpdate() {
    const queryClient = useQueryClient()

    const {
        mutate: updateProfile,
        isPending: isUpdating,
        isError,
        error,
        isSuccess,
        reset,
    } = useMutation({
        mutationFn: async (profileData: ProfileUpdateInput) => {
            return await profileApi.updateProfile(profileData)
        },
        onSuccess: (updatedProfile) => {
            // Update the profile in the cache
            queryClient.invalidateQueries({
                queryKey: ['user-profile-details'],
            })

            // Update the current user profile cache as well
            queryClient.setQueryData(['profile'], updatedProfile)

            console.log('Updated profile:', updatedProfile)

            toast.success('Profile updated successfully')
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to update profile')
        },
    })

    return {
        updateProfile,
        isUpdating,
        isError,
        error,
        isSuccess,
        reset,
    }
}
