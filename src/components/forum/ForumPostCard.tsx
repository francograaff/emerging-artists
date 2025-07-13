import Link from 'next/link';
import { ForumPost } from '@/types/forum';

interface ForumPostCardProps {
  post: ForumPost;
}

export default function ForumPostCard({ post }: ForumPostCardProps) {
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} day${days === 1 ? '' : 's'} ago`;
    }
  };

  return (
    <article className="bg-white border border-gray-200 p-6 mb-6">
      <header className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white max-w-prose">
            {post.title}
          </h3>
          <time 
            dateTime={post.timestamp.toISOString()}
            className="text-sm text-gray-500 dark:text-gray-400 flex-shrink-0 ml-4"
            title={post.timestamp.toLocaleString()}
          >
            {formatTimestamp(post.timestamp)}
          </time>
        </div>
        <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
          by {post.name}
        </p>
      </header>
      
      <div className="prose prose-sm max-w-prose">
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
          {post.body.length > 200 ? `${post.body.substring(0, 200)}...` : post.body}
        </p>
        {post.body.length > 200 && (
          <div className="mt-4">
            <Link
              href={`/forum/${post.id}`}
              className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors"
            >
              Read More
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </article>
  );
} 