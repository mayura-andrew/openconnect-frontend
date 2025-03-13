import { User } from '@/types'
import { ProfileCard } from '../common/profile/ProfileCard.component'

interface GridLayoutProps {
    users: User[]
}

export const GridLayout: React.FC<GridLayoutProps> = ({ users }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {users.map((user) => (
            <ProfileCard key={user.id} user={user} />
        ))}
    </div>
)
