import { Button } from '@/components/ui/button'
import { ProfileOnboardingData } from '@/types'
import { useForm } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Form } from '@/components/ui/form'
import { ManageSkillStep } from '@/components/common/profile/ManageSkillOnboarding.component'

interface SkillsStepProps {
    formData: ProfileOnboardingData
    updateFormData: (data: Partial<ProfileOnboardingData>) => void
    nextStep: () => void
    prevStep: () => void
}

export function SkillsStep({
    formData,
    updateFormData,
    nextStep,
    prevStep,
}: SkillsStepProps) {
    const form = useForm({
        defaultValues: {
            skills: formData.skills || [],
        },
    })

    function onSubmit() {
        updateFormData({ skills: formData.skills })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <div className="mb-4">
                        <h3 className="text-lg font-medium mb-2">
                            Skills & Interests
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Add skills and interests that are relevant to your
                            professional profile. These help others with similar
                            interests connect with you.
                        </p>

                        <ManageSkillStep
                            skills={formData.skills}
                            setSkills={(skills) => updateFormData({ skills })}
                        />
                    </div>
                </div>

                <div className="flex justify-between">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        className="flex items-center"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                    <Button
                        type="submit"
                        onClick={nextStep}
                        className="flex items-center"
                    >
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </form>
        </Form>
    )
}
