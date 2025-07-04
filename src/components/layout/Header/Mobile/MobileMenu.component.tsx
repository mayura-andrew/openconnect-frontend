import { MobileButtons } from './MobileButton.component'
import { MobileNavigation } from './MobileNavigation.component'
import { MobileUserProfile } from './MobileUserProfile'

interface MobileMenuProps {
    isOpen: boolean
    onClose: () => void
    user: {
        name: string
        email: string
        avatar: string
    }
    onLogout: () => void
}

export const MobileMenu = ({
    isOpen,
    onClose,
    user,
    onLogout,
}: MobileMenuProps) => (
    <div className="border-t-2">
        {isOpen && (
            <div className="absolute left-0 w-full bg-white shadow-lg z-50 md:hidden top-16 mt-2.5">
                <div className="flex flex-col space-y-4 px-6 py-4">
                    <MobileButtons onClose={onClose} />
                    <MobileNavigation onClose={onClose} onLogout={onLogout} />
                    <MobileUserProfile user={user} onClose={onClose} />
                </div>
            </div>
        )}
    </div>
)
