
import { PrismaClient } from "@prisma/client";

import { BlogCard } from "@/app/component/BlogCard";
interface blogtype{
    id: string;
    title: string;
    content: string;
    coverImage?: string;
    date?: string;
    recommendedBy?: number;
    authorId:string,
    publishedAt:boolean
   }
const prisma = new PrismaClient()
async function gblogs():Promise<blogtype[]> {
    const posts = await prisma.post.findMany({
        
    });

    return posts.map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        authorId: post.authorId, // Adjust fields based on your `post` model
        publishedAt: post.published, // Optional: include other fields as necessary
    }));
}




export default async function blogs(){
    const bloges = await gblogs()
    return (
   <BlogCard blogs={bloges}/>
    )
}