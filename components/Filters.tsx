'use client';

import { useState } from 'react';
import { PropertyType, SaleMode, PropertyUsage, Filters as FiltersType } from '@/types/property';

interface FiltersProps {
  onFilterChange: (filters: FiltersType) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FiltersType>({});
  const [showFilters, setShowFilters] = useState(true);
  const [isLocating, setIsLocating] = useState(false);

  const propertyTypes: PropertyType[] = ['Land', 'Plot', 'Flat', 'Villa', 'Office', 'Shop', 'Warehouse'];
  const saleModes: SaleMode[] = ['Fresh', 'Resale'];
  const usageTypes: PropertyUsage[] = ['Residential', 'Commercial'];

  const handleFilterChange = (key: keyof FiltersType, value: any) => {
    const newFilters = { ...filters, [key]: value || undefined };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== undefined && v !== '');

  const handleSearchNearMe = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Store user location in filters for distance-based sorting
        const newFilters = {
          ...filters,
          userLat: latitude,
          userLng: longitude
        };
        setFilters(newFilters);
        onFilterChange(newFilters);
        setIsLocating(false);
        alert(`Location found: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}\nShowing properties sorted by distance`);
      },
      (error) => {
        setIsLocating(false);
        alert('Unable to retrieve your location. Please enable location services.');
        console.error('Geolocation error:', error);
      }
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Filters</h2>
        <div className="flex gap-2">
          <button
            onClick={handleSearchNearMe}
            disabled={isLocating}
            className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md font-medium disabled:bg-gray-400 flex items-center gap-1"
          >
            {isLocating ? (
              <>
                <span className="animate-spin">⟳</span> Locating...
              </>
            ) : (
              <>📍 Near Me</>
            )}
          </button>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Clear All
            </button>
          )}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            {showFilters ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Type
            </label>
            <select
              value={filters.type || ''}
              onChange={(e) => handleFilterChange('type', e.target.value as PropertyType)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            >
              <option value="">All Types</option>
              {propertyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Sale Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sale Mode
            </label>
            <select
              value={filters.saleMode || ''}
              onChange={(e) => handleFilterChange('saleMode', e.target.value as SaleMode)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            >
              <option value="">All Modes</option>
              {saleModes.map(mode => (
                <option key={mode} value={mode}>{mode}</option>
              ))}
            </select>
          </div>

          {/* Usage Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Usage
            </label>
            <select
              value={filters.usage || ''}
              onChange={(e) => handleFilterChange('usage', e.target.value as PropertyUsage)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            >
              <option value="">All Usage</option>
              {usageTypes.map(usage => (
                <option key={usage} value={usage}>{usage}</option>
              ))}
            </select>
          </div>

          {/* Min Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Min Price (₹ Lakhs)
            </label>
            <input
              type="number"
              value={filters.minPrice ? filters.minPrice / 100000 : ''}
              onChange={(e) => handleFilterChange('minPrice', e.target.value ? parseFloat(e.target.value) * 100000 : undefined)}
              placeholder="e.g., 50"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
          </div>

          {/* Max Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Price (₹ Lakhs)
            </label>
            <input
              type="number"
              value={filters.maxPrice ? filters.maxPrice / 100000 : ''}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value ? parseFloat(e.target.value) * 100000 : undefined)}
              placeholder="e.g., 500"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
          </div>

          {/* Location Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              value={filters.location || ''}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              placeholder="City or Locality"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
          </div>
        </div>
      )}

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.type && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              Type: {filters.type}
              <button
                onClick={() => handleFilterChange('type', undefined)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          )}
          {filters.saleMode && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Mode: {filters.saleMode}
              <button
                onClick={() => handleFilterChange('saleMode', undefined)}
                className="ml-2 text-green-600 hover:text-green-800"
              >
                ×
              </button>
            </span>
          )}
          {filters.usage && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              Usage: {filters.usage}
              <button
                onClick={() => handleFilterChange('usage', undefined)}
                className="ml-2 text-purple-600 hover:text-purple-800"
              >
                ×
              </button>
            </span>
          )}
          {filters.location && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
              Location: {filters.location}
              <button
                onClick={() => handleFilterChange('location', undefined)}
                className="ml-2 text-yellow-600 hover:text-yellow-800"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Filters;
