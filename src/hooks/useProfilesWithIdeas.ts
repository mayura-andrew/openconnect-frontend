import { profileApi } from '@/api'
import { ProfileWithIdeasResponse, UserProfile } from '@/types'
import { useQuery } from '@tanstack/react-query'

interface TransformedResponse {
  profiles: UserProfile[];
  count: number;
}

export function useProfilesWithIdeas(limit: number = 20, offset: number = 0) {
    return useQuery<ProfileWithIdeasResponse, Error, TransformedResponse>({
        queryKey: ['profiles-with-ideas', limit, offset],
        queryFn: async () => {
            const response = await profileApi.getProfilesWithIdeas(limit, offset);
            return response;
        },
        select: (data) => {
            // Transform the API response to match our component needs
            const transformedProfiles: UserProfile[] = data.profiles.map(item => {
                const profile = item.profile;
                
                const name = `${profile.firstname || ''} ${profile.lastname || ''}`.trim();
                
                return {
                    id: profile.id,
                    name: name || profile.username || '',
                    firstname: profile.firstname,
                    lastname: profile.lastname,
                    username: profile.username,
                    email: profile.email,
                    title: profile.title || '',
                    faculty: profile.faculty || '',
                    program: profile.program || '',
                    bio: profile.bio,
                    image: profile.avatar_url || '',
                    avatarURL: profile.avatar_url,
                    avatar: profile.avatar,
                    skills: profile.skills || [],
                    ideas: item.ideas || [],
                    linkedin: profile.linkedin,
                    github: profile.github,
                    fb: profile.fb
                };
            });
            
            return {
                profiles: transformedProfiles,
                count: data.count
            };
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    })
}