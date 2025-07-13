import { Artwork } from '@/types/artwork';

export const artworks: Artwork[] = [
  {
    id: 1,
    title: 'Sunset Over Water',
    artist: 'Ava Chen',
    price: 350,
    medium: 'Oil Painting',
    location: 'San Francisco, CA',
    imageUrl: '/images/hero-art.jpg',
    year: 2023,
    tags: ['Landscape', 'Sunset', 'Nature', 'Oil Painting'],
    description: 'A stunning oil painting capturing the serene beauty of a sunset reflecting over calm waters.'
  },
  {
    id: 2,
    title: 'Dreamscape',
    artist: 'Liam Patel',
    price: 420,
    medium: 'Mixed Media',
    location: 'New York, NY',
    imageUrl: '/images/default.jpg',
    year: 2023,
    tags: ['Abstract', 'Dream', 'Mixed Media', 'Contemporary'],
    description: 'An abstract exploration of dreams and consciousness through mixed media techniques.'
  },
  {
    id: 3,
    title: 'Urban Pulse',
    artist: 'Sofia Garcia',
    price: 290,
    medium: 'Photography',
    location: 'Los Angeles, CA',
    imageUrl: '/images/default-1.jpg',
    year: 2022,
    tags: ['Urban', 'Photography', 'City', 'Street'],
    description: 'A dynamic photograph capturing the energy and rhythm of urban life.'
  },
  {
    id: 4,
    title: 'Nature Whisper',
    artist: 'Maya Singh',
    price: 510,
    medium: 'Sculpture',
    location: 'Chicago, IL',
    imageUrl: '/images/default-2.jpg',
    year: 2023,
    tags: ['Sculpture', 'Nature', 'Organic', 'Contemporary'],
    description: 'A delicate sculpture inspired by natural forms and organic movement.'
  },
  {
    id: 5,
    title: 'Abstract Flow',
    artist: 'Noah Kim',
    price: 380,
    medium: 'Digital Art',
    location: 'Seattle, WA',
    imageUrl: '/images/default-3.jpg',
    year: 2023,
    tags: ['Abstract', 'Digital', 'Flow', 'Modern'],
    description: 'A digital artwork exploring fluid dynamics and abstract composition.'
  },
  {
    id: 6,
    title: 'Portrait of Light',
    artist: 'Emma Rossi',
    price: 600,
    medium: 'Acrylic',
    location: 'Boston, MA',
    imageUrl: '/images/default-4.jpg',
    year: 2022,
    tags: ['Portrait', 'Light', 'Acrylic', 'Figurative'],
    description: 'A portrait that captures the interplay of light and shadow on the human form.'
  },
  {
    id: 7,
    title: 'Mountain Echo',
    artist: 'Alex Thompson',
    price: 450,
    medium: 'Watercolor',
    location: 'Austin, TX',
    imageUrl: '/images/default-5.jpg',
    year: 2023,
    tags: ['Landscape', 'Mountain', 'Watercolor', 'Nature'],
    description: 'A serene watercolor painting of mountain landscapes with subtle color harmonies.'
  },
  {
    id: 8,
    title: 'City Reflections',
    artist: 'Zara Ahmed',
    price: 320,
    medium: 'Printmaking',
    location: 'Portland, OR',
    imageUrl: '/images/default-6.jpg',
    year: 2022,
    tags: ['Urban', 'Printmaking', 'Reflection', 'City'],
    description: 'A printmaking piece exploring urban reflections and architectural forms.'
  },
  {
    id: 9,
    title: 'Ocean Waves',
    artist: 'Ava Chen',
    price: 480,
    medium: 'Oil Painting',
    location: 'San Francisco, CA',
    imageUrl: '/images/default-7.jpg',
    year: 2023,
    tags: ['Ocean', 'Waves', 'Oil Painting', 'Nature'],
    description: 'A powerful oil painting depicting the raw energy of ocean waves.'
  },
  {
    id: 10,
    title: 'Digital Dreams',
    artist: 'Liam Patel',
    price: 390,
    medium: 'Digital Art',
    location: 'New York, NY',
    imageUrl: '/images/default-8.jpg',
    year: 2023,
    tags: ['Digital', 'Dream', 'Abstract', 'Technology'],
    description: 'A digital artwork exploring the intersection of dreams and technology.'
  },
  {
    id: 11,
    title: 'Street Life',
    artist: 'Sofia Garcia',
    price: 280,
    medium: 'Photography',
    location: 'Los Angeles, CA',
    imageUrl: '/images/default-9.jpg',
    year: 2022,
    tags: ['Street', 'Photography', 'Urban', 'Life'],
    description: 'A candid photography series capturing authentic moments of street life.'
  },
  {
    id: 12,
    title: 'Abstract Harmony',
    artist: 'Maya Singh',
    price: 520,
    medium: 'Sculpture',
    location: 'Chicago, IL',
    imageUrl: '/images/default-10.jpg',
    year: 2023,
    tags: ['Abstract', 'Sculpture', 'Harmony', 'Contemporary'],
    description: 'A sculptural piece exploring abstract forms and harmonious composition.'
  }
];

export const MEDIUMS = ['Oil Painting', 'Sculpture', 'Photography', 'Drawing', 'Mixed Media', 'Digital Art', 'Acrylic', 'Watercolor', 'Printmaking'];
export const LOCATIONS = ['New York, NY', 'London, UK', 'Berlin, Germany', 'Tokyo, Japan', 'Online', 'San Francisco, CA', 'Los Angeles, CA', 'Chicago, IL', 'Seattle, WA', 'Boston, MA', 'Austin, TX', 'Portland, OR'];
export const SORT_OPTIONS = [
  { label: 'Popularity', value: 'popularity' as const },
  { label: 'Newest', value: 'newest' as const },
  { label: 'Price: Low to High', value: 'price-low' as const },
  { label: 'Price: High to Low', value: 'price-high' as const },
]; 