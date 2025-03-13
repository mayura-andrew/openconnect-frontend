import { toast } from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { ideaApi } from '@/api'
import {
    ApiError,
    IdeaSubmissionRequest,
    IdeaSubmissionResponse,
} from '@/types'

interface UseIdeaSubmissionReturn {
    submitIdea: (data: IdeaSubmissionRequest) => void
    isLoading: boolean
    isError: boolean
    error: ApiError | null
    isSuccess: boolean
    reset: () => void
}

export const useIdeaSubmission = (): UseIdeaSubmissionReturn => {
    const {
        mutate: submitIdeaFn,
        isPending,
        isError,
        error,
        isSuccess,
        reset,
    } = useMutation<IdeaSubmissionResponse, ApiError, IdeaSubmissionRequest>({
        mutationFn: ideaApi.submitIdea,
        onSuccess: () => {
            toast.success('Idea submitted successfully!')
        },
        onError: (error) => {
            if (error.error) {
                // Handle validation errors
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
                toast.error(error.message || 'Failed to submit idea')
            }
        },
    })

    return {
        submitIdea: submitIdeaFn,
        isLoading: isPending,
        isError,
        error,
        isSuccess,
        reset,
    }
}
