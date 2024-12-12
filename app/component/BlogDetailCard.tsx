
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


import { Clock } from 'lucide-react'


import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

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

  
  export const BlogDetailCard = ({ blog }: BlogDetailCardProps) => {
    if (!blog) {
      return <div>No blog found</div>;
    }
  
    return (
        <div className="container mx-auto px-4 py-8 animate-in fade-in duration-700">
        {/* <Button variant="ghost" className="mb-4 group" onClick={() => window.history.back()}>
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to all posts
        </Button> */}

        <article className="max-w-4xl mx-auto">
          <div className="">
        
          </div>
          <h1 className="text-4xl font-bold mb-4 animate-in slide-in-from-bottom duration-700 delay-200">
            {blog.title}
          </h1>
          <div className="flex items-center space-x-4 mb-6 text-muted-foreground animate-in slide-in-from-bottom duration-700 delay-300">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                {/* <AvatarImage src={blog.author.avatar} alt={blog.author.name} /> */}
                <AvatarFallback>{blog.author.name[0]}</AvatarFallback>
              </Avatar> 
              <span>{blog.author.name}</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
           
           
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              <span>{Math.ceil(blog.content.length / 100)} min read</span>
            </div>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none animate-in slide-in-from-bottom duration-700 delay-400">
            <p>{blog.content}</p>
            {/* Add more content here */}
          </div>
          <div className="mt-8 animate-in slide-in-from-bottom duration-700 delay-500">
          
          </div>
        </article>
        <Card className="mt-12 max-w-4xl mx-auto animate-in slide-in-from-bottom duration-700 delay-600">
          <CardContent className="flex items-center space-x-4 p-6">
            <Avatar className="h-12 w-12">
              <AvatarImage  alt={blog.author.name} />
              <AvatarFallback>{blog.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{blog.author.name}</p>
              <p className="text-sm text-muted-foreground">
                Author bio goes here. This is a brief description of the author's background and expertise.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  