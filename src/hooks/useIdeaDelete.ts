import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '@/lib/axios'
import toast from 'react-hot-toast'
import { useIdea } from '@/context/IdeaContext'

interface UseIdeaDeleteReturn {
  deleteIdea: (ideaId: string) => Promise<void>
  isDeleting: boolean
  isError: boolean
  error: Error | null
  isSuccess: boolean
  reset: () => void
}

export const useIdeaDelete = (): UseIdeaDeleteReturn => {
  const queryClient = useQueryClient()
  const { notifyIdeaSubmission } = useIdea()
  
  const {
    mutateAsync: deleteIdeaFn,
    isPending,
    isError,
    error,
    isSuccess,
    reset,
  } = useMutation({
    mutationFn: async (ideaId: string) => {
      try {
        const response = await axiosInstance.delete(`/ideas/${ideaId}`)
        return response.data
      } catch (error: any) {
        if (error.response?.data) {
          throw {
            message: error.response.data.message || 'Failed to delete idea',
            error: error.response.data.error,
            status: error.response.status,
          }
        }
        throw {
          message: 'An unexpected error occurred',
          originalError: error,
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile-details'] })
      queryClient.invalidateQueries({ queryKey: ['ideas'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'ideas'] })
      
      notifyIdeaSubmission()
      
      toast.success('Idea deleted successfully')
    },
    onError: (error: any) => {
      if (error.error) {
        Object.entries(error.error).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            messages.forEach((message) => {
              toast.error(`${field}: ${message}`)
            })
          } else if (typeof messages === 'string') {
            toast.error(`${field}: ${messages}`)
          }
        })
      } else {
        toast.error(error.message || 'Failed to delete idea')
      }
    },
  })

  const deleteIdea = async (ideaId: string) => {
    return deleteIdeaFn(ideaId)
  }

  return {
    deleteIdea,
    isDeleting: isPending,
    isError,
    error,
    isSuccess,
    reset,
  }
}
