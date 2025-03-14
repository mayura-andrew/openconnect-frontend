import { useEffect, useState } from 'react'
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
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
import { useApp } from '@/context/AppContext'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import {
    ChevronLeft,
    ChevronRight,
    Edit,
    FilterIcon,
    MoreHorizontal,
    Trash,
    View,
} from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/context/AuthContext'
import { useGetUserProfileDetailsByID } from '@/hooks/useGetUserProfileDetailsByID'
import { LoadingScreen } from '@/components/common/LoadingScreen.component'
import { ErrorState } from '@/components/common/EmptyState.component'
import { Idea } from '@/types'
import toast from 'react-hot-toast'
import { ViewIdea } from './ViewIdea.component'
import { Label } from '@/components/ui/label'
import { useIdeaDelete } from '@/hooks/useIdeaDelete'

export default function MySubmissions() {
    // Auth and user data
    const { user: authUser } = useAuth()
    const {
        data: userData,
        isLoading,
        isError,
        refetch,
    } = useGetUserProfileDetailsByID(authUser?.id)

    // Local state
    const [search, setSearch] = useState('')
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
    const [filteredIdeas, setFilteredIdeas] = useState<Idea[]>([])

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    // Modal state
    const [viewIdeaModalOpen, setViewIdeaModalOpen] = useState(false)
    const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null)

    // Initial load of ideas from user data
    useEffect(() => {
        if (userData?.ideas) {
            setFilteredIdeas(userData.ideas)
        }
    }, [userData])

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [ideaToDelete, setIdeaToDelete] = useState<string | null>(null)
    
    const { deleteIdea, isDeleting } = useIdeaDelete()

    const handleDelete = (ideaId: string) => {
        setIdeaToDelete(ideaId)
        setDeleteDialogOpen(true)
      }

      const confirmDelete = async () => {
        if (ideaToDelete) {
          try {
            await deleteIdea(ideaToDelete)
            setDeleteDialogOpen(false)
            setIdeaToDelete(null)
          } catch (error) {
            console.error('Error deleting idea:', error)
          }
        }
      }
    // Filter effect
    useEffect(() => {
        if (!userData?.ideas) return

        let filtered = userData.ideas

        // Filter ideas by search term
        if (search) {
            filtered = filtered.filter((idea) =>
                idea.title.toLowerCase().includes(search.toLowerCase())
            )
        }

        // Filter ideas by status
        if (selectedStatus) {
            filtered = filtered.filter((idea) => idea.status === selectedStatus)
        }

        setFilteredIdeas(filtered)
        setCurrentPage(1)
    }, [search, selectedStatus, userData?.ideas])

    // Event handlers
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    const handleStatusSelect = (status: string) => {
        setSelectedStatus(status)
    }

    const handleRemoveFilter = () => {
        setSelectedStatus(null)
        if (userData?.ideas) {
            setFilteredIdeas(userData.ideas)
        }
    }

    const openModal = (idea: Idea) => {
        setSelectedIdea(idea)
        setViewIdeaModalOpen(true)
    }

    const closeModal = () => {
        setViewIdeaModalOpen(false)
    }

    const handleEdit = () => {
        toast.success('Edit functionality coming soon!', { icon: '🚧' })
    }


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

    if (isLoading) {
        return <LoadingScreen message="Loading your submissions..." />
    }

    if (isError || !userData) {
        return (
            <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-[70vh]">
                <ErrorState onRetry={() => refetch()} />
            </div>
        )
    }

    return (
        <div className="bg-gray-50">
            <ViewIdea
                open={viewIdeaModalOpen}
                onOpenChange={closeModal}
                idea={
                    selectedIdea
                        ? selectedIdea
                        : {
                              id: '',
                              title: '',
                              description: '',
                              category: 'General',
                              tags: [],
                              recommended_level: 'Beginner',
                              created_at: new Date().toISOString(),
                              updated_at: new Date().toISOString(),
                              user_id: authUser?.id || '',
                              status: 'Pending',
                          }
                }
            />
            <div className="p-8 mx-auto min-h-[680px]">
                <h2 className="text-xl font-bold mb-4">My Submissions</h2>
                <Card className="flex flex-col p-8 min-h-96">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-6 ">
                        <Input
                            placeholder="Search ideas by title..."
                            value={search}
                            onChange={handleSearch}
                            className="sm:w-60 w-full h-8"
                        />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline3"
                                    className="flex items-center border-dashed h-8"
                                >
                                    <FilterIcon />
                                    <span>
                                        {selectedStatus
                                            ? selectedStatus
                                            : 'Status'}
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem
                                    className="text-gray-800 font-medium"
                                    onClick={() =>
                                        handleStatusSelect('Pending')
                                    }
                                >
                                    Pending
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="text-green-800 font-medium"
                                    onClick={() =>
                                        handleStatusSelect('Approved')
                                    }
                                >
                                    Approved
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="text-red-800 font-medium"
                                    onClick={() =>
                                        handleStatusSelect('Rejected')
                                    }
                                >
                                    Rejected
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {selectedStatus && (
                            <Button
                                variant="outline3"
                                className="border-dashed h-8"
                                onClick={handleRemoveFilter}
                            >
                                Remove Filter
                            </Button>
                        )}
                    </div>
                    <div className="flex-grow overflow-auto border border-gray-300 rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50">
                                    <TableHead>No.</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Feedback</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {displayedIdeas.length > 0 ? (
                                    displayedIdeas.map((idea, index) => (
                                        <TableRow key={idea.id}>
                                            <TableCell>
                                                {startIndex + index + 1}.
                                            </TableCell>
                                            <TableCell>{idea.title}</TableCell>
                                            <TableCell className="max-w-xs truncate">
                                                {idea.description}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        idea.status ===
                                                        'Approved'
                                                            ? 'default2'
                                                            : idea.status ===
                                                                'Rejected'
                                                              ? 'destructive2'
                                                              : 'secondary'
                                                    }
                                                >
                                                    {idea.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {idea.feedback ||
                                                    'No feedback yet'}
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <Button
                                                            variant="outline3"
                                                            size="sm"
                                                        >
                                                            <MoreHorizontal />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem
                                                            onClick={handleEdit}
                                                        >
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                openModal(idea)
                                                            }
                                                        >
                                                            <View className="mr-2 h-4 w-4" />
                                                            View
                                                        </DropdownMenuItem>

                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            className="text-red-600"
                                                            onClick={() => handleDelete(idea.id)}
                                                        >
                                                            <Trash className="mr-2 h-4 w-4" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={6}
                                            className="text-center py-8"
                                        >
                                            You haven't submitted any ideas yet.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination Controls */}
                    {filteredIdeas.length > 0 && (
                        <div className="flex flex-col sm:flex-row justify-between sm:gap-0 gap-4 items-center mt-8">
                            <span className="text-xs text-gray-600">
                                Total submissions: {filteredIdeas.length}
                            </span>
                            <div className="flex items-center space-x-8">
                                <Select
                                    onValueChange={(value) =>
                                        setRowsPerPage(Number(value))
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
                                        <SelectItem
                                            className="text-xs"
                                            value="15"
                                        >
                                            15
                                        </SelectItem>
                                        <SelectItem
                                            className="text-xs"
                                            value="20"
                                        >
                                            20
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
                                                    onClick={() =>
                                                        setCurrentPage((prev) =>
                                                            Math.max(
                                                                prev - 1,
                                                                1
                                                            )
                                                        )
                                                    }
                                                    disabled={currentPage === 1}
                                                >
                                                    <ChevronLeft
                                                        strokeWidth={2.5}
                                                    />
                                                </Button>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <Button
                                                    size="sm"
                                                    className="h-6 w-6 p-0"
                                                    variant="outline3"
                                                    onClick={() =>
                                                        setCurrentPage((prev) =>
                                                            Math.min(
                                                                prev + 1,
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
                                                        strokeWidth={2.5}
                                                    />
                                                </Button>
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </div>
                            </div>
                        </div>
                    )}
                </Card>

                <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your idea submission.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
        <AlertDialogAction 
          onClick={(e) => {
            e.preventDefault()
            confirmDelete()
          }} 
          disabled={isDeleting}
          className="bg-red-600 hover:bg-red-700"
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
            </div>
        </div>
    )
}
