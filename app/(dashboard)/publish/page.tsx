import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/libs/auth'
import PublishBlog from '@/app/component/PublishBlog'


  const session = await getServerSession(authOptions)

  const author =session.user.name

  // Pass the author's name to the page


export default function PublishPage({ author }: { author: string }) {
  return <PublishBlog author={author} />
}
