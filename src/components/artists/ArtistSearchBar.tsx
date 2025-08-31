"use client";
import { useState, useRef, useEffect } from 'react';
import { Artist } from '@/types/artist';
import { getArtistSuggestions } from '@/utils/artistFilters';

interface ArtistSearchBarProps {
  artists: Artist[];
  onSearch: (query: string) => void;
}

export default function ArtistSearchBar({ artists, onSearch }: ArtistSearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (value: string) => {
    setQuery(value);
    setSelectedIndex(-1);

    if (value.trim()) {
      const filtered = getArtistSuggestions(artists, value);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSuggestionClick(suggestions[selectedIndex]);
      } else {
        handleSearch();
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    onSearch(suggestion);
  };

  const handleSearch = () => {
    if (query.trim()) {
      setShowSuggestions(false);
      onSearch(query);
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-xl mx-auto mb-6">
      <label htmlFor="artist-search" className="block text-sm font-medium text-gray-900 mb-1" style={{ color: '#111827' }}>
        Search for artists by name
      </label>
      <input
        id="artist-search"
        type="text"
        value={query}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => query.trim() && suggestions.length > 0 && setShowSuggestions(true)}
        placeholder="e.g. Ava Chen, Liam Patel"
                  className="w-full px-4 py-2 border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        aria-label="Search artists"
        aria-autocomplete="list"
        aria-controls="artist-search-listbox"
        aria-activedescendant={selectedIndex >= 0 ? `artist-suggestion-${selectedIndex}` : undefined}
        autoComplete="off"
      />

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <ul
          id="artist-search-listbox"
          role="listbox"
          className="absolute z-10 w-full bg-white border border-gray-200 mt-1 max-h-60 overflow-auto"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              id={`artist-suggestion-${index}`}
              role="option"
              aria-selected={selectedIndex === index}
              className={`px-4 py-2 cursor-pointer flex items-center gap-2 ${
                selectedIndex === index ? 'bg-indigo-100 text-indigo-900' : 'text-gray-900'
              }`}
              onMouseDown={() => handleSuggestionClick(suggestion)}
              style={{ backgroundColor: selectedIndex === index ? '#EEF2FF' : 'white', color: selectedIndex === index ? '#312E81' : '#111827' }}
            >
              <span className="text-xs font-semibold uppercase text-indigo-500" style={{ color: '#6366F1' }}>artist</span>
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 