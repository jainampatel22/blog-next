"use client"
import { Card ,CardContent ,CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BrandSlogan } from './BrandSlogan';

interface BlogTypes {
    id: string;
    title: string;
    content: string;
    coverImage?: string;
    date?: string;
    recommendedBy?: number;
      
    publishedAt: boolean;
}

export const BlogCard = ({ blogs }: { blogs: BlogTypes[] }) => {
  

    if (!blogs || blogs.length === 0) {
        return <div>No blogs found</div>;
    }

    return (
  
        <div>
           
          <BrandSlogan />
          <div className="container mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Latest Articles</h1>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                
                <Card key={blog.id}    className="flex flex-col">
                  <CardContent className="flex-grow">
                    <a href={`/blogs/${blog.id}`}
                 
                      className="block mt-2 cursor-pointer"
                    >
                      <h2 className="text-2xl font-bold text-gray-900 hover:text-gray-600 transition-colors duration-200">
                        {blog.title}
                      </h2>
                    </a>
                    <p className="mt-2 text-gray-600">
                      {blog.content.slice(0, 100)}...
                    </p>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-3">
                
                      {/* <span>{blog.author.name}</span> */}
                    </div>
                    <div>
                <span>{blog.date}</span>
                      <span className="mx-1">·</span>
                      <span>{Math.ceil(blog.content.length / 100)} min read</span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="mt-12 text-center">
              <a href="/publish">
                <Button size="lg">Write a Story</Button>
              </a>
            </div>
          </div>
        </div>
      );
    }
    export function Avatar({ name }: { name: string }) {
        const initials = name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase();
      
        return (
          <div className="relative w-10 h-10 overflow-hidden bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-700 font-semibold">{initials}</span>
          </div>
        );
      }