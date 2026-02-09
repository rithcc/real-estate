'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Property, Filters as FiltersType } from '@/types/property';
import Filters from '@/components/Filters';
import PropertyDetails from '@/components/PropertyDetails';
import EnquiryForm from '@/components/EnquiryForm';
import ListView from '@/components/ListView';

// Dynamically import Map component to avoid SSR issues with Leaflet
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
      <p className="text-gray-600">Loading map...</p>
    </div>
  ),
});

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [filters, setFilters] = useState<FiltersType>({});
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  // Fetch properties on mount
  useEffect(() => {
    fetchProperties();
  }, []);

  // Fetch properties with filters
  const fetchProperties = async (filterParams: FiltersType = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      if (filterParams.type) params.append('type', filterParams.type);
      if (filterParams.saleMode) params.append('saleMode', filterParams.saleMode);
      if (filterParams.usage) params.append('usage', filterParams.usage);
      if (filterParams.minPrice) params.append('minPrice', filterParams.minPrice.toString());
      if (filterParams.maxPrice) params.append('maxPrice', filterParams.maxPrice.toString());
      if (filterParams.location) params.append('location', filterParams.location);

      const response = await fetch(`/api/properties?${params.toString()}`);
      const data = await response.json();

      setProperties(data);
      setFilteredProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: FiltersType) => {
    setFilters(newFilters);
    fetchProperties(newFilters);
  };

  // Handle property click
  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setIsDetailsOpen(true);
  };

  // Handle enquiry button click
  const handleEnquiryClick = () => {
    setIsDetailsOpen(false);
    setIsEnquiryOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Real Estate Map Viewer
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Discover your dream property on the map
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold text-blue-600">{filteredProperties.length}</span> properties
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`px-4 py-6 transition-all duration-300 ${
        isDetailsOpen || isEnquiryOpen ? 'max-w-full' : 'container mx-auto'
      }`}>
        {/* Filters */}
        <Filters onFilterChange={handleFilterChange} />

        {/* View Toggle */}
        <div className="bg-white rounded-lg shadow-lg p-3 mb-4 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('map')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                viewMode === 'map'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🗺️ Map View
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📋 List View
            </button>
          </div>
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-blue-600">{filteredProperties.length}</span> properties
          </p>
        </div>

        {/* Map and Details Container */}
        <div className="flex gap-4 relative">
          {/* Map Container */}
          <div className={`bg-white rounded-lg shadow-lg p-4 transition-all duration-300 ${
            isDetailsOpen || isEnquiryOpen ? 'w-full lg:w-3/5' : 'w-full'
          }`}>
            {viewMode === 'map' ? (
              <>
                <div className="h-[calc(100vh-380px)] min-h-[500px] relative">
                  {loading ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading properties...</p>
                      </div>
                    </div>
                  ) : filteredProperties.length === 0 ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                      <div className="text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                        <p className="text-gray-600 mt-4">No properties found</p>
                        <p className="text-gray-500 text-sm mt-2">Try adjusting your filters</p>
                      </div>
                    </div>
                  ) : (
                    <Map properties={filteredProperties} onPropertyClick={handlePropertyClick} />
                  )}
                </div>

                {/* Legend */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Property Types:</h3>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { type: 'Land', color: '#10b981' },
                      { type: 'Plot', color: '#14b8a6' },
                      { type: 'Flat', color: '#3b82f6' },
                      { type: 'Villa', color: '#8b5cf6' },
                      { type: 'Office', color: '#f59e0b' },
                      { type: 'Shop', color: '#ef4444' },
                      { type: 'Warehouse', color: '#6b7280' },
                    ].map((item) => (
                      <div key={item.type} className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full border-2 border-white shadow"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-gray-600">{item.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="min-h-[500px] max-h-[calc(100vh-380px)] overflow-y-auto">
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading properties...</p>
                    </div>
                  </div>
                ) : filteredProperties.length === 0 ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        />
                      </svg>
                      <p className="text-gray-600 mt-4">No properties found</p>
                      <p className="text-gray-500 text-sm mt-2">Try adjusting your filters</p>
                    </div>
                  </div>
                ) : (
                  <ListView properties={filteredProperties} onPropertyClick={handlePropertyClick} />
                )}
              </div>
            )}
          </div>

          {/* Property Details Panel */}
          {!isEnquiryOpen && (
            <PropertyDetails
              property={selectedProperty}
              isOpen={isDetailsOpen}
              onClose={() => setIsDetailsOpen(false)}
              onEnquiryClick={handleEnquiryClick}
            />
          )}

          {/* Enquiry Form Panel */}
          {isEnquiryOpen && (
            <EnquiryForm
              property={selectedProperty}
              isOpen={isEnquiryOpen}
              onClose={() => setIsEnquiryOpen(false)}
            />
          )}
        </div>
      </main>
    </div>
  );
}
