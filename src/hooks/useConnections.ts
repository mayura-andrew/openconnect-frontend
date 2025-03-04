// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { connectionApi } from '@/api'
// import { toast } from 'react-hot-toast'

// export function useConnections() {
//   const queryClient = useQueryClient()
  
//   const { data: myConnections = [], isLoading: isConnectionsLoading } = useQuery({
//     queryKey: ['connections'],
//     queryFn: () => connectionApi.getMyConnections()
//   })
  
//   const { data: connectionRequests = [], isLoading: isRequestsLoading } = useQuery({
//     queryKey: ['connectionRequests'],
//     queryFn: () => connectionApi.getConnectionRequests()
//   })
  
//   const { mutate: sendConnectionRequest, isPending: isRequestSending } = useMutation({
//     mutationFn: (userId: number) => connectionApi.sendRequest(userId),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['sentRequests'] })
//     },
//     onError: (error: any) => {
//       toast.error(error.message || 'Failed to send connection request')
//     }
//   })
  
//   const { mutate: acceptConnectionRequest, isPending: isAccepting } = useMutation({
//     mutationFn: (requestId: number) => connectionApi.acceptRequest(requestId),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['connectionRequests'] })
//       queryClient.invalidateQueries({ queryKey: ['connections'] })
//     },
//     onError: (error: any) => {
//       toast.error(error.message || 'Failed to accept connection request')
//     }
//   })
  
//   const { mutate: rejectConnectionRequest, isPending: isRejecting } = useMutation({
//     mutationFn: (requestId: number) => connectionApi.rejectRequest(requestId),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['connectionRequests'] })
//     },
//     onError: (error: any) => {
//       toast.error(error.message || 'Failed to reject connection request')
//     }
//   })
  
//   return {
//     myConnections,
//     connectionRequests,
//     isConnectionsLoading,
//     isRequestsLoading,
//     sendConnectionRequest,
//     acceptConnectionRequest,
//     rejectConnectionRequest,
//     isRequestSending,
//     isAccepting,
//     isRejecting
//   }
// }