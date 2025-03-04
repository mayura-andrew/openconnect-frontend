// import { useState, useEffect } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import { profileApi } from '@/api'
// import { User } from '@/types'
// import Header from '@/components/layout/header/Header.component'
// import { useApp } from '@/context/AppContext'
// import { RequestPanel } from '@/components/RequestPanel'
// import Spinner from '@/components/Spinner/Spinner.component'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import { Separator } from '@/components/ui/separator'
// import { Button } from '@/components/ui/button'
// import { useAuth } from '@/context/AuthContext'
// import { useSendConnectionRequest } from '@/hooks/useConnections'
// import { 
//   Mail, 
//   Phone, 
//   GraduationCap, 
//   University, 
//   School, 
//   Linkedin, 
//   Facebook, 
//   Github, 
//   User as UserIcon,
//   MessageSquare
// } from 'lucide-react'
// import toast from 'react-hot-toast'

// export default function ProfileView() {
//   const { username } = useParams<{ username: string }>()
//   const [profile, setProfile] = useState<User | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const navigate = useNavigate()
//   const { requests, isRequestPanelOpen, setIsRequestPanelOpen } = useApp()
//   const { user: currentUser } = useAuth()
//   const { mutate: sendRequest, isLoading: isSendingRequest } = useSendConnectionRequest()
  
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setLoading(true)
//         if (!username) {
//           throw new Error('Username is required')
//         }
//         const data = await profileApi.getProfileByUsername(username)
//         setProfile(data)
//       } catch (err: any) {
//         setError(err.message || 'Failed to load profile')
//         toast.error('Failed to load profile')
//       } finally {
//         setLoading(false)
//       }
//     }
    
//     fetchProfile()
//   }, [username])
  
//   const handleConnect = () => {
//     if (!profile) return
    
//     sendRequest(profile.id, {
//       onSuccess: () => {
//         toast.success(`Connection request sent to ${profile.name || profile.username}!`)
//       }
//     })
//   }
  
//   if (loading) {
//     return (
//       <div className="flex h-screen w-full items-center justify-center">
//         <Spinner />
//       </div>
//     )
//   }
  
//   if (error || !profile) {
//     return (
//       <div className="flex h-screen w-full items-center justify-center flex-col">
//         <h2 className="text-2xl font-bold text-red-600">Error</h2>
//         <p className="mt-2">{error || 'Profile not found'}</p>
//         <Button onClick={() => navigate(-1)} className="mt-4">Go Back</Button>
//       </div>
//     )
//   }
  
//   return (
//     <div className="bg-gray-50">
//       <Header
//         requests={requests}
//         isRequestPanelOpen={isRequestPanelOpen}
//         setIsRequestPanelOpen={setIsRequestPanelOpen}
//       />
//       <RequestPanel
//         requests={requests}
//         isOpen={isRequestPanelOpen}
//         onClose={() => setIsRequestPanelOpen(false)}
//       />
      
//       <div className="p-6 min-h-screen">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-bold mb-2 lg:mb-0">
//             {profile.fullName || profile.name || profile.username}'s Profile
//           </h2>
          
//           {currentUser?.id !== profile.id && (
//             <div className="flex gap-2">
//               <Button 
//                 className="flex items-center gap-2" 
//                 onClick={handleConnect} 
//                 disabled={isSendingRequest}
//               >
//                 {isSendingRequest ? <Spinner size="sm" /> : 'Connect'}
//               </Button>
//               <Button variant="outline" className="flex items-center gap-2">
//                 <MessageSquare className="w-4 h-4" />
//                 Message
//               </Button>
//             </div>
//           )}
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Panel */}
//           <div className="flex flex-col lg:col-span-1 gap-6">
//             <Card>
//               <CardHeader className="flex flex-col items-center p-6">
//                 <Avatar className="w-32 h-32">
//                   <AvatarImage src={profile.avatar} alt={profile.fullName || profile.name || profile.username} />
//                   <AvatarFallback className="text-5xl">
//                     {(profile.fullName || profile.name || profile.username)
//                       .split(' ')
//                       .slice(0, 2)
//                       .map((n) => n[0])
//                       .join('')
//                       .toUpperCase()}
//                   </AvatarFallback>
//                 </Avatar>
//                 <CardTitle className="text-lg font-bold text-center pt-2">
//                   {profile.fullName || profile.name || profile.username}
//                 </CardTitle>
//                 <p className="text-sm text-muted-foreground">{profile.title}</p>
//                 <Separator className="my-4" />
//               </CardHeader>
//               <CardContent className="space-y-3 text-sm text-left">
//                 {[
//                   {
//                     icon: UserIcon,
//                     label: 'Full Name:',
//                     value: profile.fullName || profile.name || profile.username,
//                   },
//                   { icon: Mail, label: 'E-mail:', value: profile.email },
//                   profile.mobile ? { icon: Phone, label: 'Mobile:', value: profile.mobile } : null,
//                   profile.degree ? {
//                     icon: GraduationCap,
//                     label: 'Degree:',
//                     value: profile.degree,
//                   } : null,
//                   profile.uni ? { icon: University, label: 'University:', value: profile.uni } : null,
//                   profile.faculty ? { icon: School, label: 'Faculty:', value: profile.faculty } : null,
//                 ]
//                   .filter(Boolean)
//                   .map(({ icon: Icon, label, value }, index) => (
//                     <div
//                       key={index}
//                       className="flex flex-col sm:flex-row sm:items-center gap-2"
//                     >
//                       <div className="flex items-center gap-2 min-w-[120px]">
//                         <Icon className="w-4 sm:w-5 text-gray-600" />
//                         <span className="font-semibold">{label}</span>
//                       </div>
//                       <span className="text-gray-700 sm:flex-1">{value}</span>
//                     </div>
//                   ))}
//                 <div className="flex items-center pt-3">
//                   {profile.linkedin && (
//                     <a
//                       href={profile.linkedin}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <Linkedin className="inline-block mr-3 w-6 mt-4 text-[#0077b5]" />
//                     </a>
//                   )}
//                   {profile.fb && (
//                     <a href={profile.fb} target="_blank" rel="noopener noreferrer">
//                       <Facebook className="inline-block mr-3 w-6 mt-4 text-[#1877f2]" />
//                     </a>
//                   )}
//                   {profile.github && (
//                     <a
//                       href={profile.github}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <Github className="inline-block mr-3 w-6 mt-4" />
//                     </a>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Skills Card */}
//             {profile.skills && profile.skills.length > 0 && (
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="text-base font-bold">
//                     Skills & Interests
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex flex-wrap gap-2">
//                     {profile.skills.map((skill) => (
//                       <span
//                         key={skill}
//                         className="text-xs bg-muted px-2 py-1 rounded text-foreground"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             )}
//           </div>

//           {/* Right Panel */}
//           <div className="lg:col-span-2 space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-base font-bold">
//                   About
//                 </CardTitle>
//                 <Separator />
//               </CardHeader>
//               <CardContent className="text-sm text-muted-foreground">
//                 {profile.bio || 'No bio provided.'}
//               </CardContent>
//             </Card>
            
//             {/* Add Ideas/Projects section here if you want to show the user's ideas */}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }