"use client";
import { useState, useEffect } from 'react';
import CartModal from './CartModal';

interface CartButtonProps {
  itemCount?: number;
}

export default function CartButton({ itemCount = 0 }: CartButtonProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
        aria-label={`Open shopping cart with ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs h-5 w-5 flex items-center justify-center font-semibold">
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </button>
      
      {isMounted && (
        <CartModal 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
        />
      )}
    </>
  );
} 