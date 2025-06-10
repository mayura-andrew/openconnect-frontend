import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
    Users, 
    Code, 
    Palette, 
    MessageCircle, 
    BookOpen, 
    ArrowRight,
    GraduationCap,
    Heart,
    Github,
    Star,
    Award,
    Linkedin,
    Twitter,
    Mail,
    ExternalLink,
    Clock,
    CheckCircle
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface SocialLinks {
    github?: string
    linkedin?: string
    twitter?: string
    email?: string
    website?: string
}

interface TeamMember {
    name: string
    studentId?: string
    role: string
    description: string
    avatar?: string
    socialLinks: SocialLinks
    isFounder?: boolean
    department?: string
    isActive?: boolean
}

interface TeamRole {
    title: string
    icon: React.ElementType
    description: string
    responsibilities: string[]
    skills: string[]
    level: 'lead' | 'member' | 'advisor'
    openPositions?: number
    filledPositions?: TeamMember[]
}

interface TeamCategory {
    category: string
    description: string
    roles: TeamRole[]
    color: string
}

const TeamSection: React.FC = () => {
    const navigate = useNavigate()
    
    // Recruitment status - toggle this to enable/disable recruitment
    const isRecruitmentOpen = false
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
            },
        },
    }

    // Current team members with profile information
    const currentTeam: TeamMember[] = [
        {
            name: "Ms. Milani Sandamali",
            role: "Academic Supervisor",
            description: "Faculty supervisor providing guidance and mentorship to the development team",
            avatar: "/api/placeholder/150/150",
            department: "Faculty of Engineering Technology",
            isActive: true,
            socialLinks: {
                email: "milani.sandamali@ousl.lk",
                linkedin: "https://linkedin.com/in/milani-sandamali"
            }
        }
    ]

    // Project founders
    const founders: TeamMember[] = [
        {
            name: "Mayura Alahakoon",
            studentId: "722516877",
            role: "Founder & Lead Developer",
            description: "Full-stack developer specializing in React and Go. Leading the technical direction of OpenConnect.",
            avatar: "/api/placeholder/150/150",
            isFounder: true,
            isActive: true,
            socialLinks: {
                github: "https://github.com/alahakoon",
                linkedin: "https://linkedin.com/in/alahakoon",
                email: "alahakoon@student.ousl.lk"
            }
        },
        {
            name: "Pasindu Bandara",
            studentId: "522512868",
            role: "Co-Founder & Backend Lead",
            description: "Backend specialist focusing on Go, PostgreSQL, and system architecture.",
            avatar: "/api/placeholder/150/150",
            isFounder: true,
            isActive: true,
            socialLinks: {
                github: "https://github.com/bandara",
                linkedin: "https://linkedin.com/in/bandara",
                email: "bandara@student.ousl.lk"
            }
        },
        {
            name: "Ashan Withanarachchi",
            studentId: "622511076",
            role: "Co-Founder & Frontend Lead",
            description: "Frontend developer specializing in React, TypeScript, and modern UI/UX design.",
            avatar: "/api/placeholder/150/150",
            isFounder: true,
            isActive: true,
            socialLinks: {
                github: "https://github.com/withanarachchi",
                linkedin: "https://linkedin.com/in/withanarachchi",
                email: "withanarachchi@student.ousl.lk"
            }
        },
        {
            name: "Sahan Ranathunge",
            studentId: "722511533",
            role: "Co-Founder & System Architect",
            description: "System architect responsible for overall technical design and infrastructure planning.",
            avatar: "/api/placeholder/150/150",
            isFounder: true,
            isActive: true,
            socialLinks: {
                github: "https://github.com/ranathunge",
                linkedin: "https://linkedin.com/in/ranathunge",
                email: "ranathunge@student.ousl.lk"
            }
        }
    ]

    // Current active team members (non-founders)
    const activeTeamMembers: TeamMember[] = [
        // Add current team members here as they join
        // Example:
        // {
        //     name: "New Team Member",
        //     role: "Frontend Developer",
        //     description: "Contributing to UI development and user experience improvements.",
        //     avatar: "/api/placeholder/150/150",
        //     isActive: true,
        //     socialLinks: {
        //         github: "https://github.com/newmember",
        //         email: "newmember@student.ousl.lk"
        //     }
        // }
    ]

    const teamStructure: TeamCategory[] = [
        {
            category: "Engineering Team",
            description: "Building and maintaining the platform",
            color: "from-blue-100 to-blue-50",
            roles: [
                {
                    title: "Engineering Lead",
                    icon: Code,
                    description: "Technical leadership and architecture oversight",
                    level: "lead",
                    openPositions: isRecruitmentOpen ? 0 : 0, // Currently filled by founders
                    filledPositions: [founders[0]], // Mayura as lead
                    responsibilities: [
                        "Oversee technical direction and architecture",
                        "Coordinate engineering team efforts",
                        "Conduct code reviews and ensure quality",
                        "Mentor junior engineering members"
                    ],
                    skills: ["Go", "React/TypeScript", "PostgreSQL", "Git", "API Design", "Leadership"]
                },
                {
                    title: "Frontend Developers",
                    icon: Palette,
                    description: "React/TypeScript developers for user interface",
                    level: "member",
                    openPositions: isRecruitmentOpen ? 2 : 0,
                    filledPositions: [founders[2]], // Ashan
                    responsibilities: [
                        "Develop new features and UI components",
                        "Implement responsive designs",
                        "Write and maintain tests",
                        "Collaborate with design team"
                    ],
                    skills: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Git"]
                },
                {
                    title: "Backend Developers",
                    icon: Code,
                    description: "Go developers for server-side functionality",
                    level: "member",
                    openPositions: isRecruitmentOpen ? 2 : 0,
                    filledPositions: [founders[1], founders[3]], // Pasindu and Sahan
                    responsibilities: [
                        "Build APIs and server logic",
                        "Database design and optimization",
                        "Implement authentication and security",
                        "Write comprehensive tests"
                    ],
                    skills: ["Go", "PostgreSQL", "API Development", "Docker", "Git"]
                }
            ]
        },
        {
            category: "Design Team",
            description: "Creating intuitive and beautiful user experiences",
            color: "from-pink-100 to-pink-50",
            roles: [
                {
                    title: "Design Lead",
                    icon: Palette,
                    description: "UI/UX design vision and user experience leadership",
                    level: "lead",
                    openPositions: isRecruitmentOpen ? 1 : 0,
                    filledPositions: [],
                    responsibilities: [
                        "Lead UI/UX design vision",
                        "Create wireframes and prototypes",
                        "Maintain design system consistency",
                        "Conduct user research and testing"
                    ],
                    skills: ["Figma", "UI/UX Design", "User Research", "Design Systems", "Prototyping"]
                },
                {
                    title: "UI/UX Designers",
                    icon: Palette,
                    description: "Contributing to design assets and user experience",
                    level: "member",
                    openPositions: isRecruitmentOpen ? 2 : 0,
                    filledPositions: [],
                    responsibilities: [
                        "Create design assets and mockups",
                        "Assist with user research",
                        "Contribute to design documentation",
                        "Create marketing visual assets"
                    ],
                    skills: ["Figma", "Adobe Creative Suite", "User Research", "Visual Design"]
                }
            ]
        },
        {
            category: "Community & Outreach",
            description: "Building community and promoting the platform",
            color: "from-green-100 to-green-50",
            roles: [
                {
                    title: "Community Lead",
                    icon: MessageCircle,
                    description: "Community building and project promotion",
                    level: "lead",
                    openPositions: isRecruitmentOpen ? 1 : 0,
                    filledPositions: [],
                    responsibilities: [
                        "Foster welcoming community environment",
                        "Manage communication channels",
                        "Organize community events",
                        "Develop marketing strategies"
                    ],
                    skills: ["Communication", "Social Media", "Event Planning", "Content Creation"]
                },
                {
                    title: "Content Creators",
                    icon: BookOpen,
                    description: "Creating content for community and marketing",
                    level: "member",
                    openPositions: isRecruitmentOpen ? 2 : 0,
                    filledPositions: [],
                    responsibilities: [
                        "Write blog posts and documentation",
                        "Create social media content",
                        "Produce demo videos",
                        "Help with community moderation"
                    ],
                    skills: ["Writing", "Video Editing", "Social Media", "Documentation"]
                }
            ]
        }
    ]

    const getLevelBadge = (level: TeamRole['level']) => {
        const variants = {
            lead: "bg-gradient-to-r from-blue-500 to-purple-500 text-white",
            member: "bg-blue-100 text-blue-700",
            advisor: "bg-purple-100 text-purple-700"
        }
        
        const labels = {
            lead: "Leadership Role",
            member: "Team Member",
            advisor: "Faculty Advisor"
        }
        
        return <Badge className={variants[level]}>{labels[level]}</Badge>
    }

    const SocialIcon = ({ platform, url }: { platform: keyof SocialLinks; url: string }) => {
        const icons = {
            github: Github,
            linkedin: Linkedin,
            twitter: Twitter,
            email: Mail,
            website: ExternalLink
        }
        
        const Icon = icons[platform]
        const colors = {
            github: "hover:text-gray-900",
            linkedin: "hover:text-blue-600",
            twitter: "hover:text-blue-400",
            email: "hover:text-red-500",
            website: "hover:text-green-600"
        }

        const handleClick = () => {
            if (platform === 'email') {
                window.open(`mailto:${url}`)
            } else {
                window.open(url, '_blank')
            }
        }

        return (
            <button
                onClick={handleClick}
                className={`p-2 text-gray-400 transition-colors duration-200 ${colors[platform]} hover:bg-gray-100 rounded-full`}
            >
                <Icon className="w-4 h-4" />
            </button>
        )
    }

    const TeamMemberCard = ({ member }: { member: TeamMember }) => (
        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-gray-100 hover:border-blue-200">
            <CardContent className="p-6 text-center">
                <div className="relative mb-4">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.style.display = 'none'
                                const parent = target.parentElement
                                if (parent) {
                                    const initials = member.name.split(' ').map(n => n[0]).join('').slice(0, 2)
                                    parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">${initials}</div>`
                                }
                            }}
                        />
                    </div>
                    {member.isFounder && (
                        <div className="absolute -top-2 -right-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                                <Star className="w-4 h-4 text-white fill-current" />
                            </div>
                        </div>
                    )}
                    {member.isActive && (
                        <div className="absolute -bottom-1 -right-1">
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                                <CheckCircle className="w-3 h-3 text-white fill-current" />
                            </div>
                        </div>
                    )}
                </div>
                
                <h4 className="font-semibold text-gray-900 mb-1 text-lg">
                    {member.name}
                </h4>
                
                {member.studentId && (
                    <p className="text-xs text-gray-500 mb-2">
                        ID: {member.studentId}
                    </p>
                )}
                
                {member.department && (
                    <p className="text-xs text-gray-600 mb-2">
                        {member.department}
                    </p>
                )}
                
                <Badge className={`mb-3 ${member.isFounder 
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' 
                    : member.role.includes('Supervisor') 
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-blue-100 text-blue-700'
                }`}>
                    {member.role}
                </Badge>
                
                <div className="flex justify-center space-x-2">
                    {Object.entries(member.socialLinks).map(([platform, url]) => (
                        <SocialIcon key={platform} platform={platform as keyof SocialLinks} url={url} />
                    ))}
                </div>
            </CardContent>
        </Card>
    )

    const getRecruitmentStatus = () => {
        if (isRecruitmentOpen) {
            return {
                icon: CheckCircle,
                text: "Currently Recruiting",
                color: "text-green-600",
                bgColor: "bg-green-50 border-green-200"
            }
        } else {
            return {
                icon: Clock,
                text: "Recruitment Currently Closed",
                color: "text-orange-600",
                bgColor: "bg-orange-50 border-orange-200"
            }
        }
    }

    const recruitmentStatus = getRecruitmentStatus()

    return (
        <section className="py-24 bg-gradient-to-b from-white to-slate-50">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Meet the Team Behind OpenConnect
                    </h2>
                    <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
                        Built by students, for students. OpenConnect is an open-source project 
                        created by passionate university students who believe in the power of connection and collaboration.
                    </p>
                    
                    {/* Recruitment Status Banner */}
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${recruitmentStatus.bgColor}`}>
                        <recruitmentStatus.icon className={`w-4 h-4 ${recruitmentStatus.color}`} />
                        <span className={`text-sm font-medium ${recruitmentStatus.color}`}>
                            {recruitmentStatus.text}
                        </span>
                    </div>
                </motion.div>

                {/* Academic Context */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 max-w-4xl mx-auto mb-12">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Academic Project</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
                                <div>
                                    <strong>Course:</strong> EEY4189 Software Design in Group
                                </div>
                                <div>
                                    <strong>Program:</strong> Bachelor of Software Engineering Honours
                                </div>
                                <div>
                                    <strong>Institution:</strong> The Open University of Sri Lanka
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Academic Supervisor */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Academic Supervision
                        </h3>
                        <p className="text-gray-600">Faculty guidance and mentorship</p>
                    </div>
                    
                    <div className="max-w-md mx-auto">
                        {currentTeam.map((member, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <TeamMemberCard member={member} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Founders Section */}
                <motion.div
                    className="mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Star className="w-6 h-6 text-yellow-500 fill-current" />
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                                Core Team & Founders
                            </h3>
                            <Star className="w-6 h-6 text-yellow-500 fill-current" />
                        </div>
                        <p className="text-gray-600 mb-8">
                            The original development team who brought OpenConnect to life and continue to drive its development
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {founders.map((founder, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <TeamMemberCard member={founder} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Current Team Members (if any) */}
                {activeTeamMembers.length > 0 && (
                    <motion.div
                        className="mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="text-center mb-12">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Current Team Members
                            </h3>
                            <p className="text-gray-600">
                                Active contributors helping build OpenConnect
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {activeTeamMembers.map((member, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <TeamMemberCard member={member} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Team Values */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {[
                            {
                                icon: Heart,
                                title: "Student-Driven",
                                description: "Led by students who understand academic networking challenges"
                            },
                            {
                                icon: Github,
                                title: "Open Source",
                                description: "Completely transparent and built with community contributions"
                            },
                            {
                                icon: Users,
                                title: "Collaborative",
                                description: "Welcoming contributors from all backgrounds and skill levels"
                            }
                        ].map((value, index) => (
                            <div key={index} className="text-center p-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <value.icon className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                                <p className="text-gray-600 text-sm">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Team Structure & Roles */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="text-center mb-12">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            {isRecruitmentOpen ? "Join Our Growing Team" : "Our Team Structure"}
                        </h3>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            {isRecruitmentOpen 
                                ? "We're expanding our team and looking for passionate students to help us build the future of academic networking."
                                : "Explore the different roles and teams that make OpenConnect possible. We'll be opening recruitment in the future!"
                            }
                        </p>
                    </div>

                    <motion.div
                        className="space-y-12"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {teamStructure.map((category, categoryIndex) => (
                            <motion.div key={categoryIndex} variants={itemVariants}>
                                <div className="text-center mb-8">
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                                        {category.category}
                                    </h4>
                                    <p className="text-gray-600">{category.description}</p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {category.roles.map((role, roleIndex) => (
                                        <Card key={roleIndex} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                            <CardContent className="p-6">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                                                        <role.icon className="w-6 h-6 text-gray-700" />
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        {getLevelBadge(role.level)}
                                                        {role.filledPositions && role.filledPositions.length > 0 && (
                                                            <Badge variant="outline" className="text-green-600 border-green-300">
                                                                {role.filledPositions.length} active
                                                            </Badge>
                                                        )}
                                                        {role.openPositions && role.openPositions > 0 && isRecruitmentOpen && (
                                                            <Badge variant="outline" className="text-blue-600 border-blue-300">
                                                                {role.openPositions} positions open
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                                
                                                <h5 className="text-lg font-semibold mb-2">{role.title}</h5>
                                                <p className="text-gray-600 text-sm mb-4">{role.description}</p>
                                                
                                                {/* Show current team members in this role */}
                                                {role.filledPositions && role.filledPositions.length > 0 && (
                                                    <div className="mb-4">
                                                        <h6 className="text-sm font-medium text-gray-900 mb-2">Current Team:</h6>
                                                        <div className="flex flex-wrap gap-1">
                                                            {role.filledPositions.map((member, index) => (
                                                                <Badge key={index} variant="secondary" className="text-xs">
                                                                    {member.name.split(' ')[0]}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                                
                                                <div className="mb-4">
                                                    <h6 className="text-sm font-medium text-gray-900 mb-2">Key Responsibilities:</h6>
                                                    <ul className="text-xs text-gray-600 space-y-1">
                                                        {role.responsibilities.slice(0, 3).map((resp, index) => (
                                                            <li key={index} className="flex items-start">
                                                                <span className="text-blue-500 mr-1">•</span>
                                                                {resp}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                
                                                <div>
                                                    <h6 className="text-sm font-medium text-gray-900 mb-2">Skills:</h6>
                                                    <div className="flex flex-wrap gap-1">
                                                        {role.skills.slice(0, 3).map((skill, index) => (
                                                            <Badge key={index} variant="secondary" className="text-xs">
                                                                {skill}
                                                            </Badge>
                                                        ))}
                                                        {role.skills.length > 3 && (
                                                            <Badge variant="secondary" className="text-xs">
                                                                +{role.skills.length - 3} more
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Call to Action */}
                <motion.div 
                    className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12 text-center border border-blue-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                            {isRecruitmentOpen ? "Ready to Join Our Team?" : "Interested in Contributing?"}
                        </h3>
                        <p className="text-lg text-gray-600 mb-8">
                            {isRecruitmentOpen 
                                ? "We're actively looking for passionate students to join our development team. Whether you're experienced or just getting started, we'd love to have you contribute to this open-source project."
                                : "While we're not actively recruiting at the moment, we're always interested in connecting with passionate students who want to contribute to open-source projects. Follow our progress and stay tuned for future opportunities!"
                            }
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                            <Button 
                                className="text-base py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                                onClick={() => window.open('https://github.com/your-repo', '_blank')}
                            >
                                <Github className="mr-2 h-4 w-4" />
                                View on GitHub
                            </Button>
                            <Button 
                                variant="outline"
                                className="text-base py-3 px-6 hover:bg-blue-50 transition-all duration-300"
                                onClick={() => window.open('mailto:openconnect@ousl.lk', '_blank')}
                            >
                                Get In Touch
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>

                        <div className="pt-6 border-t border-blue-200">
                            <p className="text-sm text-gray-500 mb-3">Technologies we use:</p>
                            <div className="flex flex-wrap justify-center gap-2">
                                {['React', 'TypeScript', 'Go', 'PostgreSQL', 'Tailwind CSS', 'Figma', 'Docker'].map((tech) => (
                                    <span 
                                        key={tech} 
                                        className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-700">
                                <strong>Learning-Focused:</strong> Our primary goal is for students to learn and gain real-world experience. 
                                All skill levels are welcome, and we provide mentorship and support for growth.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default TeamSection