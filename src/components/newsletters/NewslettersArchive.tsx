import NewsletterCard from './NewsletterCard';
import { newsletters } from '@/data/newsletters';

export default function NewslettersArchive() {
  return (
    <div className="py-8 min-h-screen bg-white" style={{ backgroundColor: 'white' }}>
      <div className="max-w-6xl mx-auto"> 
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4" style={{ color: '#111827' }}>
            Newsletter Archive 
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ color: '#4B5563' }}>
            Stay updated with the latest news, artist spotlights, and exclusive content from our community.
          </p>
        </div>
        
        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 my-8"></div>
        </div>
        
        {/* Newsletter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {newsletters.map((newsletter) => (
            <NewsletterCard key={newsletter.id} newsletter={newsletter} />
          ))}
        </div>
        
        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 my-8"></div>
        </div>
        
        {/* Footeer */}
        <footer className="text-center mt-12 pt-8"> 
          <p className="text-gray-500" style={{ color: '#6B7280' }}>
            Subscribe to receive our weekly newsletter directly in your inbox.
          </p>
          <button className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200" style={{ backgroundColor: '#4F46E5', color: 'white' }}>
            Subscribe to Newsletter
          </button>
        </footer>
      </div>
    </div>
  );
} 