import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import {
    HoverCard,
    HoverCardTrigger,
    HoverCardContent,
} from '@/components/ui/hover-card'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { Github, Linkedin, Facebook } from 'lucide-react'
import { User } from '@/types'

export const ProfileCard = ({ user }: { user: User }) => {
    const navigate = useNavigate()
    const displayName =
        `${user.firstname || ''} ${user.lastname || ''}`.trim() ||
        user.username ||
        'User'

    const initials = displayName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()

    const avatarSrc = `${import.meta.env.VITE_API_URL}/avatars/${user.avatar}`

    const handleViewProfile = () => {
        navigate(`/profile/${user.id}`)
    }

    return (
        <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
            <CardHeader className="text-center">
                <HoverCard>
                    <HoverCardTrigger>
                        <Avatar className="w-24 h-24 mx-auto">
                            <AvatarImage src={avatarSrc} alt={displayName} />
                            <AvatarFallback className="bg-primary/10 text-2xl">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                    </HoverCardTrigger>
                    <HoverCardContent>
                        <div className="space-y-2">
                            <h4 className="text-sm font-semibold">
                                {displayName}
                            </h4>
                            <p className="text-sm">{user.faculty}</p>
                            <p className="text-sm text-muted-foreground">
                                {user.program}
                            </p>
                        </div>
                    </HoverCardContent>
                </HoverCard>
                <h3 className="font-semibold mt-2">{displayName}</h3>
                <p className="text-sm text-muted-foreground">{user.title}</p>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="space-y-3 text-sm">
                    <div>
                        <p>{user.faculty}</p>
                        <p className="text-muted-foreground">{user.program}</p>
                    </div>

                    <div className="flex space-x-2 pt-2">
                        {user.github && (
                            <a
                                href={user.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <Github size={16} />
                            </a>
                        )}
                        {user.linkedin && (
                            <a
                                href={user.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <Linkedin size={16} />
                            </a>
                        )}
                        {user.fb && (
                            <a
                                href={user.fb}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <Facebook size={16} />
                            </a>
                        )}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="pt-0">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                className="w-full"
                                onClick={handleViewProfile}
                            >
                                View Profile
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>View {displayName}'s complete profile details</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </CardFooter>
        </Card>
    )
}
