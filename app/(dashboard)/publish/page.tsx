// app/(dashboard)/publish/page.tsx
import PublishBlog from "@/app/component/PublishBlog";

// Props definition
interface PageProps {
  author: string;
}

export default function PublishPage({ author }: PageProps) {
  return <PublishBlog author={author} />;
}
