import Link from "next/link";
import Image from "next/image";
import { artworks } from "@/data/artworks";

export default function Home() {
  // Get 3 newest artworks (you could filter by year if you have that data)
  const newestArtworks = artworks.slice(0, 3);
  
  // Sample featured artists (in a real app, you'd have an artists.ts file)
  const featuredArtists = [
    { id: 1, name: "Ava Chen", university: "Rhode Island School of Design", imageUrl: "/images/default-3.jpg" },
    { id: 2, name: "Liam Patel", university: "Yale School of Art", imageUrl: "/images/default-4.jpg" },
    { id: 3, name: "Sofia Garcia", university: "School of the Art Institute of Chicago", imageUrl: "/images/default-5.jpg" }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section with Background */}
      <div className="min-h-screen flex flex-col relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0" style={{ zIndex: 0 }}>
          <Image
            src="/images/rothko-number-14.jpg"
            alt="Custom artistic background"
            fill
            quality={100}
            priority
            className="object-cover"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          {/* Semi-transparent overlay to improve text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-20 z-10" style={{ backgroundColor: 'rgba(0,0,0,0.2)', zIndex: 10 }} />
        </div>
        
        {/* Hero Section - with higher z-index to appear above the background */}
        <header className="flex-1 flex flex-col items-center justify-center text-center py-20 sm:py-32 pt-24 sm:pt-36 relative z-20" style={{ zIndex: 20 }}>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-6 [&_*]:text-inherit" style={{ color: 'white' }}>
            Discover Tomorrow's <span className="text-indigo-300" style={{ color: '#a5b4fc' }}>Artists</span> Today
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-2xl text-white mb-8 [&_*]:text-inherit" style={{ color: 'white' }}>
            Explore and support early-career artists. Find unique, original artwork and help shape the future of art.
          </p>
          <Link
            href="/artwork"
            className="inline-block bg-indigo-600 text-white px-32 py-3 text-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition border-none"
            style={{ backgroundColor: '#4f46e5', color: 'white' }}
          >
            Browse Artwork
          </Link>
        </header>
      </div>

      {/* Featured University Artists Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Begin collecting artists from top universities
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newestArtworks.map(artwork => (
              <div key={artwork.id} className="flex flex-col">
                <Link href={`/artwork/${artwork.id}`} className="block relative h-64 rounded-lg overflow-hidden">
                  <Image 
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </Link>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">{artwork.title}</h3>
                  <p className="text-sm text-gray-500">{artwork.artist}</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">${artwork.price}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Link
              href="/artwork"
              className="inline-block bg-indigo-100 text-indigo-700 px-6 py-2 rounded-md font-medium hover:bg-indigo-200 transition"
            >
              View all artwork
            </Link>
          </div>
        </div>
      </section>

      {/* Artist Call to Action */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-gray-900">Are you an aspiring artist?</h2>
            </div>
            <div className="md:w-1/3 mb-6 md:mb-0">
              <p className="text-gray-600">
                Are you a fine arts student or a recent graduate? Join our community now to showcase your work to collectors worldwide.
              </p>
            </div>
            <div className="md:w-1/3 text-center md:text-right">
              <Link
                href="/artists/join"
                className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
              >
                Join us now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Artists to Watch */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Artists to watch</h2>
            <Link 
              href="/artists"
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              View all
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArtists.map(artist => (
              <div key={artist.id} className="flex flex-col items-center text-center">
                <Link href={`/artists/${artist.id}`} className="block relative h-48 w-48 rounded-full overflow-hidden mb-4">
                  <Image 
                    src={artist.imageUrl}
                    alt={artist.name}
                    fill
                    className="object-cover"
                  />
                </Link>
                <h3 className="text-lg font-medium text-gray-900">{artist.name}</h3>
                <p className="text-sm text-gray-500">{artist.university}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Artist Call to Action */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-gray-900">Start collecting!</h2>
            </div>
            <div className="md:w-1/3 mb-6 md:mb-0">
              <p className="text-gray-600">
                Subscribe to our newsletter to gain information on the newest works. 
              </p>
            </div>
            <div className="md:w-1/3 text-center md:text-right">
              <Link
                href="/newsletters"
                className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
              >
                Subscribe now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
