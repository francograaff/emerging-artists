"use client";
import { useState } from 'react';
import Image from 'next/image';

interface ArtworkDetailProps {
  artworkId: string;
}

// Mock data for demonstration
const MOCK_ARTWORK = {
  id: '1',
  title: 'Sunset Over Water',
  artist: 'Ava Chen',
  price: 350,
  description: 'A stunning oil painting capturing the serene beauty of a sunset reflecting over calm waters. The artist uses warm, vibrant colors to convey the peaceful transition from day to night, with intricate brushwork that brings the scene to life.',
  medium: 'Oil on Canvas',
  dimensions: '24" x 36"',
  year: 2023,
  image: '/images/hero-art.jpg',
  artistBio: 'Ava Chen is an emerging artist based in San Francisco, known for her vibrant landscapes and use of color. She graduated from the San Francisco Art Institute and has been featured in several local galleries. Her work explores themes of nature, tranquility, and the human connection to the environment.',
  tags: ['Landscape', 'Sunset', 'Oil Painting', 'Nature'],
  inStock: true,
};

export default function ArtworkDetail({ artworkId }: ArtworkDetailProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsAddingToCart(false);
    // Here you would typically update cart state or show success message
    alert('Added to cart!');
  };

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <a href="/artwork" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                Artwork
              </a>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-900 dark:text-white">{MOCK_ARTWORK.title}</li>
          </ol>
        </nav>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 my-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white dark:bg-gray-900 overflow-hidden">
              <Image
                src={MOCK_ARTWORK.image}
                alt={`${MOCK_ARTWORK.title} by ${MOCK_ARTWORK.artist} - ${MOCK_ARTWORK.description}`}
                fill
                className={`object-cover cursor-pointer transition-transform duration-300 ${
                  isZoomed ? 'scale-110' : 'scale-100'
                }`}
                onClick={handleImageClick}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {isZoomed && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <button
                    onClick={handleImageClick}
                    className="bg-white text-gray-900 px-4 py-2 font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Close zoom view"
                  >
                    Close Zoom
                  </button>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Click image to zoom • {MOCK_ARTWORK.dimensions} • {MOCK_ARTWORK.medium}
            </p>
          </div>

          {/* Details Section */}
          <div className="space-y-8">
            {/* Title and Artist */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {MOCK_ARTWORK.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                by {MOCK_ARTWORK.artist}
              </p>
            </div>

            {/* Price and Add to Cart */}
            <div className="space-y-4">
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                ${MOCK_ARTWORK.price}
              </p>
              <div className="flex items-center space-x-4">
                <label htmlFor="quantity" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Quantity:
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border border-gray-200 px-3 py-1 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart || !MOCK_ARTWORK.inStock}
                className="w-full bg-indigo-600 text-white py-3 px-6 font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label={`Add ${quantity} ${quantity === 1 ? 'piece' : 'pieces'} of ${MOCK_ARTWORK.title} to cart`}
              >
                {isAddingToCart ? 'Adding...' : MOCK_ARTWORK.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                About this artwork
              </h2>
              <div className="prose prose-lg max-w-prose mx-auto">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {MOCK_ARTWORK.description}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {MOCK_ARTWORK.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 my-8"></div>
        </div>

        {/* Artist Bio Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            About the Artist
          </h2>
          <div className="bg-white dark:bg-gray-900 p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {MOCK_ARTWORK.artist}
            </h3>
            <div className="prose prose-lg max-w-prose">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {MOCK_ARTWORK.artistBio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 