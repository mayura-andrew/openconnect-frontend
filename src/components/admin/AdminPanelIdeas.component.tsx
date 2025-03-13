import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '@/components/ui/table'
import { Pagination, PaginationContent, PaginationItem } from '../ui/pagination'
import {
    ChevronLeft,
    ChevronRight,
    Download,
    Edit,
    FilterIcon,
    Link,
    ExternalLink,
} from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select'
import { Label } from '../ui/label'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { LoadingScreen } from '../common/LoadingScreen.component'
import { ErrorState } from '../common/EmptyState.component'
import { format } from 'date-fns'

// Import the hooks
import { useAdminIdeas, useUpdateIdeaStatus } from '@/hooks/useAdminIdeas'

const AdminPanelIdeas: React.FC = () => {
    // State for pagination and filtering
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [selectedIdea, setSelectedIdea] = useState<string | null>(null)
    const [feedback, setFeedback] = useState('')
    const [search, setSearch] = useState('')
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
    const [reviewDialogOpen, setReviewDialogOpen] = useState(false)
    
    // Fetch ideas using the hook
    const { 
        data, 
        isLoading, 
        isError, 
        refetch 
    } = useAdminIdeas(currentPage, pageSize)
    
    // Update idea status mutation
    const updateStatusMutation = useUpdateIdeaStatus()
    
    // Filtered ideas
    const filteredIdeas = data?.ideas.filter(idea => {
        // Filter by search term
        if (search && !idea.title.toLowerCase().includes(search.toLowerCase())) {
            return false
        }
        
        // Filter by status
        if (selectedStatus && idea.status !== selectedStatus) {
            return false
        }
        
        return true
    }) || []
    
    // Search and filter handlers
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }
    
    const handleStatusSelect = (status: string) => {
        setSelectedStatus(status)
    }
    
    const handleRemoveFilter = () => {
        setSelectedStatus(null)
    }
    
    // Review handlers
    const handleReview = (ideaId: string) => {
        setSelectedIdea(ideaId)
        setReviewDialogOpen(true)
        // Reset feedback when opening dialog
        setFeedback('')
    }
    
    const handleAction = async (action: 'approved' | 'rejected' | 'pending') => {
        if (!selectedIdea) return
        
        try {
            await updateStatusMutation.mutateAsync({
                ideaId: selectedIdea,
                status: action,
                feedback: feedback.trim() || undefined
            })
            
            // Close dialog after successful update
            setReviewDialogOpen(false)
            setSelectedIdea(null)
            setFeedback('')
        } catch (error) {
            console.error('Failed to update idea:', error)
        }
    }
    
    // Get the selected idea details
    const selectedIdeaData = data?.ideas.find(idea => idea.id === selectedIdea)
    
    // Status badge component
    const StatusBadge = ({ status }: { status: string }) => {
        switch (status) {
            case 'approved':
                return <Badge className="bg-green-100 text-green-800">Approved</Badge>
            case 'rejected':
                return <Badge variant="destructive">Rejected</Badge>
            default:
                return <Badge variant="secondary">Pending</Badge>
        }
    }
    
    // Loading state
    if (isLoading) {
        return <LoadingScreen message="Loading ideas..." />
    }
    
    // Error state
    if (isError) {
        return (
            <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-[70vh]">
                <ErrorState onRetry={() => refetch()} />
            </div>
        )
    }
    
    // Calculate pagination
    const totalPages = data?.metadata.last_page || 1

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Submitted Ideas</h2>
            <Card className="p-4 bg-white shadow-md rounded-lg">
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 border-b px-1 py-4 mb-6 ">
                    <Input
                        placeholder="Search ideas by title..."
                        value={search}
                        onChange={handleSearch}
                        className="sm:w-80 w-full h-8"
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline3"
                                className="flex items-center border-dashed h-8"
                            >
                                <FilterIcon />
                                <span>
                                    {selectedStatus ? selectedStatus : 'Status'}
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                className="text-gray-800 font-medium"
                                onClick={() => handleStatusSelect('pending')}
                            >
                                Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-green-800 font-medium"
                                onClick={() => handleStatusSelect('approved')}
                            >
                                Approved
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-red-800 font-medium"
                                onClick={() => handleStatusSelect('rejected')}
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

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-gray-400 w-12">#</TableHead>
                            <TableHead className="text-gray-400">Title</TableHead>
                            <TableHead className="text-gray-400">Category</TableHead>
                            <TableHead className="text-gray-400">Date</TableHead>
                            <TableHead className="text-gray-400">Status</TableHead>
                            <TableHead className="text-gray-400">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredIdeas.length > 0 ? (
                            filteredIdeas.map((idea, index) => (
                                <TableRow key={idea.id}>
                                    <TableCell className="font-medium">
                                        {(currentPage - 1) * pageSize + index + 1}
                                    </TableCell>
                                    <TableCell className="font-medium max-w-[200px] truncate">
                                        {idea.title}
                                    </TableCell>
                                    <TableCell>
                                        {idea.category || 'General'}
                                    </TableCell>
                                    <TableCell>
                                        {format(new Date(idea.created_at), 'MMM d, yyyy')}
                                    </TableCell>
                                    <TableCell>
                                        <StatusBadge status={idea.status || 'pending'} />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="text-blue-600 hover:text-blue-700"
                                                onClick={() => handleReview(idea.id)}
                                            >
                                                Review
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8">
                                    No ideas found matching your filters.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                {/* Review Dialog */}
                {selectedIdeaData && (
                    <Dialog
                        open={reviewDialogOpen}
                        onOpenChange={setReviewDialogOpen}
                    >
                        <DialogContent className="sm:max-w-[700px] bg-white p-6 overflow-y-auto max-h-[90vh] custom-scrollbar">
                            <DialogHeader>
                                <DialogTitle className="text-gray-900 text-2xl font-semibold pb-4">
                                    {selectedIdeaData.title}
                                    <Separator className="mt-2 h-0.5 rounded-full bg-slate-100" />
                                </DialogTitle>
                            </DialogHeader>

                            <p className="text-gray-700 mb-2">
                                <strong>Category:</strong>{' '}
                                {selectedIdeaData.category || 'General'}
                            </p>
                            <Separator />

                            <p className="text-gray-800 mt-4 mb-2 font-bold">
                                Description
                            </p>
                            <p className="text-gray-600">
                                {selectedIdeaData.description}
                            </p>

                            <Separator />

                            {selectedIdeaData.pdf && (
                                <>
                                    <p className="flex items-center gap-4 text-gray-800 mt-4 font-bold">
                                        Uploaded PDF
                                    </p>
                                    <Button
                                        size="sm"
                                        onClick={() =>
                                            window.open(
                                                `${import.meta.env.VITE_API_URL}/pdfs/${selectedIdeaData.pdf}`,
                                                '_blank'
                                            )
                                        }
                                        className="flex items-center gap-2 w-full sm:w-36"
                                    >
                                        <Download size={16} /> Download PDF
                                    </Button>
                                    <Separator />
                                </>
                            )}

                            {selectedIdeaData.github_link && (
                                <>
                                    <p className="text-gray-800 mt-4 font-bold">
                                        GitHub Repository
                                    </p>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() =>
                                            window.open(
                                                selectedIdeaData.github_link,
                                                '_blank'
                                            )
                                        }
                                        className="flex items-center gap-2 w-full sm:w-36 font-semibold"
                                    >
                                        <ExternalLink size={16} />
                                        Open URL
                                    </Button>
                                    <Separator />
                                </>
                            )}

                            <p className="text-gray-800 mt-4 mb-2 font-bold">
                                Learning Outcome
                            </p>
                            <p className="text-gray-600">
                                {selectedIdeaData.learning_outcome || 'Not specified'}
                            </p>

                            <Separator />

                            <div className="mt-4">
                                <p className="text-gray-800 mb-6 font-bold">
                                    Tags
                                </p>
                                <div className="flex flex-wrap gap-4 mt-1">
                                    {selectedIdeaData.tags && selectedIdeaData.tags.length > 0 ? (
                                        selectedIdeaData.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                className="bg-muted text-gray-600 text-xs hover:bg-slate-100 hover:text-gray-600"
                                            >
                                                {tag}
                                            </Badge>
                                        ))
                                    ) : (
                                        <p className="text-gray-400 text-xs italic">
                                            No tags available
                                        </p>
                                    )}
                                </div>
                            </div>
                            <Separator className="my-4" />

                            <p className="text-gray-800 font-bold">Feedback</p>

                            {selectedIdeaData.feedback ? (
                                <div className="text-gray-600 bg-gray-50 text-xs border p-4 rounded-md flex flex-row justify-between items-center">
                                    <p>{selectedIdeaData.feedback}</p>
                                </div>
                            ) : (
                                <p className="text-gray-400 text-xs italic">
                                    No feedback provided yet.
                                </p>
                            )}

                            <Separator className="my-4" />

                            <Textarea
                                placeholder="Provide feedback..."
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                            />
                            
                            <DialogFooter className="mt-6 flex justify-end gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleAction('rejected')}
                                    disabled={updateStatusMutation.isPending}
                                >
                                    Reject
                                </Button>
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    className="hover:bg-slate-300/50 border-gray-600 border"
                                    onClick={() => handleAction('pending')}
                                    disabled={updateStatusMutation.isPending}
                                >
                                    Request Changes
                                </Button>
                                <Button
                                    size="sm"
                                    variant="default"
                                    onClick={() => handleAction('approved')}
                                    disabled={updateStatusMutation.isPending}
                                >
                                    Approve
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )}

                {/* Pagination Controls */}
                {data && (
                    <div className="flex flex-col sm:flex-row border-t-2 justify-between sm:gap-0 gap-4 items-center p-2 pt-4 mt-6">
                        <span className="text-xs text-gray-600">
                            <span className="font-semibold text-gray-700">
                                {filteredIdeas.length}
                            </span>{' '}
                            of{' '}
                            <span className="font-semibold text-gray-700">
                                {data.metadata.total_records}
                            </span>{' '}
                            submission(s)
                        </span>
                        <div className="flex items-center space-x-8">
                            <Select
                                onValueChange={(value) => {
                                    setPageSize(Number(value))
                                    setCurrentPage(1) // Reset to first page when changing page size
                                }}
                                value={String(pageSize)}
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
                                    <SelectItem className="text-xs" value="10">
                                        10
                                    </SelectItem>
                                    <SelectItem className="text-xs" value="15">
                                        15
                                    </SelectItem>
                                    <SelectItem className="text-xs" value="20">
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
                                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                                disabled={currentPage === 1}
                                            >
                                                <ChevronLeft strokeWidth={2.5} />
                                            </Button>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <Button
                                                size="sm"
                                                className="h-6 w-6 p-0"
                                                variant="outline3"
                                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                                disabled={currentPage === totalPages}
                                            >
                                                <ChevronRight strokeWidth={2.5} />
                                            </Button>
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    )
}

export default AdminPanelIdeas