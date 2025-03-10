import { useQuery } from '@tanstack/react-query';
import { profileApi } from '@/api';
import { UserProfileWithIdeas } from '@/types';

interface UseUserProfileDetailsOptions {
  enabled?: boolean;
  onSuccess?: (data: UserProfileWithIdeas) => void;
  onError?: (error: unknown) => void;
}

export function useUserProfileDetails(userId: string | undefined, options?: UseUserProfileDetailsOptions) {
  return useQuery<UserProfileWithIdeas>({
    queryKey: ['user-profile-details', userId],
    queryFn: () => profileApi.getUserProfileById(userId as string),
    enabled: !!userId && (options?.enabled !== false),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    refetchOnWindowFocus: false,
  });
}
