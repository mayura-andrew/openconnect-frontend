import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { profileApi } from '@/api'
import { UserProfileWithIdeas, UserProfileByIdResponse } from '@/types'

export function useGetUserProfileDetailsByID(
    userId: string | undefined,
    options?: Omit<
        UseQueryOptions<UserProfileByIdResponse, Error, UserProfileWithIdeas>,
        'queryKey' | 'queryFn'
    >
) {
    return useQuery<UserProfileByIdResponse, Error, UserProfileWithIdeas>({
        queryKey: ['user-profile-details', userId],
        queryFn: () => profileApi.getUserProfileById(userId as string),
        select: (data) => data.response, // Assuming the data is nested under 'response'
        enabled: !!userId && options?.enabled !== false,
        staleTime: 5 * 60 * 1000, // 5 minutes cache
        refetchOnWindowFocus: false,
        ...options,
    })
}
