
import PublishBlog from '@/app/component/PublishBlog'






  // Pass the author's name to the page


export default function PublishPage({ author }: { author: string }) {
  return <PublishBlog author={author} />
}
