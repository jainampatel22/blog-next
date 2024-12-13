// app/(dashboard)/blogs/[id]/page.tsx
import { gblog } from "@/app/actons/blogdetail";
import { BlogDetailCard } from "@/app/component/BlogDetailCard";

// Change PageProps to reflect the correct type for params
type PageProps = {
  params: Promise<{ id: string }>; 
  
  // Wrap params in a Promise
}

export default async function BlogDetailPage({ params }: PageProps) {
  try {
    const resolvedParams = await params;  // Await to get the resolved params
    const blog = await gblog({ params: resolvedParams });
    return <BlogDetailCard blog={blog} />;
  } catch (error) {
    return <div>Error: {(error as Error).message}</div>;
  }
}
