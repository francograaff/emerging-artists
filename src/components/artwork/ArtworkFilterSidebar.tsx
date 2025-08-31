import { useState } from 'react';
import { FilterChangeHandler } from '@/types/artwork';
import { MEDIUMS, LOCATIONS, SORT_OPTIONS } from '@/data/artworks';

interface ArtworkFilterSidebarProps {
  onFilterChange: FilterChangeHandler;
  selectedMediums: string[];
  priceMin: number | null;
  priceMax: number | null;
  location: string;
  sortBy: string;
}

export default function ArtworkFilterSidebar({
  onFilterChange,
  selectedMediums,
  priceMin,
  priceMax,
  location,
  sortBy
}: ArtworkFilterSidebarProps) {
  const [open, setOpen] = useState(false);

  const handleMediumChange = (medium: string) => {
    const newMediums = selectedMediums.includes(medium)
      ? selectedMediums.filter((m) => m !== medium)
      : [...selectedMediums, medium];
    onFilterChange.onMediumChange(newMediums);
  };

  const handlePriceMinChange = (value: string) => {
    const numValue = value === '' ? null : Number(value);
    onFilterChange.onPriceRangeChange(numValue, priceMax);
  };

  const handlePriceMaxChange = (value: string) => {
    const numValue = value === '' ? null : Number(value);
    onFilterChange.onPriceRangeChange(priceMin, numValue);
  };

  const handleLocationChange = (value: string) => {
    onFilterChange.onLocationChange(value);
  };

  const handleSortChange = (value: string) => {
    onFilterChange.onSortChange(value as any);
  };

  return (
          <aside className="w-full sm:w-64 bg-white border-r border-gray-200 p-4 sm:p-6 mb-4 sm:mb-0">
      {/* Mobile toggle */}
      <button
        className="sm:hidden mb-4 text-indigo-600 font-semibold focus:outline-none"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="filter-sidebar"
        style={{ color: '#4F46E5' }}
      >
        {open ? 'Hide Filters' : 'Show Filters'}
      </button>
      <div id="filter-sidebar" className={`${open ? '' : 'hidden'} sm:block`}>
        {/* Medium Filter */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2 text-gray-900" style={{ color: '#111827' }}>Medium</h3>
          <ul className="space-y-1">
            {MEDIUMS.map((medium) => (
              <li key={medium}>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="form-checkbox accent-indigo-600"
                    checked={selectedMediums.includes(medium)}
                    onChange={() => handleMediumChange(medium)}
                  />
                  <span className="text-gray-900" style={{ color: '#111827' }}>{medium}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        {/* Price Range Filter */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2 text-gray-900" style={{ color: '#111827' }}>Price Range ($)</h3>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              min="0"
              placeholder="Min"
              value={priceMin || ''}
              onChange={(e) => handlePriceMinChange(e.target.value)}
              className="w-20 px-2 py-1 border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-label="Minimum price"
            />
            <span className="text-gray-900" style={{ color: '#111827' }}>-</span>
            <input
              type="number"
              min="0"
              placeholder="Max"
              value={priceMax || ''}
              onChange={(e) => handlePriceMaxChange(e.target.value)}
              className="w-20 px-2 py-1 border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-label="Maximum price"
            />
          </div>
        </div>
        {/* Artist Location Filter */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2 text-gray-900" style={{ color: '#111827' }}>Artist Location</h3>
          <select
            value={location}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="w-full px-2 py-1 border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label="Artist location"
          >
            <option value="">All Locations</option>
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
        {/* Sort By */}
        <div className="mb-2">
          <h3 className="text-lg font-bold mb-2 text-gray-900" style={{ color: '#111827' }}>Sort By</h3>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full px-2 py-1 border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label="Sort by"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </aside>
  );
} 