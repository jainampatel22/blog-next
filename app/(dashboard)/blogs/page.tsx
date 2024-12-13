import { PrismaClient } from "@prisma/client";
import { BlogCard } from "@/app/component/BlogCard";
import { JSX } from "react";

interface BlogType {
  id: string;
  title: string;
  content: string;
  coverImage?: string;
  date?: string;
  recommendedBy?: number;
  authorId: string;
  publishedAt: boolean;
}

const prisma = new PrismaClient();

async function gblogs(): Promise<BlogType[]> {
  const posts = await prisma.post.findMany({
    // Adjust fields based on your `post` model
  });

  return posts.map((post) => ({
    id: post.id,
    title: post.title,
    content: post.content,
    authorId: post.authorId, // Adjust fields based on your `post` model
    publishedAt: post.published, // Optional: include other fields as necessary
  }));
}

// Define the return type as JSX.Element
export default async function blogs(): Promise<JSX.Element> {
  const bloges = await gblogs();
  return <BlogCard blogs={bloges} />;
}
