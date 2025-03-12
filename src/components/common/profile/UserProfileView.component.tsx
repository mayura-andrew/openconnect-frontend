import { useParams, useNavigate } from 'react-router-dom'
import { useGetUserProfileDetailsByID } from '@/hooks/useGetUserProfileDetailsByID'
import { LoadingScreen } from '@/components/common/LoadingScreen.component'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
} from 'lucide-react'
import { ErrorState } from '@/components/common/EmptyState.component'
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination'
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
import { useState, useEffect } from 'react' // Added useEffect
import { MyProfileConnections } from './MyProfileConnections.component'
import { SkillsSection } from './SkillsSection.component'
import { Idea } from '@/types'
import { ViewIdea } from './ViewIdea.component'

const UserProfilePage = () => {
  const [viewIdeaModalOpen, setViewIdeaModalOpen] = useState(false)
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null)

  const openModal = (idea: Idea) => {
    setSelectedIdea(idea) // Set the selected idea data
    setViewIdeaModalOpen(true)
  }
  const { userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()

  // MOVE ALL useState HOOKS TO THE TOP - before any conditional returns
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [filteredIdeas, setFilteredIdeas] = useState<Idea[]>([])

  console.log('ue s e', userId)

  const { data: user, isLoading, isError, refetch } = useGetUserProfileDetailsByID(userId)

  // Use useEffect to update filteredIdeas when user changes
  useEffect(() => {
    if (user?.ideas) {
      setFilteredIdeas(user.ideas)
    }
  }, [user])

  const handleBack = () => {
    navigate(-1)
  }

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredIdeas.length / rowsPerPage))
  const startIndex = (currentPage - 1) * rowsPerPage
  const displayedIdeas = filteredIdeas.slice(startIndex, startIndex + rowsPerPage)

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
  const fullName = `${user.profile.firstname || ''} ${user.profile.lastname || ''}`.trim()
  const displayName = fullName || user.profile.username || 'User'
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  // Avatar source
  const avatarSrc = `${import.meta.env.VITE_API_URL}/avatars/${user.profile.avatar}`

  console.log(avatarSrc)

  return (
    <div className="bg-gray-50">
      <div className="p-6 min-h-screen">
        <Button variant="ghost" onClick={handleBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Community
        </Button>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel */}
          <div className="flex flex-col lg:col-span-1 gap-6">
            <Card>
              <CardHeader className="flex flex-col items-center p-6">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={avatarSrc} alt={displayName} />
                  <AvatarFallback className="text-5xl">{initials}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg font-bold text-center pt-2">{displayName}</CardTitle>
                <p className="text-sm text-muted-foreground">{user.profile.title}</p>
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
                    value: user.profile.email,
                  },
                  {
                    icon: Phone,
                    label: 'Mobile:',
                    value: user.profile.mobile,
                  },
                  {
                    icon: GraduationCap,
                    label: 'Degree:',
                    value: user.profile.degree,
                  },
                  {
                    icon: University,
                    label: 'University:',
                    value: user.profile.uni,
                  },
                  {
                    icon: School,
                    label: 'Faculty:',
                    value: user.profile.faculty,
                  },
                ].map(({ icon: Icon, label, value }, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="flex items-center gap-2 min-w-[120px]">
                      <Icon className="w-4 sm:w-5 text-gray-600" />
                      <span className="font-semibold">{label}</span>
                    </div>
                    {value && <span className="text-gray-700 sm:flex-1">{value}</span>}
                  </div>
                ))}
                <div className="flex items-center">
                  {user.profile.linkedin && (
                    <a href={user.profile.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="inline-block mr-3 w-6 mt-4" />
                    </a>
                  )}
                  {user.profile.fb && (
                    <a href={user.profile.fb} target="_blank" rel="noopener noreferrer">
                      <Facebook className="inline-block mr-3 w-6 mt-4" />
                    </a>
                  )}
                  {user.profile.github && (
                    <a href={user.profile.github} target="_blank" rel="noopener noreferrer">
                      <Github className="inline-block mr-3 w-6 mt-4" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Skills Section */}
            <SkillsSection skills={user.profile.skills || []} />
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
                  {user.profile.bio}
                </CardContent>
              </Card>
              <MyProfileConnections />
            </div>

            {/* Right Panel - right */}
            {selectedIdea && (
              <ViewIdea
                open={viewIdeaModalOpen}
                onOpenChange={setViewIdeaModalOpen}
                idea={selectedIdea}
              />
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-bold">Projects/Ideas</CardTitle>
                <Separator />
              </CardHeader>
              <CardContent className="flex flex-col min-h-40">
                <div className="flex-grow overflow-auto border border-gray-300 rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50">
                        <TableHead>No.</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredIdeas.length > 0 ? (
                        displayedIdeas.map((idea, index) => (
                          <TableRow key={idea.id}>
                            <TableCell>{startIndex + index + 1}</TableCell>
                            <TableCell className="truncate max-w-[100px] sm:max-w-[200px] sm:min-w-[200px]">
                              {idea.title}
                            </TableCell>
                            <TableCell className="truncate max-w-[250px] sm:max-w-[400px] sm:min-w-[400px]">
                              {idea.description}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outline3"
                                size="sm"
                                className="h-7 ml-6"
                                onClick={() => openModal(idea)}
                              >
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-8">
                            No ideas found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination Controls */}
                <div className="flex flex-col sm:flex-row justify-between sm:gap-0 gap-4 items-center pt-8 mt-auto">
                  <span className="text-xs text-gray-600">
                    Total submissions: {filteredIdeas.length}
                  </span>
                  <div className="flex items-center space-x-8">
                    <Select
                      onValueChange={(value) => setRowsPerPage(Number(value))}
                      value={String(rowsPerPage)}
                    >
                      <div className="flex items-center space-x-2">
                        <Label className="text-xs font-semibold" htmlFor="rows-per-page">
                          Rows per page
                        </Label>
                        <SelectTrigger id="rows-per-page" className="w-[60px] h-6 text-xs">
                          <SelectValue placeholder="Rows per page" />
                        </SelectTrigger>
                      </div>
                      <SelectContent>
                        <SelectItem className="text-xs" value="5">
                          5
                        </SelectItem>
                        <SelectItem className="text-xs" value="10">
                          10
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <span className="text-xs font-semibold">
                      Page {currentPage} of {totalPages}
                    </span>
                    <div className="flex space-x-3">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <Button
                              size="sm"
                              className="h-6 w-6 p-0"
                              variant="outline3"
                              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            >
                              <ChevronLeft strokeWidth={2.5} />
                            </Button>
                          </PaginationItem>
                          <PaginationItem>
                            <Button
                              size="sm"
                              className="h-6 w-6 p-0"
                              variant="outline3"
                              onClick={() =>
                                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                              }
                            >
                              <ChevronRight strokeWidth={2.5} />
                            </Button>
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfilePage
