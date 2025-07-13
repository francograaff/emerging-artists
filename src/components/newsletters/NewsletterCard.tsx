import Link from 'next/link';
import { Newsletter } from '@/types/newsletter';

interface NewsletterCardProps {
  newsletter: Newsletter;
}

export default function NewsletterCard({ newsletter }: NewsletterCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className="bg-white border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col h-full">
        <header className="mb-4">
          <time 
            dateTime={newsletter.date}
            className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2 block"
          >
            {formatDate(newsletter.date)}
          </time>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
            {newsletter.title}
          </h2>
        </header>
        
        <div className="flex-1">
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {newsletter.summary}
          </p>
        </div>
        
        <footer className="mt-auto">
          <Link
            href={newsletter.href}
            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors duration-200 group"
            aria-label={`Read full newsletter: ${newsletter.title}`}
          >
            Read Full Newsletter
            <svg 
              className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </Link>
        </footer>
      </div>
    </article>
  );
} 