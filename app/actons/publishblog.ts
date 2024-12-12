// pages/api/publish.ts
import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../libs/auth'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') { // Ensure this condition is correctly checking for POST
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user?.id) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { title, content } = req.body
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' })
    }

    try {
      const post = await prisma.post.create({
        data: {
          title,
          content,
          authorId: session.user.id, // Assuming you're using session.user.id
        },
      })
      res.status(200).json(post) // Return the post data on success
    } catch (error) {
      console.error('Error creating post:', error)
      res.status(500).json({ error: 'Error creating post' })
    }
  } else {
    // Ensure that only POST method is allowed on this route
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}
