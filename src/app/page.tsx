import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Hero Section */}
      <header className="flex-1 flex flex-col items-center justify-center text-center py-20 sm:py-32">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
          Discover Tomorrow's <span className="text-indigo-600 dark:text-indigo-400">Artists</span> Today
        </h1>
        <p className="max-w-2xl mx-auto text-lg sm:text-2xl text-gray-700 dark:text-gray-200 mb-8">
          Explore and support early-career artists. Find unique, original artwork and help shape the future of art.
        </p>
        <Link
          href="/artwork"
          className="inline-block bg-indigo-600 text-white px-8 py-3 text-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 transition"
        >
          Browse Artwork
        </Link>
      </header>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 my-8"></div>
      </div>

      {/* Mission Statement */}
      <section className="bg-white py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
          <div className="prose prose-lg max-w-prose mx-auto">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              We believe in empowering emerging artists by providing a platform to showcase and sell their work. Our goal is to connect passionate creators with art lovers and collectors, making art accessible to all while supporting new talent.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
