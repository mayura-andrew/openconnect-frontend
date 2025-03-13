import React, { useState, useMemo } from 'react'
import { useProfilesWithIdeas } from '@/hooks/useListProfileWithIdeas'
import { LoadingScreen } from '@/components/common/LoadingScreen.component'
import { GridLayout } from '@/components/layout/GridLayout.component'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
    ErrorState,
    NoProfilesFound,
    NoResultsFound,
} from '@/components/common/EmptyState.component'

const Community: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [facultyFilter, setFacultyFilter] = useState('all')
    const [sortBy, setSortBy] = useState('name')
    const [currentPage, setCurrentPage] = useState(1)
    const limit = 20
    const offset = (currentPage - 1) * limit

    const { data, isLoading, error, refetch } = useProfilesWithIdeas(
        limit,
        offset
    )

    // Reset filters and search
    const resetFilters = () => {
        setSearchQuery('')
        setFacultyFilter('all')
        setSortBy('name')
    }

    // Handle search, filtering, and sorting
    const filteredProfiles = useMemo(() => {
        if (!data?.profiles) return []

        return data.profiles
            .filter((user) => {
                // Search by name, title, skills, or bio
                const searchLower = searchQuery.toLowerCase()

                const matchesSearch =
                    !searchQuery ||
                    (user.name || '').toLowerCase().includes(searchLower) ||
                    (user.title || '').toLowerCase().includes(searchLower) ||
                    (user.bio || '').toLowerCase().includes(searchLower) ||
                    user.skills?.some((skill) =>
                        skill.toLowerCase().includes(searchLower)
                    )

                // Filter by faculty
                const matchesFaculty =
                    facultyFilter === 'all' ||
                    (user.faculty || '').toLowerCase() ===
                        facultyFilter.toLowerCase()

                return matchesSearch && matchesFaculty
            })
            .sort((a, b) => {
                // Sort by selected criteria
                switch (sortBy) {
                    case 'name':
                        return (a.name || '').localeCompare(b.name || '')
                    default:
                        return 0
                }
            })
    }, [data, searchQuery, facultyFilter, sortBy])

    // Extract unique faculties for filter dropdown
    const faculties = useMemo(() => {
        if (!data?.profiles) return []

        const facultySet = new Set<string>()
        data.profiles.forEach((user) => {
            if (user.faculty) facultySet.add(user.faculty)
        })

        return Array.from(facultySet)
    }, [data?.profiles])

    // If loading, show spinner
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-100px)]">
                <LoadingScreen message="Loading Profiles" />
            </div>
        )
    }

    // If error, show error state
    if (error) {
        return (
            <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-[70vh]">
                <ErrorState onRetry={() => refetch()} />
            </div>
        )
    }

    // If no data at all
    if (!data || !data.profiles || data.profiles.length === 0) {
        return (
            <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-[70vh]">
                <NoProfilesFound onRefresh={() => refetch()} />
            </div>
        )
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-col space-y-6">
                <>
                    <div>
                        <h1 className="text-2xl font-bold">Community</h1>
                        <p className="text-gray-500 mt-1 mb-6">
                            Connect with other professionals in your network
                        </p>
                    </div>

                    {/* Search and filter section */}
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                        <div className="w-full md:w-1/3">
                            <Input
                                placeholder="Search by name, title or skills..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto">
                            <Select
                                value={facultyFilter}
                                onValueChange={setFacultyFilter}
                            >
                                <SelectTrigger className="w-full md:w-44">
                                    <div className="truncate overflow-hidden text-ellipsis whitespace-nowrap">
                                        <SelectValue placeholder="Filter by Faculty" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Faculties
                                    </SelectItem>
                                    {faculties.map((faculty) => (
                                        <SelectItem
                                            key={faculty}
                                            value={faculty}
                                        >
                                            {faculty}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-full md:w-[150px]">
                                    <SelectValue placeholder="Sort By" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="name">
                                        Name (A-Z)
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Separator className="my-2" />
                </>

                {/* Results count */}
                <div className="text-sm text-gray-500">
                    Showing {filteredProfiles.length} of {data?.count || 0}{' '}
                    members
                </div>

                {/* Profile cards grid or empty state */}
                {filteredProfiles.length > 0 ? (
                    <GridLayout users={filteredProfiles} />
                ) : (
                    <div className="py-12">
                        <NoResultsFound onReset={resetFilters} />
                    </div>
                )}

                {/* Pagination */}
                {data?.count && data.count > limit && (
                    <div className="flex justify-center mt-8">
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={() =>
                                    setCurrentPage((p) => Math.max(1, p - 1))
                                }
                                disabled={currentPage === 1}
                            >
                                Previous
                            </Button>
                            <Button variant="outline">{currentPage}</Button>
                            <Button
                                variant="outline"
                                onClick={() => setCurrentPage((p) => p + 1)}
                                disabled={currentPage * limit >= data.count}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Community
