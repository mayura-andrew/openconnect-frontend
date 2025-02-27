import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const GoogleCallback = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const token = params.get('token')
        const error = params.get('error')

        if (token) {
            localStorage.setItem('token', token)
            toast.success('Successfully signed in with Google!')
            navigate('/')
        } else if (error) {
            toast.error(error)
            navigate('/auth/signin')
        }
    }, [navigate])

    return <div>Processing Google authentication...</div>
}

export default GoogleCallback