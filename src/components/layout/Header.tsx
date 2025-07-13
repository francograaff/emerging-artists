"use client";
import Link from 'next/link';
import CartButton from '@/components/cart/CartButton';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-xl font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
          >
            Emerging Artists
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/artwork" 
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Works
            </Link>
            <Link 
              href="/artists" 
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Artists
            </Link>
            <Link 
              href="/newsletters" 
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Opportunities
            </Link>
            <Link 
              href="/forum" 
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Forum
            </Link>
          </nav>

          {/* Cart Button */}
          <CartButton itemCount={3} />
        </div>
      </div>
    </header>
  );
} 