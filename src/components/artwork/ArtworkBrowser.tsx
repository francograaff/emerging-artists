"use client";
import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import ArtworkSearchBar from '@/components/artwork/ArtworkSearchBar';
import ArtworkGrid from '@/components/artwork/ArtworkGrid';
import { FilterState, FilterChangeHandler } from '@/types/artwork';
import { artworks } from '@/data/artworks';
import { getFilteredAndSortedArtworks } from '@/utils/artworkFilters';

const ArtworkFilterSidebar = dynamic(() => import('@/components/artwork/ArtworkFilterSidebar'), { ssr: false });

export default function ArtworkBrowser() {
  const [filters, setFilters] = useState<FilterState>({
    selectedMediums: [],
    priceMin: null,
    priceMax: null,
    location: '',
    sortBy: 'popularity',
    searchQuery: '',
  });

  // Memoize filtered and sorted artworks
  const filteredArtworks = useMemo(() => {
    return getFilteredAndSortedArtworks(artworks, filters);
  }, [filters]);

  const handleFilterChange: FilterChangeHandler = {
    onMediumChange: (mediums) => {
      setFilters(prev => ({ ...prev, selectedMediums: mediums }));
    },
    onPriceRangeChange: (min, max) => {
      setFilters(prev => ({ ...prev, priceMin: min, priceMax: max }));
    },
    onLocationChange: (location) => {
      setFilters(prev => ({ ...prev, location }));
    },
    onSortChange: (sortBy) => {
      setFilters(prev => ({ ...prev, sortBy }));
    },
    onSearchChange: (searchQuery) => {
      setFilters(prev => ({ ...prev, searchQuery }));
    },
  };

  return (
    <div className="flex flex-col gap-6 py-8 min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Search Bar */}
      <ArtworkSearchBar 
        onSearchChange={handleFilterChange.onSearchChange}
        searchQuery={filters.searchQuery}
      />
      
      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 my-8"></div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Sidebar */}
        <div className="sm:w-72 w-full">
          <ArtworkFilterSidebar 
            onFilterChange={handleFilterChange}
            selectedMediums={filters.selectedMediums}
            priceMin={filters.priceMin}
            priceMax={filters.priceMax}
            location={filters.location}
            sortBy={filters.sortBy}
          />
        </div>
        
        {/* Vertical Divider */}
        <div className="hidden sm:block border-l border-gray-200 mx-6"></div>
        
        {/* Artwork Grid */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Browse Artwork</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {filteredArtworks.length} of {artworks.length} artworks
            </p>
          </div>
          <ArtworkGrid artworks={filteredArtworks} />
        </main>
      </div>
    </div>
  );
} 