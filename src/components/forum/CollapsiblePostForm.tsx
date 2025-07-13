"use client";
import { useState, useRef, useEffect } from 'react';

interface CollapsiblePostFormProps {
  onSubmit: (post: { name: string; title: string; body: string }) => void;
}

export default function CollapsiblePostForm({ onSubmit }: CollapsiblePostFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Close form when Escape key is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  // Focus first input when form opens
  useEffect(() => {
    if (isOpen && formRef.current) {
      const firstInput = formRef.current.querySelector('input') as HTMLInputElement;
      if (firstInput) {
        firstInput.focus();
      }
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !body.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      onSubmit({
        name: name.trim() || 'Anonymous',
        title: title.trim(),
        body: body.trim()
      });
      
      // Reset form and close
      setName('');
      setTitle('');
      setBody('');
      setIsSubmitting(false);
      setIsOpen(false);
    }, 500);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const isFormValid = title.trim() && body.trim();

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls="post-form"
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
      >
        <svg 
          className={`w-4 h-4 mr-2 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        New Post
      </button>

      {/* Collapsible Form */}
      <div 
        id="post-form"
        className={`mt-4 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <form 
          ref={formRef}
          onSubmit={handleSubmit} 
          className="bg-white border border-gray-200 p-6 shadow-lg"
        >
          <div className="space-y-4 max-w-prose">
            {/* Name Field */}
            <div>
              <label htmlFor="post-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name (Optional)
              </label>
              <input
                id="post-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name or leave blank for anonymous"
                className="w-full px-3 py-2 border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                aria-describedby="name-help"
              />
              <p id="name-help" className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Leave blank to post anonymously
              </p>
            </div>

            {/* Title Field */}
            <div>
              <label htmlFor="post-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="post-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your post title"
                required
                className="w-full px-3 py-2 border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                aria-describedby="title-error"
                aria-invalid={!title.trim() && title !== ''}
              />
              {!title.trim() && title !== '' && (
                <p id="title-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
                  Title is required
                </p>
              )}
            </div>

            {/* Body Field */}
            <div>
              <label htmlFor="post-body" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Post Content <span className="text-red-500">*</span>
              </label>
              <textarea
                id="post-body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Share your thoughts, questions, or experiences..."
                required
                rows={6}
                className="w-full px-3 py-2 border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-vertical"
                aria-describedby="body-error"
                aria-invalid={!body.trim() && body !== ''}
              />
              {!body.trim() && body !== '' && (
                <p id="body-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
                  Post content is required
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="px-6 py-2 bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                aria-describedby="submit-help"
              >
                {isSubmitting ? 'Posting...' : 'Post'}
              </button>
            </div>
            
            <p id="submit-help" className="text-sm text-gray-500 dark:text-gray-400">
              * Required fields
            </p>
          </div>
        </form>
      </div>
    </div>
  );
} 