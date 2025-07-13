import { useState, useRef, useEffect } from 'react';

const MOCK_SUGGESTIONS = [
  { type: 'title', value: 'Sunset Over Water' },
  { type: 'title', value: 'Dreamscape' },
  { type: 'artist', value: 'Ava Chen' },
  { type: 'artist', value: 'Liam Patel' },
  { type: 'tag', value: 'Abstract' },
  { type: 'tag', value: 'Nature' },
  { type: 'title', value: 'Urban Pulse' },
  { type: 'artist', value: 'Sofia Garcia' },
  { type: 'tag', value: 'Portrait' },
];

interface ArtworkSearchBarProps {
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

export default function ArtworkSearchBar({ onSearchChange, searchQuery }: ArtworkSearchBarProps) {
  const [query, setQuery] = useState(searchQuery);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Update local query when searchQuery prop changes
  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  const filtered =
    query.length > 0
      ? MOCK_SUGGESTIONS.filter((s) =>
          s.value.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || filtered.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      const selectedValue = filtered[activeIndex].value;
      setQuery(selectedValue);
      onSearchChange(selectedValue);
      setShowSuggestions(false);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (value: string) => {
    setQuery(value);
    onSearchChange(value);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleInputChange = (value: string) => {
    setQuery(value);
    onSearchChange(value);
    setShowSuggestions(true);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto mb-6">
      <label htmlFor="artwork-search" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
        Search for artwork, artist, or tag
      </label>
      <input
        id="artwork-search"
        ref={inputRef}
        type="text"
                  className="w-full px-4 py-2 border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="e.g. Dreamscape, Ava Chen, Abstract"
        value={query}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
        onKeyDown={handleKeyDown}
        aria-autocomplete="list"
        aria-controls="artwork-search-listbox"
        aria-activedescendant={activeIndex >= 0 ? `artwork-suggestion-${activeIndex}` : undefined}
        autoComplete="off"
      />
      {showSuggestions && filtered.length > 0 && (
        <ul
          id="artwork-search-listbox"
          ref={listRef}
          role="listbox"
          className="absolute z-10 w-full bg-white border border-gray-200 mt-1 max-h-60 overflow-auto"
        >
          {filtered.map((s, i) => (
            <li
              key={s.type + s.value}
              id={`artwork-suggestion-${i}`}
              role="option"
              aria-selected={activeIndex === i}
              className={`px-4 py-2 cursor-pointer flex items-center gap-2 ${
                activeIndex === i ? 'bg-indigo-100 dark:bg-indigo-800 text-indigo-900 dark:text-white' : 'text-gray-900 dark:text-gray-200'
              }`}
              onMouseDown={() => handleSuggestionClick(s.value)}
            >
              <span className="text-xs font-semibold uppercase text-indigo-500 dark:text-indigo-300">{s.type}</span>
              <span>{s.value}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 