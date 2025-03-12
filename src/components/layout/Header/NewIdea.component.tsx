import React, { useEffect, useRef, useState } from 'react'
import { BookOpen, FileText, Github, Loader2, Plus, Send, Tag, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useIdeaSubmission } from '@/hooks/useIdeaSubmission'

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  github_link: z.string().optional(),
  description: z.string().min(10, 'Description should be at least 10 characters'),
  category: z.string().min(1, 'Please select a category'),
  tags: z.array(z.string()),
  learning_outcome: z.string().min(10, 'Please share what you learned'),
  recommended_level: z.enum(['beginner', 'intermediate', 'advanced']),
  pdfFile: z.union([z.instanceof(File), z.null()]).optional(),
})

interface NewIdeaModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const NewIdea: React.FC<NewIdeaModalProps> = ({ open, onOpenChange }) => {
  const [tags, setTags] = React.useState<string[]>([])
  const [newTag, setNewTag] = React.useState<string>('')
  const [isFetching, setIsFetching] = React.useState(false)
  const [, setFetchError] = React.useState<string>('')

  const { submitIdea, isLoading, isSuccess } = useIdeaSubmission()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      github_link: '',
      description: '',
      category: '',
      tags: [],
      learning_outcome: '',
      recommended_level: 'beginner',
      pdfFile: null,
    },
  })

  const fetchResourceMetadata = async (url: string) => {
    if (!url) return

    setIsFetching(true)
    setFetchError('')

    try {
      const response = await fetch(
        `http://localhost:3001/api/fetchMetaData?url=${encodeURIComponent(url)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch resource details')
      }

      const metadata = await response.json()

      form.setValue('title', metadata.title)
      form.setValue('description', metadata.description)

      console.log(metadata)
    } catch (error) {
      setFetchError('Failed to fetch resource details. You can enter them manually.')
      console.error('Failed to fetch resource details', error)
    } finally {
      setIsFetching(false)
    }
  }

  React.useEffect(() => {
    const url = form.watch('github_link')
    if (url && url.startsWith('http')) {
      fetchResourceMetadata(url)
    }
  }, [form.watch('github_link')])

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove)
    setTags(updatedTags)
  }

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setSelectedFile(file)
  }

  const removeFile = () => {
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Convert selectedFile to base64 if it exists
    if (selectedFile) {
      const reader = new FileReader()
      reader.onload = () => {
        const base64String = reader.result as string
        const base64Data = base64String.split(',')[1] // Extract base64 part after comma

        const ideaData = {
          title: values.title,
          description: values.description,
          pdf: base64Data,
          category: values.category,
          tags: tags,
          learning_outcome: values.learning_outcome,
          recommended_level: values.recommended_level,
          github_link: values.github_link || undefined,
        }

        submitIdea(ideaData)
      }
      reader.readAsDataURL(selectedFile)
    } else {
      submitIdea({
        title: values.title,
        description: values.description,
        category: values.category,
        tags: tags,
        learning_outcome: values.learning_outcome,
        recommended_level: values.recommended_level,
        github_link: values.github_link || undefined,
      })
    }
  }

  useEffect(() => {
    if (isSuccess) {
      onOpenChange(false)
    }
  }, [isSuccess, onOpenChange])

  // Level icons with emojis representing growth
  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'beginner':
        return '🌱' // Seedling for beginner
      case 'intermediate':
        return '🌿' // Growing plant for intermediate
      case 'advanced':
        return '🌳' // Full tree for advanced
      default:
        return '🌱'
    }
  }

  // Level descriptions
  const levelDescriptions = {
    beginner: 'For those new to the concept',
    intermediate: 'Requires some prior knowledge',
    advanced: 'For experienced practitioners',
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] bg-white p-6 overflow-y-auto max-h-[90vh] custom-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-gray-900 text-2xl font-semibold pb-4">
            Share Your Project/Idea
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 font-medium flex items-center gap-2">
                    <FileText size={18} className="text-blue-600" />
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter project/idea title"
                      className="border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 font-medium flex items-center gap-2">
                        <BookOpen size={18} className="text-blue-600" />
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your project or idea..."
                          className="min-h-[120px] border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 font-medium">Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-gray-300 focus:ring-blue-600">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Programming">Programming</SelectItem>
                          <SelectItem value="Design">Design</SelectItem>
                          <SelectItem value="Business">Business</SelectItem>
                          <SelectItem value="Science">Science</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

                {/* Recommended Level with Emojis */}
                <FormField
                  control={form.control}
                  name="recommended_level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 font-medium">Recommended Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-gray-300 focus:ring-blue-600">
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">
                            <div className="flex items-center gap-2">
                              <span>{getLevelIcon('beginner')}</span>
                              <span>Beginner</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="intermediate">
                            <div className="flex items-center gap-2">
                              <span>{getLevelIcon('intermediate')}</span>
                              <span>Intermediate</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="advanced">
                            <div className="flex items-center gap-2">
                              <span>{getLevelIcon('advanced')}</span>
                              <span>Advanced</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription className="text-xs text-gray-500">
                        {field.value
                          ? levelDescriptions[field.value as keyof typeof levelDescriptions]
                          : ''}
                      </FormDescription>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

                {/* PDF Upload */}
                <div className="space-y-2">
                  <FormLabel className="text-gray-900 font-medium">Upload PDF (Optional)</FormLabel>
                  <div className="relative w-full">
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="border-gray-300 text-gray-500 focus:border-blue-600 focus:ring-blue-600 pr-10 pl-3 h-10"
                    />

                    {selectedFile && (
                      <button
                        type="button"
                        onClick={removeFile}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 mx-1 text-gray-600 hover:text-red-600"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                  {selectedFile && (
                    <p className="text-sm text-green-600">
                      {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                    </p>
                  )}
                </div>
              </div>
            </div>
            <FormField
              control={form.control}
              name="github_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 font-medium flex items-center gap-2">
                    <Github size={18} className="text-blue-600" />
                    GitHub Repository URL
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="https://github.com/username/repository"
                        className="pl-3 border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                        {...field}
                      />
                      {isFetching && (
                        <div className="absolute right-3 top-3">
                          <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500">
                    Share your GitHub repository to help others learn from your code
                  </FormDescription>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            {/* Tags Section */}
            <div className="space-y-2">
              <FormLabel className="text-gray-900 font-medium flex items-center gap-2">
                <Tag size={18} className="text-blue-600" />
                Tags
              </FormLabel>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-gray-50 text-gray-600 hover:bg-gray-100 flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X size={12} />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag (press Enter)"
                  className="border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addTag()
                    }
                  }}
                />
                <Button type="button" onClick={addTag} variant="outline">
                  <Plus strokeWidth={3} />
                </Button>
              </div>
              <FormDescription className="text-xs text-gray-500">
                Add relevant tags to help others find your project (e.g., React, Machine Learning)
              </FormDescription>
            </div>

            {/* Learning Outcome Section */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="learning_outcome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900 font-medium">What did you learn?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Share the key learnings from this project..."
                        className="min-h-[100px] border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-gray-500">
                      Describe the most valuable lessons or insights gained from this project
                    </FormDescription>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="flex flex-col-reverse sm:flex-row justify-center sm:justify-end items-center gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-gray-400 text-gray-500 w-full sm:w-28"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full sm:w-auto flex items-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send size={16} />}
                Share Project
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
