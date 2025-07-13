export interface Artwork {
  id: number;
  title: string;
  artist: string;
  price: number;
  medium: string;
  location: string;
  imageUrl: string;
  year: number;
  tags: string[];
  description: string;
}

export interface FilterState {
  selectedMediums: string[];
  priceMin: number | null;
  priceMax: number | null;
  location: string;
  sortBy: 'popularity' | 'newest' | 'price-low' | 'price-high';
  searchQuery: string;
}

export interface FilterChangeHandler {
  onMediumChange: (mediums: string[]) => void;
  onPriceRangeChange: (min: number | null, max: number | null) => void;
  onLocationChange: (location: string) => void;
  onSortChange: (sortBy: FilterState['sortBy']) => void;
  onSearchChange: (query: string) => void;
} 