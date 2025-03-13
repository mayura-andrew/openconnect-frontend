import { profileApi } from '@/api'
import { useAuth } from '@/context/AuthContext'
import { User } from '@/types'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export function useUserProfile() {
    const queryClient = useQueryClient()
    const { user: authUser } = useAuth()

    const {
        data: profile,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ['profile', authUser?.id],
        queryFn: () => profileApi.getCurrentUserProfile(),
        enabled: !!authUser?.id,
    })

    const { mutate: createProfile, isPending: isCreating } = useMutation({
        mutationFn: (data: Partial<User>) => profileApi.createProfile(data),
        onSuccess: (createdProfile) => {
            queryClient.setQueryData(['profile', authUser?.id], createdProfile)
            toast.success('Profile updated successfully')
        },

        onError: (error: any) => {
            toast.error(error.message || 'Failed to update profile')
        },
    })

    return {
        profile,
        isLoading,
        error,
        createProfile,
        isCreating,
        refetch,
    }
}
