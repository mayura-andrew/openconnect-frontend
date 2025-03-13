import React, { useState } from 'react'

import { User } from '@/types'
import { Logo } from './Logo.component'
import { NavButtons } from './NavButton.component'
import { UserProfile } from './UserProfile.component'
import { MobileMenu } from './Mobile/MobileMenu.component'
import { MobileMenuButton } from './Mobile/MobileMenuButton.component'

interface HeaderProps {
    requests: Array<{
        id: number
        name: string
        title: string
        image: string
    }>
    isRequestPanelOpen: boolean
    setIsRequestPanelOpen: (isOpen: boolean) => void
    user: User
    onLogout: () => void
}

const Header: React.FC<HeaderProps> = ({
    requests,
    isRequestPanelOpen,
    setIsRequestPanelOpen,
    user,
    onLogout,
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    // Transform user for component needs
    const transformedUser = {
        name:
            `${user.firstname || ''} ${user.lastname || ''}`.trim() ||
            user.username ||
            'User',
        email: user.email || '',
        avatar: user.avatar
            ? `${import.meta.env.VITE_API_URL}/avatars/${user.avatar}`
            : 'https://github.com/shadcn.png',
    }

    return (
        <header className="bg-white shadow-md py-3 px-6 flex items-center justify-between flex-wrap md:flex-nowrap sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 left-0 right-0">
            <div className="flex">
                <Logo />
            </div>
            <div className="hidden md:flex items-center space-x-4 md:space-x-6 md:ml-auto flex-wrap justify-end w-full sm:w-auto">
                <NavButtons
                    requests={requests}
                    setIsRequestPanelOpen={setIsRequestPanelOpen}
                />

                <UserProfile user={transformedUser} onLogout={onLogout} />
            </div>
            <div className="ml-auto md:hidden">
                <MobileMenuButton
                    isOpen={isMobileMenuOpen}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
            </div>

            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                user={transformedUser}
                onLogout={onLogout}
            />
        </header>
    )
}

export default Header
