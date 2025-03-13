import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Idea } from '@/types'
import toast from 'react-hot-toast'
import { axiosInstance } from '@/lib/axios'

// Types for API responses
interface IdeasListResponse {
  ideas: Idea[]
  metadata: {
    current_page: number
    page_size: number
    first_page: number
    last_page: number
    total_records: number
  }
}

// Fetch all ideas for admin
export function useAdminIdeas(page = 1, pageSize = 10) {
  return useQuery<IdeasListResponse>({
    queryKey: ['admin', 'ideas', page, pageSize],
    queryFn: async () => {
      const response = await axiosInstance.get(`/ideas?page=${page}&page_size=${pageSize}`)
      return response.data
    }
  })
}

// Update idea status and feedback
export function useUpdateIdeaStatus() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ 
      ideaId, 
      status, 
      feedback 
    }: { 
      ideaId: string; 
      status: 'approved' | 'rejected' | 'pending'; 
      feedback?: string 
    }) => {
      const payload: { status: string; feedback?: string } = { status }
      
      if (feedback) {
        payload.feedback = feedback
      }
      
      const response = await axiosInstance.patch(`/ideas/${ideaId}`, payload)
      return response.data
    },
    onSuccess: () => {
      // Invalidate and refetch ideas list
      queryClient.invalidateQueries({ queryKey: ['admin', 'ideas'] })
      toast.success('Idea updated successfully')
    },
    onError: (error) => {
      console.error('Error updating idea:', error)
      toast.error('Failed to update idea')
    }
  })
}

// Get a single idea by ID
export function useAdminIdeaDetails(ideaId?: string) {
  return useQuery({
    queryKey: ['admin', 'idea', ideaId],
    queryFn: async () => {
      if (!ideaId) throw new Error('No idea ID provided')
      const response = await axiosInstance.get(`/ideas/${ideaId}`)
      return response.data
    },
    enabled: !!ideaId, // Only run query if ideaId exists
  })
}