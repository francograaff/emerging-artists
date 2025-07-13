"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface CartItem {
  id: string;
  title: string;
  artist: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock cart data
const MOCK_CART_ITEMS: CartItem[] = [
  {
    id: '1',
    title: 'Sunset Over Water',
    artist: 'Ava Chen',
    price: 350,
    quantity: 1,
    image: '/art1.jpg',
  },
  {
    id: '2',
    title: 'Dreamscape',
    artist: 'Liam Patel',
    price: 420,
    quantity: 2,
    image: '/art2.jpg',
  },
];

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(MOCK_CART_ITEMS);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Handle escape key to close drawer
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Focus trap: focus the close button when drawer opens
      closeButtonRef.current?.focus();
      // Prevent body scroll when drawer is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setIsUpdating(itemId);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
    setIsUpdating(null);
  };

  const removeItem = async (itemId: string) => {
    setIsUpdating(itemId);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    setIsUpdating(null);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          aria-hidden="true"
        />
      )}
      
      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-gray-900 transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        aria-describedby="cart-description"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 id="cart-title" className="text-xl font-bold text-gray-900 dark:text-white">
              Shopping Cart
            </h2>
            <p id="cart-description" className="text-sm text-gray-600 dark:text-gray-400">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </p>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label="Close cart"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 border border-gray-200"
                  aria-label={`${item.title} by ${item.artist}, quantity ${item.quantity}, price $${item.price}`}
                >
                  {/* Item Image */}
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={`${item.title} by ${item.artist}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      by {item.artist}
                    </p>
                    <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                      ${item.price}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center border border-gray-200">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={isUpdating === item.id || item.quantity <= 1}
                        className="px-2 py-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                        aria-label={`Decrease quantity of ${item.title}`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="px-3 py-1 text-sm font-medium text-gray-900 dark:text-white min-w-[2rem] text-center">
                        {isUpdating === item.id ? '...' : item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={isUpdating === item.id}
                        className="px-2 py-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                        aria-label={`Increase quantity of ${item.title}`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      disabled={isUpdating === item.id}
                      className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 disabled:opacity-50 focus:outline-none focus:ring-1 focus:ring-red-400"
                      aria-label={`Remove ${item.title} from cart`}
                    >
                      {isUpdating === item.id ? 'Removing...' : 'Remove'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">Subtotal:</span>
              <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => {
                alert('Proceeding to checkout...');
                onClose();
              }}
                              className="w-full bg-indigo-600 text-white py-3 px-6 font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
              aria-label="Proceed to checkout"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
} 