import { Artwork, FilterState } from '@/types/artwork';

export function filterArtworks(artworks: Artwork[], filters: FilterState): Artwork[] {
  return artworks.filter(artwork => {
    // Medium filter
    if (filters.selectedMediums.length > 0 && !filters.selectedMediums.includes(artwork.medium)) {
      return false;
    }

    // Price range filter
    if (filters.priceMin !== null && artwork.price < filters.priceMin) {
      return false;
    }
    if (filters.priceMax !== null && artwork.price > filters.priceMax) {
      return false;
    }

    // Location filter
    if (filters.location && artwork.location !== filters.location) {
      return false;
    }

    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesTitle = artwork.title.toLowerCase().includes(query);
      const matchesArtist = artwork.artist.toLowerCase().includes(query);
      const matchesTags = artwork.tags.some(tag => tag.toLowerCase().includes(query));
      const matchesDescription = artwork.description.toLowerCase().includes(query);
      
      if (!matchesTitle && !matchesArtist && !matchesTags && !matchesDescription) {
        return false;
      }
    }

    return true;
  });
}

export function sortArtworks(artworks: Artwork[], sortBy: FilterState['sortBy']): Artwork[] {
  const sorted = [...artworks];
  
  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => b.year - a.year);
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'popularity':
    default:
      // For popularity, we'll use a simple algorithm based on year and price
      // In a real app, this would be based on actual popularity metrics
      return sorted.sort((a, b) => {
        const aScore = (b.year - 2020) * 10 + b.price / 100;
        const bScore = (a.year - 2020) * 10 + a.price / 100;
        return bScore - aScore;
      });
  }
}

export function getFilteredAndSortedArtworks(artworks: Artwork[], filters: FilterState): Artwork[] {
  const filtered = filterArtworks(artworks, filters);
  return sortArtworks(filtered, filters.sortBy);
} 