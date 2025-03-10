import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
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
import { Badge } from '@/components/ui/badge'
import { Github, Linkedin, Facebook } from 'lucide-react'
import { UserProfileWithIdeas } from '@/types'

interface ProfileCardWithIdeasProps {
    user: UserProfileWithIdeas;
}

export const ProfileCardWithIdeas = ({ user }: ProfileCardWithIdeasProps) => {
    const fullName = `${user.firstname || ''} ${user.lastname || ''}`.trim();
    const displayName = fullName || 'User';
    const initials = displayName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase();

    return (
        <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
            <CardHeader className="text-center pb-2">
                <HoverCard>
                    <HoverCardTrigger>
                        <Avatar className="w-24 h-24 mx-auto">
                            <AvatarImage 
                                src={user.avatarURL ? `${import.meta.env.VITE_API_URL}${user.avatarURL}` : undefined} 
                                alt={displayName} 
                            />
                            <AvatarFallback className="bg-primary/10 text-2xl">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                    </HoverCardTrigger>
                    <HoverCardContent>
                        <div className="space-y-2">
                            <h4 className="text-sm font-semibold">{displayName}</h4>
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
                    <p className="text-muted-foreground line-clamp-2">{user.bio}</p>
                    <div>
                        <p>{user.faculty}</p>
                        <p className="text-muted-foreground">{user.program}</p>
                    </div>
                    
                    {user.skills && user.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                            {user.skills.slice(0, 3).map(skill => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                    {skill}
                                </Badge>
                            ))}
                            {user.skills.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                    +{user.skills.length - 3}
                                </Badge>
                            )}
                        </div>
                    )}

                    {/* Social links */}
                    <div className="flex space-x-2 pt-2">
                        {user.github && (
                            <a href={user.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
                                <Github size={16} />
                            </a>
                        )}
                        {user.linkedin && (
                            <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
                                <Linkedin size={16} />
                            </a>
                        )}
                        {user.fb && (
                            <a href={user.fb} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
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
                            <Button className="w-full">Connect</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Send connection request</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </CardFooter>
        </Card>
    )
}
