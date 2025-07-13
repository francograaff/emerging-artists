"use client";
import { useState, useEffect, useRef } from 'react';

interface ReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; body: string }) => void;
  postTitle: string;
}

export default function ReplyModal({ isOpen, onClose, onSubmit, postTitle }: ReplyModalProps) {
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Focus the name input when modal opens
      nameInputRef.current?.focus();
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!name.trim() || !body.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit({ name: name.trim(), body: body.trim() });
      setName('');
      setBody('');
    } catch (error) {
      console.error('Error submitting reply:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          ref={modalRef}
          className="relative w-full max-w-2xl bg-white dark:bg-gray-900 shadow-xl"
          role="document"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 id="modal-title" className="text-xl font-semibold text-gray-900 dark:text-white">
                Reply to Post
              </h2>
              <p id="modal-description" className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Replying to: "{postTitle}"
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="reply-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Name *
                </label>
                <input
                  ref={nameInputRef}
                  type="text"
                  id="reply-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your name"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Reply Body Field */}
              <div>
                <label htmlFor="reply-body" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Reply *
                </label>
                <textarea
                  id="reply-body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-vertical"
                  placeholder="Write your reply here..."
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                disabled={isSubmitting || !name.trim() || !body.trim()}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Reply'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 