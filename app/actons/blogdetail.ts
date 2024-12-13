// lib/blog.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function gblog({ params }: { params: { id: string } }) {
  const { id } = params;

  const blog = await prisma.post.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      authorId: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!blog) {
    throw new Error("Blog not found");
  }

  return {
    id: blog.id,
    title: blog.title,
    content: blog.content,
    authorId: blog.authorId,
    publishedAt: blog.published,
    author: {
      name: blog.author?.name || "Unknown",
    },
  };
}
