import { PrismaClient } from "@prisma/client";
import { BlogDetailCard } from "@/app/component/BlogDetailCard";
const prisma = new PrismaClient();

interface BlogDetailCardProps {
  blog: {
    id: string;
    title: string;
    content: string;
    coverImage?: string;
    date?: string;
    recommendedBy?: number;
    authorId: string;
    publishedAt: boolean;
    author: {
      name: string;
    };
  };
}

export  async function gblog({ params }: { params: { id: string } }): Promise<BlogDetailCardProps["blog"]> {
  const { id } = params;

  // Fetch blog details from the database
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

  // Map Prisma result to BlogDetailCardProps format
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

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
    try {
      const blog = await gblog({ params });
  
      return <BlogDetailCard blog={blog} />;
    } catch (error) {
      return <div>Error: {(error as Error).message}</div>;
    }
  }