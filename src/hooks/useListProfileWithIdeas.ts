import { profileApi } from '@/api'
import { ProfileWithIdeasResponse, Idea } from '@/types'
import { useQuery } from '@tanstack/react-query'

// Define the structure for our transformed user profile
interface UserProfile {
    id: string
    name: string
    firstname?: string
    lastname?: string
    username: string
    email: string
    title: string
    faculty: string
    program: string
    bio?: string
    image?: string
    avatarURL?: string | File
    avatar?: string | File
    skills: string[]
    ideas: Idea[]
    linkedin?: string
    github?: string
    fb?: string
}

interface TransformedResponse {
    profiles: UserProfile[]
    count: number
}

export function useProfilesWithIdeas(limit: number = 20, offset: number = 0) {
    return useQuery<ProfileWithIdeasResponse, Error, TransformedResponse>({
        queryKey: ['profiles-with-ideas', limit, offset],
        queryFn: async () => {
            const response = await profileApi.getProfilesWithIdeas(
                limit,
                offset
            )
            return response
        },
        select: (data) => {
            // Transform the API response to match our component needs
            const transformedProfiles: UserProfile[] = data.profiles.map(
                (item) => {
                    const profile = item.profile

                    const avatarString =
                        typeof profile.avatar === 'string'
                            ? profile.avatar
                            : profile.avatar
                              ? URL.createObjectURL(profile.avatar)
                              : ''

                    const name =
                        `${profile.firstname || ''} ${profile.lastname || ''}`.trim()

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
                        image: avatarString,
                        avatarURL: profile.avatar || '',
                        avatar: profile.avatar,
                        skills: profile.skills || [],
                        ideas: item.ideas || [],
                        linkedin: profile.linkedin,
                        github: profile.github,
                        fb: profile.fb,
                    }
                }
            )

            return {
                profiles: transformedProfiles,
                count: data.count,
            }
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    })
}
