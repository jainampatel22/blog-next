// components/PublishBlog.tsx
'use client'

import { useState } from 'react'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
interface PublishBlogProps {
  author: string; // Added author prop to handle server-side author name
}

export default function PublishBlog({ author }: PublishBlogProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null);
const router = useRouter()
const {id}=useParams()
  const postBlog = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !content) {
      setError('Please fill in all fields.')
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch('/api/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, author }), // Use author passed from the server side
      })

      if (!response.ok) {
        throw new Error('Failed to publish post')
      }

      const data = await response.json()
      console.log('Post published:', data)
  
      setTitle('')
      setContent('')
      setSuccess('Your Blog Has Been Added Successfully ! ')
     
   router.push(`/blogs/${data.id}`)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Write Your Story</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={postBlog} className="space-y-6">
            <div>
              <Label htmlFor="title" className="text-lg font-medium">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1"
                placeholder="Enter your story title"
              />
            </div>
            <div>
              <Label htmlFor="content" className="text-lg font-medium">
                Content
              </Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={15}
                className="mt-1"
                placeholder="Write your story here..."
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded"
              disabled={isLoading || !title || !content}
            >
              {isLoading ? 'Publishing...' : 'Publish Your Story'}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
