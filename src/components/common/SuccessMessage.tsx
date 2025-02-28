import { SuccessMessageProps } from '@/types'
import { CheckCircle2 } from 'lucide-react'
import { Dialog, DialogContent } from '../ui/dialog'
import { Button } from '../ui/button'
import { motion } from 'framer-motion'

interface SuccessMessageModalProps extends SuccessMessageProps {
    isOpen: boolean
    onClose: () => void
}

const SuccessMessage: React.FC<SuccessMessageModalProps> = ({
    title,
    description,
    isOpen,
    onClose,
}) => {
    const isError = title.toLowerCase().includes('already exists')

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative p-6"
                >
                    <div className="flex flex-col items-center text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mb-4"
                        >
                            <div className={`rounded-full ${isError ? 'bg-yellow-100' : 'bg-green-100'} p-3`}>
                                <CheckCircle2 className={`h-8 w-8 ${isError ? 'text-yellow-600' : 'text-green-600'}`} />
                            </div>
                        </motion.div>

                        <motion.h2 className="text-xl font-semibold text-gray-900 mb-2">
                            {title}
                        </motion.h2>

                        <motion.div className="text-gray-600">
                            {description}
                        </motion.div>

                        <motion.div className="mt-6">
                            <Button
                                onClick={onClose}
                                className={`${isError ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'} text-white`}
                            >
                                {isError ? 'Go to Sign In' : 'Got it, thanks!'}
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            </DialogContent>
        </Dialog>
    )
}

export default  SuccessMessage