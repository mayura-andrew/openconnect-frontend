import { useParams, useNavigate } from 'react-router-dom'
import { useUserProfileDetails } from '@/hooks/useUserProfileDetails'
import { LoadingScreen } from '@/components/common/LoadingScreen'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
    Github,
    Linkedin,
    Facebook,
    ArrowLeft,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    BookOpen,
    School,
} from 'lucide-react'
import { ErrorState } from '@/components/common/EmptyState.component'

const UserProfilePage = () => {
    const { userId } = useParams<{ userId: string }>()
    const navigate = useNavigate()

    const {
        data: user,
        isLoading,
        isError,
        refetch,
    } = useUserProfileDetails(userId)

    const handleBack = () => {
        navigate(-1)
    }

    if (isLoading) {
        return <LoadingScreen message="Loading profile..." />
    }

    if (isError || !user) {
        return (
            <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-[70vh]">
                <ErrorState onRetry={() => refetch()} />
                <Button variant="ghost" onClick={handleBack} className="mt-4">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
                </Button>
            </div>
        )
    }

    // Calculate display name and initials
    const fullName = `${user.firstname || ''} ${user.lastname || ''}`.trim()
    const displayName = fullName || user.username || 'User'
    const initials = displayName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()

    // Avatar source
    const avatarSrc =  `${import.meta.env.VITE_API_URL}/avatars/${user.avatar}`
    
    console.log(avatarSrc)
        
    return (
        <div className="container mx-auto p-6">
            <Button variant="ghost" onClick={handleBack} className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Community
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Panel - Profile Info */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader className="flex flex-col items-center text-center">
                            <Avatar className="h-32 w-32">
                                <AvatarImage
                                    src={avatarSrc}
                                    alt={displayName}
                                />
                                <AvatarFallback className="text-3xl bg-primary/10">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <div className="space-y-1.5 mt-3">
                                <CardTitle className="text-xl">
                                    {displayName}
                                </CardTitle>
                                <p className="text-muted-foreground">
                                    {user.title}
                                </p>
                            </div>

                            {/* Contact options */}
                            <div className="flex space-x-2 mt-4">
                                <Button size="sm" variant="outline">
                                    Connect
                                </Button>
                                {user.email && (
                                    <Button size="sm" variant="outline" asChild>
                                        <a href={`mailto:${user.email}`}>
                                            <Mail className="h-4 w-4 mr-1" />{' '}
                                            Email
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </CardHeader>

                        <Separator />

                        <CardContent className="mt-4 space-y-4">
                            {/* Education info */}
                            <div>
                                <h3 className="font-medium mb-2 flex items-center">
                                    <BookOpen className="h-4 w-4 mr-2" />{' '}
                                    Education
                                </h3>
                                <div className="text-sm space-y-2">
                                    {user.degree && (
                                        <p className="font-medium">
                                            {user.degree}
                                        </p>
                                    )}
                                    {user.uni && <p>{user.uni}</p>}
                                    {user.faculty && (
                                        <p className="text-muted-foreground">
                                            {user.faculty}
                                        </p>
                                    )}
                                    {user.program && (
                                        <p className="text-muted-foreground">
                                            {user.program}
                                        </p>
                                    )}
                                    {user.year && (
                                        <p className="text-muted-foreground">
                                            Year: {user.year}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Skills */}
                            {user.skills && user.skills.length > 0 && (
                                <div>
                                    <h3 className="font-medium mb-2 flex items-center">
                                        <Briefcase className="h-4 w-4 mr-2" />{' '}
                                        Skills
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {user.skills.map((skill) => (
                                            <Badge
                                                key={skill}
                                                variant="secondary"
                                                className="text-xs"
                                            >
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Social links */}
                            <div>
                                <h3 className="font-medium mb-2">
                                    Social Media
                                </h3>
                                <div className="flex space-x-3">
                                    {user.linkedin && (
                                        <a
                                            href={user.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <Linkedin size={20} />
                                        </a>
                                    )}
                                    {user.github && (
                                        <a
                                            href={user.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-800 hover:text-black"
                                        >
                                            <Github size={20} />
                                        </a>
                                    )}
                                    {user.fb && (
                                        <a
                                            href={user.fb}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-700 hover:text-blue-900"
                                        >
                                            <Facebook size={20} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Panel - Bio and Ideas */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Bio */}
                    {user.bio && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">About</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm whitespace-pre-wrap">
                                    {user.bio}
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Ideas */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-lg">
                                Projects & Ideas
                            </CardTitle>
                            <Badge variant="outline">
                                {user.ideas_count || user.ideas?.length || 0}{' '}
                                {user.ideas?.length === 1 ? 'Idea' : 'Ideas'}
                            </Badge>
                        </CardHeader>
                        <CardContent>
                            {user.ideas && user.ideas.length > 0 ? (
                                <div className="space-y-4">
                                    {user.ideas.map((idea) => (
                                        <Card key={idea.id} className="p-4">
                                            <h3 className="font-medium">
                                                {idea.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {idea.description}
                                            </p>
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {idea.tags?.map((tag) => (
                                                    <Badge
                                                        key={tag}
                                                        variant="outline"
                                                        className="text-xs"
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-3">
                                                {new Date(
                                                    idea.created_at
                                                ).toLocaleDateString()}
                                            </p>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground text-sm">
                                    This user hasn't shared any ideas yet.
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default UserProfilePage
