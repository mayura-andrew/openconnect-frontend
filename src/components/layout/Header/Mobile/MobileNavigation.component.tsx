import { Button } from '@/components/ui/button'
import { CircleUserRound, Settings, LogOut, LibraryBig } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface MobileNavigationProps {
    onClose: () => void
    onLogout: () => void
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
    onClose,
    onLogout,
}) => {
    const navigate = useNavigate()

    const navigationItems = [
        {
            label: 'My Submissions',
            icon: LibraryBig,
            onClick: () => {
                navigate('/mysubmission')
                onClose()
            },
        },
        {
            label: 'Profile',
            icon: CircleUserRound,
            onClick: () => {
                navigate('/profile')
                onClose()
            },
        },
        {
            label: 'Settings',
            icon: Settings,
            onClick: () => {
                navigate('/settings')
                onClose()
            },
        },
        {
            label: 'Logout',
            icon: LogOut,
            onClick: () => {
                onLogout()
                onClose()
            },
            className: 'text-red-600',
        },
    ]

    return (
        <div className="flex flex-col gap-2">
            {navigationItems.map((item) => (
                <Button
                    key={item.label}
                    variant="ghost"
                    className={`w-full justify-start ${item.className || ''}`}
                    onClick={item.onClick}
                >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                </Button>
            ))}
        </div>
    )
}
