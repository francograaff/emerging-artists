export interface Artist {
  id: number;
  name: string;
  birthYear: number;
  image: string;
  location: string;
  medium: string;
}

export interface ArtistFilterState {
  searchQuery: string;
} 