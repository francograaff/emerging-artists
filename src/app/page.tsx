import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
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
        {/* Semi-transparent overlay to improve text readability - reduced opacity */}
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
          className="inline-block bg-indigo-600 text-white px-8 py-3 text-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition border-none"
          style={{ backgroundColor: '#4f46e5', color: 'white' }}
        >
          Browse Artwork
        </Link>
      </header>

      {/* Mission Statement - with higher z-index and completely transparent background */}
      <section className="relative z-20 py-12 mt-8 mx-4 sm:mx-auto sm:max-w-3xl rounded-lg mb-12" 
               style={{ zIndex: 20, backgroundColor: 'transparent' }}>
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#ffffff' }}>Embrace your future as an art lover and collector - 
            discover the artists of tomorrow and today
          </h2>
          <div className="prose prose-lg max-w-prose mx-auto">
            <p className="text-lg" style={{ color: '#f3f4f6' }}>
              Explore unique and original artworks from the next generation of talent, showcasing exclusive creations by emerging artists who are either fresh out of or currently enrolled in a Master of Fine Arts program.           </p>
          </div>
        </div>
      </section>
    </div>
  );
}
