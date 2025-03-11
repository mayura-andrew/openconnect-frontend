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
    Briefcase,
    BookOpen,
    School,
    User,
    GraduationCap,
    University,
} from 'lucide-react'
import { ErrorState } from '@/components/common/EmptyState.component'
import { SkillsSection } from '@/components/profile/SkillsSection'
import { MyProConnections } from '@/components/profile/MyProConnections'
import { ProjectsIdeas } from '@/components/profile/ProjectsIdeas'

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
    const avatarSrc = `${import.meta.env.VITE_API_URL}/avatars/${user.avatar}`

    console.log(avatarSrc)

    return (
        <div className="bg-gray-50">
            <div className="p-6 min-h-screen">
                <Button variant="ghost" onClick={handleBack} className="mb-6">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Community
                </Button>
            </div>
            {/* Main Content */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Panel */}
                <div className="flex flex-col lg:col-span-1 gap-6">
                    <Card>
                        <CardHeader className="flex flex-col items-center p-6">
                            <Avatar className="w-32 h-32">
                                <AvatarImage
                                    src={avatarSrc}
                                    alt={displayName}
                                />
                                <AvatarFallback className="text-5xl">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <CardTitle className="text-lg font-bold text-center pt-2">
                                {displayName}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {user.title}
                            </p>
                            <Separator className="my-4" />
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm text-left">
                            {[
                                {
                                    icon: User,
                                    label: 'Full Name:',
                                    value: fullName,
                                },
                                {
                                    icon: Mail,
                                    label: 'E-mail:',
                                    value: user.email,
                                },
                                {
                                    icon: Phone,
                                    label: 'Mobile:',
                                    value: user.mobile,
                                },
                                {
                                    icon: GraduationCap,
                                    label: 'Degree:',
                                    value: user.degree,
                                },
                                {
                                    icon: University,
                                    label: 'University:',
                                    value: user.uni,
                                },
                                {
                                    icon: School,
                                    label: 'Faculty:',
                                    value: user.faculty,
                                },
                            ].map(({ icon: Icon, label, value }, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col sm:flex-row sm:items-center gap-2"
                                >
                                    <div className="flex items-center gap-2 min-w-[120px]">
                                        <Icon className="w-4 sm:w-5 text-gray-600" />
                                        <span className="font-semibold">
                                            {label}
                                        </span>
                                    </div>
                                    {value && (
                                        <span className="text-gray-700 sm:flex-1">
                                            {value}
                                        </span>
                                    )}
                                </div>
                            ))}
                            <div className="flex items-center">
                                <a
                                    href={user.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Linkedin className="inline-block mr-3 w-6 mt-4" />
                                </a>
                                <a
                                    href={user.fb}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Facebook className="inline-block mr-3 w-6 mt-4" />
                                </a>
                                <a
                                    href={user.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Github className="inline-block mr-3 w-6 mt-4" />
                                </a>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Skills Section */}
                    <SkillsSection skills={user.skills} />
                </div>

                {/* Right Panel */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Right Panel - left */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base font-bold flex justify-between items-center">
                                    About Me
                                </CardTitle>
                                <Separator />
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                {user.bio}
                            </CardContent>
                        </Card>
                        <MyProConnections />
                    </div>

                    {/* Right Panel - right */}
                    <ProjectsIdeas />
                </div>
            </div>
        </div>
    )
}

export default UserProfilePage