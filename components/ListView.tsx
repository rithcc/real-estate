'use client';

import { Property } from '@/types/property';
import Image from 'next/image';

interface ListViewProps {
  properties: Property[];
  onPropertyClick: (property: Property) => void;
}

const ListView: React.FC<ListViewProps> = ({ properties, onPropertyClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {properties.map((property) => (
        <div
          key={property.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
          onClick={() => onPropertyClick(property)}
        >
          {/* Image */}
          <div className="relative h-48 bg-gray-200">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
              {property.type}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">
              {property.title}
            </h3>

            <p className="text-2xl font-bold text-green-600 mb-2">
              ₹{(property.price / 100000).toFixed(2)} L
            </p>

            <div className="space-y-1 text-sm text-gray-600 mb-3">
              <p>📍 {property.locality}, {property.city}</p>
              <p>📏 {property.area} sq ft</p>
              <p>🏷️ {property.saleMode} · {property.usage}</p>
            </div>

            <p className="text-sm text-gray-700 line-clamp-2 mb-3">
              {property.description}
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onPropertyClick(property);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListView;
