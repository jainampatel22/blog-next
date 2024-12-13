import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/libs/auth'  // Make sure this is the correct path to your auth options

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body
    const { title, content } = await req.json()

    // Fetch the session (this assumes you're using next-auth for authentication)
    const session = await getServerSession(authOptions)
    if (!session || !session.user?.name) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get the author's name from the session (session.user.name)
    const authorName = session.user.name
    console.log('Author Name:', authorName)

    // Find or create the user by name (if the user doesn't exist)
    const author = await prisma.user.upsert({
      where: { email:session.user.email|| undefined },  // Using name as the unique identifier
      update: {},  // No updates needed if user exists
      create: {
        name: authorName,
        email: session.user.email || '',
        password:""  // Optional: email if available in session
      },
    })

    // Create the post in the database with the author reference
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: author.id,
        published:true // Use the author's ID to create the post
      },
    })

    // Return the created post as a response
    return NextResponse.json(post, { status: 200 })
  } catch (error) {
    // Handle and log any errors
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('Error creating post:', errorMessage)

    // Return an error response
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
