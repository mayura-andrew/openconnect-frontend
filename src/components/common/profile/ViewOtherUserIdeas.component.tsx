import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { useProfilesWithIdeas } from '@/hooks/useListProfileWithIdeas'
import { LoadingScreen } from '@/components/common/LoadingScreen.component'
import { ErrorState } from '@/components/common/EmptyState.component'
import { Idea } from '@/types'
import React from 'react'
import { ViewIdea } from './ViewIdea.component'
import { Badge } from '@/components/ui/badge'

// Define the extended idea type that includes author information
interface IdeaWithAuthor extends Idea {
    author?: {
        name: string
        image: string
        id: string
    }
}

export const ViewOtherUsersIdeas = () => {
    // State for modal and idea selection
    const [viewIdeaModalOpen, setViewIdeaModalOpen] = useState(false)
    const [selectedIdea, setSelectedIdea] = useState<IdeaWithAuthor | null>(
        null
    )

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(6)
    const [offset, setOffset] = useState(0)

    // Search state
    const [search, setSearch] = useState('')

    // Fetch profiles with ideas using the custom hook
    const { data, isLoading, isError, refetch } = useProfilesWithIdeas(
        100,
        offset
    )

    // State to store all ideas from all users
    const [allIdeas, setAllIdeas] = useState<IdeaWithAuthor[]>([])
    const [filteredIdeas, setFilteredIdeas] = useState<IdeaWithAuthor[]>([])

    // Extract ideas from all profiles
    useEffect(() => {
        if (data?.profiles) {
            // Collect ideas from all profiles
            const ideas: IdeaWithAuthor[] = []
            data.profiles.forEach((profile) => {
                // Add profile information to each idea for display
                const ideasWithAuthor = profile.ideas.map((idea) => ({
                    ...idea,
                    author: {
                        name: profile.name || profile.username,
                        image: profile.image || profile.avatar || '',
                        id: profile.id,
                    },
                }))
                ideas.push(...ideasWithAuthor)
            })
            setAllIdeas(ideas)
            setFilteredIdeas(ideas)
        }
    }, [data])

    // Filter ideas based on search
    useEffect(() => {
        if (allIdeas.length > 0) {
            let filtered = allIdeas
            if (search) {
                filtered = filtered.filter((idea) =>
                    idea.title.toLowerCase().includes(search.toLowerCase())
                )
            }
            setFilteredIdeas(filtered)
            setCurrentPage(1)
        }
    }, [search, allIdeas])

    // Handle search input change
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    // Open idea modal
    const openModal = (idea: IdeaWithAuthor) => {
        setSelectedIdea(idea)
        setViewIdeaModalOpen(true)
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

    // Show loading state
    if (isLoading) {
        return <LoadingScreen message="Loading ideas..." />
    }

    // Show error state
    if (isError) {
        return (
            <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-[70vh]">
                <ErrorState onRetry={() => refetch()} />
            </div>
        )
    }

    return (
        <div className="bg-gray-50">
            {selectedIdea && (
                <ViewIdea
                    open={viewIdeaModalOpen}
                    onOpenChange={setViewIdeaModalOpen}
                    idea={{
                        ...selectedIdea,
                        category: selectedIdea.category || 'General',
                        tags: selectedIdea.tags || [],
                        learning_outcome:
                            selectedIdea.learning_outcome || 'Not specified',
                        recommended_level:
                            selectedIdea.recommended_level || 'Beginner',
                    }}
                />
            )}

            <div className="container mx-auto p-6 min-h-screen">
                <div className="sticky top-20 z-20 bg-white shadow-md px-4 py-7 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-6 sm:mb-4">
                    <div className="container px-4 mx-auto">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            {/* Page Title */}
                            <div className="flex items-center mb-6 md:mb-0">
                                <h2 className="text-xl font-bold">
                                    Ideas/ Submissions
                                </h2>
                            </div>

                            {/* Search Bar */}
                            <div className="relative w-full max-w-sm">
                                <Search
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={18}
                                />
                                <Input
                                    value={search}
                                    onChange={handleSearch}
                                    placeholder="Search ideas by title"
                                    className="w-full h-8 pl-10 pr-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 pt-8 sm:p-8">
                    {filteredIdeas.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 min-h-[350px]">
                            {displayedIdeas.map((idea) => (
                                <Card
                                    key={idea.id}
                                    className="px-6 pb-4 pt-6 shadow-md"
                                >
                                    <div className="flex items-center space-x-4">
                                        <Avatar>
                                            {idea.author?.image ? (
                                                <AvatarImage
                                                    src={`${import.meta.env.VITE_API_URL}/avatars/${idea.author.image}`}
                                                    alt={idea.author.name}
                                                />
                                            ) : null}
                                            <AvatarFallback>
                                                {idea.author?.name
                                                    ? idea.author.name[0].toUpperCase()
                                                    : 'U'}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-semibold text-sm">
                                                {idea.author?.name ||
                                                    'Anonymous'}
                                            </h3>
                                            <p className="text-xs text-gray-500">
                                                <span className="font-semibold">
                                                    Category:{' '}
                                                </span>
                                                {idea.category || 'General'}
                                            </p>
                                        </div>
                                    </div>
                                    <Separator />
                                    <h4 className="font-bold text-lg md:truncate">
                                        {idea.title}
                                    </h4>
                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                        {idea.description}
                                    </p>

                                    {/* Tags Section */}
                                    <div className="flex flex-wrap gap-2 my-4 truncate max-h-6">
                                        {idea.tags?.map((tag, index) => (
                                            <Badge
                                                key={index}
                                                className="bg-muted text-gray-600 text-xs hover:bg-slate-100 hover:text-gray-600"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    {/* View Button */}
                                    <div className="pt-2 mt-auto">
                                        <Button
                                            className="px-0 hover:text-blue-700"
                                            variant="link"
                                            size="sm"
                                            onClick={() => openModal(idea)}
                                        >
                                            View Full Details
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center min-h-[350px] bg-white rounded-lg shadow p-8">
                            <h3 className="text-xl font-bold mb-2">
                                No ideas found
                            </h3>
                            <p className="text-gray-500 text-center mb-6">
                                There are no ideas matching your search
                                criteria.
                            </p>
                            {search && (
                                <Button
                                    variant="outline"
                                    onClick={() => setSearch('')}
                                >
                                    Clear search
                                </Button>
                            )}
                        </div>
                    )}
                </div>

                {/* Pagination Controls */}
                {filteredIdeas.length > 0 && (
                    <div className="flex flex-col bg-white border-t-2 shadow-md sm:flex-row justify-between sm:gap-0 gap-4 items-center p-6 mt-auto">
                        <span className="text-xs font-medium text-gray-600">
                            <span className="font-semibold text-gray-700">
                                {displayedIdeas.length}
                            </span>{' '}
                            of{' '}
                            <span className="font-semibold text-gray-700">
                                {filteredIdeas.length}
                            </span>{' '}
                            submission(s)
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
                                        htmlFor="ideas-per-page"
                                    >
                                        Ideas per page
                                    </Label>
                                    <SelectTrigger
                                        id="ideas-per-page"
                                        className="w-[60px] h-6 text-xs"
                                    >
                                        <SelectValue placeholder="Rows per page" />
                                    </SelectTrigger>
                                </div>
                                <SelectContent>
                                    <SelectItem className="text-xs" value="6">
                                        6
                                    </SelectItem>
                                    <SelectItem className="text-xs" value="10">
                                        10
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
                                                onClick={() =>
                                                    setCurrentPage((prev) =>
                                                        Math.max(prev - 1, 1)
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
                                                    currentPage === totalPages
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
            </div>
        </div>
    )
}
