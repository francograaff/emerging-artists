import Image from 'next/image';
import Link from 'next/link';
import { Artist } from '@/types/artist';

interface ArtistGridProps {
  artists?: Artist[];
}

export default function ArtistGrid({ artists = [] }: ArtistGridProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {artists.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No artists found matching your search.
          </p>
        </div>
      ) : (
        artists.map((artist) => (
          <Link
            key={artist.id}
            href={`/artists/${artist.id}`}
            className="group bg-transparent transition-all duration-300 overflow-hidden cursor-pointer border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label={`View profile of ${artist.name}, ${currentYear - artist.birthYear} years old, based in ${artist.location}`}
          >
            <div className="relative w-full aspect-[4/3] bg-gray-100 dark:bg-gray-800">
              <Image
                src={artist.image}
                alt={`Portrait of ${artist.name}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>

            {/* Artist Info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {artist.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                b. {artist.birthYear} • {currentYear - artist.birthYear} years old
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 truncate">
                {artist.location}
              </p>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-1">
                {artist.medium}
              </p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
} 