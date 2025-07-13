"use client";
import { useState } from 'react';
import ArtistSearchBar from '@/components/artists/ArtistSearchBar';
import ArtistGrid from '@/components/artists/ArtistGrid';
import { Artist } from '@/types/artist';
import { filterArtists } from '@/utils/artistFilters';

// Sample artist data - in a real app, this would come from an API
const MOCK_ARTISTS: Artist[] = [
  {
    id: 1,
    name: 'Ava Chen',
    birthYear: 1992,
    image: '/images/default-25.jpg',
    location: 'San Francisco, CA',
    medium: 'Oil Painting',
  },
  {
    id: 2,
    name: 'Liam Patel',
    birthYear: 1988,
    image: '/images/default-23.jpg',
    location: 'New York, NY',
    medium: 'Mixed Media',
  },
  {
    id: 3,
    name: 'Sofia Garcia',
    birthYear: 1995,
    image:'/images/default-25.jpg',
    location: 'Los Angeles, CA',
    medium: 'Photography',
  },
  {
    id: 4,
    name: 'Maya Singh',
    birthYear: 1990,
    image: '/images/default-25.jpg',
    location: 'Chicago, IL',
    medium: 'Sculpture',
  },
  {
    id: 5,
    name: 'Noah Kim',
    birthYear: 1987,
    image: '/images/default-23.jpg',
    location: 'Seattle, WA',
    medium: 'Digital Art',
  },
  {
    id: 6,
    name: 'Emma Rossi',
    birthYear: 1993,
    image: '/images/default-25.jpg',
    location: 'Boston, MA',
    medium: 'Watercolor',
  },
  {
    id: 7,
    name: 'Alex Thompson',
    birthYear: 1989,
    image: '/images/default-23.jpg',
    location: 'Austin, TX',
    medium: 'Acrylic',
  },
  {
    id: 8,
    name: 'Zara Ahmed',
    birthYear: 1991,
    image: '/images/default-25.jpg',
    location: 'Portland, OR',
    medium: 'Printmaking',
  },
];

export default function ArtistBrowser() {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredArtists = filterArtists(MOCK_ARTISTS, searchQuery);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex flex-col gap-6 py-8 min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Search Bar */}
      <ArtistSearchBar artists={MOCK_ARTISTS} onSearch={handleSearch} />
      
      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 my-8"></div>
      </div>
      
      {/* Artist Grid */}
      <main className="flex-1">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Our Artists</h1>
        <div className="prose prose-lg max-w-prose mb-6">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover talented emerging artists from around the world. Each artist brings a unique perspective and style to their work, creating pieces that inspire and challenge.
          </p>
        </div>
        <ArtistGrid artists={filteredArtists} />
      </main>
    </div>
  );
} 