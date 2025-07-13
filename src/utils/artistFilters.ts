import { Artist } from '@/types/artist';

export function filterArtists(artists: Artist[], searchQuery: string): Artist[] {
  if (!searchQuery.trim()) {
    return artists;
  }

  const query = searchQuery.toLowerCase().trim();
  
  return artists.filter(artist => 
    artist.name.toLowerCase().includes(query) ||
    artist.location.toLowerCase().includes(query) ||
    artist.medium.toLowerCase().includes(query)
  );
}

export function getArtistSuggestions(artists: Artist[], searchQuery: string): string[] {
  if (!searchQuery.trim()) {
    return [];
  }

  const query = searchQuery.toLowerCase().trim();
  
  return artists
    .filter(artist => 
      artist.name.toLowerCase().includes(query) ||
      artist.location.toLowerCase().includes(query) ||
      artist.medium.toLowerCase().includes(query)
    )
    .map(artist => artist.name)
    .slice(0, 8); // Limit to 8 suggestions
} 