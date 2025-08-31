import Image from 'next/image';
import Link from 'next/link';
import { Artwork } from '@/types/artwork';

interface ArtworkGridProps {
  artworks: Artwork[];
}

export default function ArtworkGrid({ artworks }: ArtworkGridProps) {
  if (artworks.length === 0) {
    return (
      <div className="text-center py-12" style={{ backgroundColor: 'white' }}>
        <h3 className="text-lg font-medium text-gray-900 mb-2" style={{ color: '#111827' }}>No artwork found</h3>
        <p className="text-gray-500" style={{ color: '#6B7280' }}>Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" style={{ backgroundColor: 'white' }}>
      {artworks.map((art) => (
        <Link
          key={art.id}
          href={`/artwork/${art.id}`}
          className="group bg-white transition-all duration-300 overflow-hidden cursor-pointer border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          style={{ backgroundColor: 'white' }}
          aria-label={`View details for ${art.title} by ${art.artist}`}
        >
          <div className="relative w-full aspect-[4/3] bg-gray-100" style={{ backgroundColor: '#F3F4F6' }}>
            <Image
              src={art.imageUrl}
              alt={`${art.title} by ${art.artist}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          <div className="p-4" style={{ backgroundColor: 'white' }}>
            <h2 className="text-lg font-semibold text-gray-900 mb-1 truncate" style={{ color: '#111827' }}>{art.title}</h2>
            <p className="text-sm text-gray-500 mb-2 truncate" style={{ color: '#6B7280' }}>by {art.artist}</p>
            <p className="text-base font-bold text-indigo-600" style={{ color: '#4F46E5' }}>${art.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
} 