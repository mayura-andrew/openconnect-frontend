import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { EmptyStateProps } from '@/types'
import { Users, Search, AlertCircle } from 'lucide-react'

export const EmptyState = ({
    title,
    description,
    icon,
    actionLabel,
    onAction,
    secondaryActionLabel,
    onSecondaryAction,
}: EmptyStateProps) => {
    return (
        <Card className="w-full max-w-md mx-auto shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-12 px-6 text-center">
                <div className="rounded-full bg-muted p-3 mb-4">
                    {icon || (
                        <Users className="h-10 w-10 text-muted-foreground" />
                    )}
                </div>

                <h3 className="mt-2 text-lg font-semibold">{title}</h3>
                <p className="mt-1 text-muted-foreground text-sm max-w-xs mx-auto">
                    {description}
                </p>

                {actionLabel && onAction && (
                    <Button onClick={onAction} className="mt-6">
                        {actionLabel}
                    </Button>
                )}

                {secondaryActionLabel && onSecondaryAction && (
                    <Button
                        variant="outline"
                        onClick={onSecondaryAction}
                        className="mt-2"
                    >
                        {secondaryActionLabel}
                    </Button>
                )}
            </CardContent>
        </Card>
    )
}

// Export some common empty states for reuse
export const NoResultsFound = ({ onReset }: { onReset?: () => void }) => (
    <EmptyState
        title="No results found"
        description="Try adjusting your search or filter criteria to find what you're looking for."
        icon={<Search className="h-10 w-10 text-muted-foreground" />}
        actionLabel={onReset ? 'Clear filters' : undefined}
        onAction={onReset}
    />
)

export const NoProfilesFound = ({ onRefresh }: { onRefresh?: () => void }) => (
    <EmptyState
        title="No profiles available"
        description="There are no profiles to display at this time. Check back later or try refreshing."
        icon={<Users className="h-10 w-10 text-muted-foreground" />}
        actionLabel={onRefresh ? 'Refresh' : undefined}
        onAction={onRefresh}
    />
)

export const ErrorState = ({ onRetry }: { onRetry?: () => void }) => (
    <EmptyState
        title="Something went wrong"
        description="We couldn't load the profiles. This might be due to a connection issue or a temporary problem."
        icon={<AlertCircle className="h-10 w-10 text-destructive" />}
        actionLabel="Try again"
        onAction={onRetry}
    />
)
