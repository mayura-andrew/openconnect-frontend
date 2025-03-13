import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { LoadingScreen } from '@/components/common/LoadingScreen.component'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form as UIForm } from '@/components/ui/form'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import {
    Github,
    Linkedin,
    Facebook,
    ArrowLeft,
    Mail,
    Phone,
    School,
    User,
    GraduationCap,
    University,
    ChevronLeft,
    ChevronRight,
    Edit,
    Plus,
} from 'lucide-react'
import { ErrorState } from '@/components/common/EmptyState.component'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from '@/components/ui/pagination'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    Table,
} from '@/components/ui/table'
import { Label } from '@/components/ui/label'
import { useState, useEffect } from 'react'
import { MyProfileConnections } from './MyProfileConnections.component'
import { SkillsSection } from './SkillsSection.component'
import { Idea } from '@/types'
import { ViewIdea } from './ViewIdea.component'
import { Badge } from '@/components/ui/badge'
import toast from 'react-hot-toast'
import { useGetUserProfileDetailsByID } from '@/hooks/useGetUserProfileDetailsByID'
import { Input } from '@/components/ui/input'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { useIdea } from '@/context/IdeaContext'
import { useProfileUpdate } from '@/hooks/useProfileUpdate'
import { useForm } from 'react-hook-form'
import { profileSchema } from '@/schemas'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form'

const MyProfileView = () => {
    const [viewIdeaModalOpen, setViewIdeaModalOpen] = useState(false)
    const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [filteredIdeas, setFilteredIdeas] = useState<Idea[]>([])

    const { user: authUser } = useAuth()
    const { ideaSubmitted, resetIdeaSubmission } = useIdea()
    const navigate = useNavigate()

    // State for bio editing
    const [bioText, setBioText] = useState('')
    const [bioEditOpen, setBioEditOpen] = useState(false)

    // State for avatar upload
    const [avatarFile, setAvatarFile] = useState<File | null>(null)

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setAvatarFile(file)
        }
    }

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    const base64 = reader.result.split(',')[1] // Remove the data:image/jpeg;base64, part
                    resolve(base64)
                } else {
                    reject(new Error('Failed to convert file to base64'))
                }
            }
            reader.onerror = reject
            reader.readAsDataURL(file)
        })
    }

    // Profile update hook
    const { updateProfile, isUpdating } = useProfileUpdate()
    const [editDialogOpen, setEditDialogOpen] = useState(false)

    // Handle profile form submission
    const handleProfileUpdate = async (
        values: z.infer<typeof profileSchema>
    ) => {
        const dataToUpdate: any = { ...values }

        if (avatarFile) {
            try {
                // Convert file to base64
                const base64Data = await fileToBase64(avatarFile)
                dataToUpdate.avatar = base64Data
            } catch (error) {
                console.error('Error converting file to base64:', error)
                toast.error('Failed to process avatar image')
                return
            }
        }

        updateProfile(dataToUpdate, {
            onSuccess: () => {
                setEditDialogOpen(false)
                setAvatarFile(null)
            },
        })
    }

    // Handle bio update
    const handleBioUpdate = () => {
        updateProfile(
            { bio: bioText },
            {
                onSuccess: () => {
                    setBioEditOpen(false)
                },
            }
        )
    }

    // Get user profile data
    const {
        data: userData,
        isLoading,
        isError,
        refetch,
    } = useGetUserProfileDetailsByID(authUser?.id)

    // Update filtered ideas when user data changes
    useEffect(() => {
        if (userData?.ideas) {
            setFilteredIdeas(userData.ideas)
        }
    }, [userData])

    // Reset bio text when profile changes
    useEffect(() => {
        if (userData?.profile?.bio) {
            setBioText(userData.profile.bio)
        }
    }, [userData?.profile?.bio])

    // Handle idea submission updates
    useEffect(() => {
        if (ideaSubmitted) {
            // Refetch user data when an idea is submitted
            refetch()
            // Reset the submission flag
            resetIdeaSubmission()
        }
    }, [ideaSubmitted, refetch, resetIdeaSubmission])

    // Initialize form with profile data
    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstname: '',
            lastname: '',
            title: '',
            email: '',
            mobile: '',
            degree: '',
            uni: '',
            faculty: '',
            bio: '',
        },
    })

    // Update form values when profile data loads
    useEffect(() => {
        if (userData?.profile) {
            const profile = userData.profile
            form.reset({
                firstname: profile.firstname || '',
                lastname: profile.lastname || '',
                title: profile.title || '',
                email: profile.email || '',
                mobile: profile.mobile || '',
                degree: profile.degree || '',
                uni: profile.uni || '',
                faculty: profile.faculty || '',
                bio: profile.bio || '',
            })
        }
    }, [userData?.profile, form])

    // UI handlers
    const handleBack = () => navigate(-1)

    const handleEditProfile = () => setEditDialogOpen(true)

    const openModal = (idea: Idea) => {
        setSelectedIdea(idea)
        setViewIdeaModalOpen(true)
    }

    // Loading and error states
    if (isLoading) {
        return <LoadingScreen message="Loading your profile..." />
    }

    if (isError || !userData) {
        return (
            <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-[70vh]">
                <ErrorState onRetry={() => refetch()} />
                <Button variant="ghost" onClick={handleBack} className="mt-4">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
                </Button>
            </div>
        )
    }

    const profile = userData.profile

    // Calculate display name and initials
    const fullName =
        `${profile.firstname || ''} ${profile.lastname || ''}`.trim()
    const displayName = fullName || profile.username || 'User'
    const initials = displayName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()

    // Avatar source
    const avatarSrc = `${import.meta.env.VITE_API_URL}/avatars/${profile.avatar}`

    // Pagination calculations
    const totalPages = Math.max(
        1,
        Math.ceil(filteredIdeas.length / rowsPerPage)
    )
    const startIndex = (currentPage - 1) * rowsPerPage
    const displayedIdeas = filteredIdeas.slice(
        startIndex,
        startIndex + rowsPerPage
    )

    return (
        <div className="bg-gray-50">
            <div className="p-6 min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold mb-2 lg:mb-0">
                        My Profile
                    </h2>

                    {/* Edit Profile Button */}
                    <Button
                        variant="link"
                        className="hover:text-blue-700"
                        onClick={handleEditProfile}
                    >
                        <Edit className="mr-2" /> Edit Profile
                    </Button>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Panel */}
                    <div className="flex flex-col lg:col-span-1 gap-6">
                        <Card>
                            <CardHeader className="flex flex-col items-center p-6 relative">
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
                                    <Badge
                                        variant="outline"
                                        className="ml-2 bg-blue-50 text-blue-700"
                                    >
                                        You
                                    </Badge>
                                </CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    {profile.title}
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
                                        value: profile.email,
                                    },
                                    {
                                        icon: Phone,
                                        label: 'Mobile:',
                                        value: profile.mobile,
                                    },
                                    {
                                        icon: GraduationCap,
                                        label: 'Degree:',
                                        value: profile.degree,
                                    },
                                    {
                                        icon: University,
                                        label: 'University:',
                                        value: profile.uni,
                                    },
                                    {
                                        icon: School,
                                        label: 'Faculty:',
                                        value: profile.faculty,
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
                                        {value ? (
                                            <span className="text-gray-700 sm:flex-1">
                                                {value}
                                            </span>
                                        ) : (
                                            <span className="text-gray-400 italic sm:flex-1">
                                                Not provided
                                            </span>
                                        )}
                                    </div>
                                ))}
                                <div className="flex items-center">
                                    {profile.linkedin && (
                                        <a
                                            href={profile.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Linkedin className="inline-block mr-3 w-6 mt-4" />
                                        </a>
                                    )}
                                    {profile.fb && (
                                        <a
                                            href={profile.fb}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Facebook className="inline-block mr-3 w-6 mt-4" />
                                        </a>
                                    )}
                                    {profile.github && (
                                        <a
                                            href={profile.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Github className="inline-block mr-3 w-6 mt-4" />
                                        </a>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Skills Section */}
                        <SkillsSection skills={profile.skills || []} />

                        {/* About Me Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base font-bold flex justify-between items-center">
                                    About Me
                                    <Button
                                        variant="link"
                                        className="text-black hover:text-blue-700 p-0"
                                        onClick={() => setBioEditOpen(true)}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                </CardTitle>
                                <Separator />
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                {profile.bio ||
                                    "You haven't added a bio yet. Click edit to tell others about yourself."}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Panel */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                            <MyProfileConnections />
                        </div>

                        {/* Ideas/Projects */}
                        {selectedIdea && (
                            <ViewIdea
                                open={viewIdeaModalOpen}
                                onOpenChange={setViewIdeaModalOpen}
                                idea={selectedIdea}
                            />
                        )}

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-base font-bold">
                                    Your Projects/Ideas
                                </CardTitle>
                            </CardHeader>
                            <Separator />
                            <CardContent className="flex flex-col min-h-40">
                                <div className="flex-grow overflow-auto border border-gray-300 rounded-lg">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-slate-50">
                                                <TableHead>No.</TableHead>
                                                <TableHead>Title</TableHead>
                                                <TableHead>
                                                    Description
                                                </TableHead>
                                                <TableHead></TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredIdeas.length > 0 ? (
                                                displayedIdeas.map(
                                                    (idea, index) => (
                                                        <TableRow key={idea.id}>
                                                            <TableCell>
                                                                {startIndex +
                                                                    index +
                                                                    1}
                                                            </TableCell>
                                                            <TableCell className="truncate max-w-[100px] sm:max-w-[200px] sm:min-w-[200px]">
                                                                {idea.title}
                                                            </TableCell>
                                                            <TableCell className="truncate max-w-[250px] sm:max-w-[400px] sm:min-w-[400px]">
                                                                {
                                                                    idea.description
                                                                }
                                                            </TableCell>
                                                            <TableCell>
                                                                <Button
                                                                    variant="outline3"
                                                                    size="sm"
                                                                    className="h-7 ml-6"
                                                                    onClick={() =>
                                                                        openModal(
                                                                            idea
                                                                        )
                                                                    }
                                                                >
                                                                    View
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                )
                                            ) : (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={4}
                                                        className="text-center py-8"
                                                    >
                                                        You haven't submitted
                                                        any ideas yet
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>

                                {/* Pagination Controls */}
                                {filteredIdeas.length > 0 && (
                                    <div className="flex flex-col sm:flex-row justify-between sm:gap-0 gap-4 items-center pt-8 mt-auto">
                                        <span className="text-xs text-gray-600">
                                            Total submissions:{' '}
                                            {filteredIdeas.length}
                                        </span>
                                        <div className="flex items-center space-x-8">
                                            <Select
                                                onValueChange={(value) =>
                                                    setRowsPerPage(
                                                        Number(value)
                                                    )
                                                }
                                                value={String(rowsPerPage)}
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <Label
                                                        className="text-xs font-semibold"
                                                        htmlFor="rows-per-page"
                                                    >
                                                        Rows per page
                                                    </Label>
                                                    <SelectTrigger
                                                        id="rows-per-page"
                                                        className="w-[60px] h-6 text-xs"
                                                    >
                                                        <SelectValue placeholder="Rows per page" />
                                                    </SelectTrigger>
                                                </div>
                                                <SelectContent>
                                                    <SelectItem
                                                        className="text-xs"
                                                        value="5"
                                                    >
                                                        5
                                                    </SelectItem>
                                                    <SelectItem
                                                        className="text-xs"
                                                        value="10"
                                                    >
                                                        10
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>

                                            <span className="text-xs font-semibold">
                                                Page {currentPage} of{' '}
                                                {totalPages}
                                            </span>
                                            <div className="flex space-x-3">
                                                <Pagination>
                                                    <PaginationContent>
                                                        <PaginationItem>
                                                            <Button
                                                                size="sm"
                                                                className="h-6 w-6 p-0"
                                                                variant="outline3"
                                                                onClick={() =>
                                                                    setCurrentPage(
                                                                        (
                                                                            prev
                                                                        ) =>
                                                                            Math.max(
                                                                                prev -
                                                                                    1,
                                                                                1
                                                                            )
                                                                    )
                                                                }
                                                                disabled={
                                                                    currentPage ===
                                                                    1
                                                                }
                                                            >
                                                                <ChevronLeft
                                                                    strokeWidth={
                                                                        2.5
                                                                    }
                                                                />
                                                            </Button>
                                                        </PaginationItem>
                                                        <PaginationItem>
                                                            <Button
                                                                size="sm"
                                                                className="h-6 w-6 p-0"
                                                                variant="outline3"
                                                                onClick={() =>
                                                                    setCurrentPage(
                                                                        (
                                                                            prev
                                                                        ) =>
                                                                            Math.min(
                                                                                prev +
                                                                                    1,
                                                                                totalPages
                                                                            )
                                                                    )
                                                                }
                                                                disabled={
                                                                    currentPage ===
                                                                    totalPages
                                                                }
                                                            >
                                                                <ChevronRight
                                                                    strokeWidth={
                                                                        2.5
                                                                    }
                                                                />
                                                            </Button>
                                                        </PaginationItem>
                                                    </PaginationContent>
                                                </Pagination>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Edit Profile Dialog */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent className="max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when
                            you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <UIForm {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleProfileUpdate)}
                            className="space-y-4"
                        >
                            <div className="flex flex-col items-center gap-4 mb-4">
                                <div className="relative w-20 flex-shrink-0">
                                    <Avatar className="h-32 w-32">
                                        <AvatarImage
                                            src={
                                                avatarFile
                                                    ? URL.createObjectURL(
                                                          avatarFile
                                                      )
                                                    : avatarSrc
                                            }
                                            alt={displayName}
                                        />
                                        <AvatarFallback className="text-5xl">
                                            {initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <label className="absolute -bottom-1 -right-12 w-9 h-9 border-4 border-white bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                                        <Plus className="w-5 h-5 text-white" />
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleAvatarChange}
                                        />
                                    </label>
                                </div>
                            </div>

                            <FormField
                                control={form.control}
                                name="firstname"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-start">
                                                First Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter Your First Name"
                                                    className="col-span-3"
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="lastname"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-start">
                                                Last Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter Your Last Name"
                                                    className="col-span-3"
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-start">
                                                Title
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter Your Job Title"
                                                    className="col-span-3"
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-start">
                                                Email
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter Your Email Address"
                                                    className="col-span-3"
                                                    disabled
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="mobile"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-start">
                                                Mobile
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter Your Mobile Number"
                                                    className="col-span-3"
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="degree"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-start">
                                                Degree
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter Your Degree"
                                                    className="col-span-3"
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="uni"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-start">
                                                University
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter Your University Name"
                                                    className="col-span-3"
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="faculty"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-start">
                                                Faculty
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter Your Faculty Name"
                                                    className="col-span-3"
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <DialogFooter>
                                <Button type="submit" disabled={isUpdating}>
                                    {isUpdating ? (
                                        <>Saving changes...</>
                                    ) : (
                                        <>Save changes</>
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    </UIForm>
                </DialogContent>
            </Dialog>

            {/* Bio Edit Dialog */}
            <Dialog open={bioEditOpen} onOpenChange={setBioEditOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit About</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        <Textarea
                            className="w-full"
                            placeholder="Write something about yourself..."
                            defaultValue={profile.bio || ''}
                            onChange={(e) => setBioText(e.target.value)}
                        />
                    </DialogDescription>
                    <DialogFooter>
                        <Button onClick={handleBioUpdate} disabled={isUpdating}>
                            {isUpdating ? 'Saving...' : 'Save'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default MyProfileView
