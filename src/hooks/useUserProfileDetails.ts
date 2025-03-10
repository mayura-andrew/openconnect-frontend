import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { profileApi } from '@/api';
import { UserProfileWithIdeas } from '@/types';

export function useUserProfileDetails(
  userId: string | undefined, 
  options?: Omit<UseQueryOptions<UserProfileWithIdeas, Error, UserProfileWithIdeas>, 'queryKey' | 'queryFn'>
) {
  return useQuery<UserProfileWithIdeas, Error>({
    queryKey: ['user-profile-details', userId],
    queryFn: () => profileApi.getUserProfileById(userId as string),
    enabled: !!userId && options?.enabled !== false,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    refetchOnWindowFocus: false,
    ...options
  });
}
