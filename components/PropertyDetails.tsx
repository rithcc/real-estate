'use client';

import { useState } from 'react';
import { Property } from '@/types/property';
import Image from 'next/image';

interface PropertyDetailsProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onEnquiryClick: () => void;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  property,
  isOpen,
  onClose,
  onEnquiryClick,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!property) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Backdrop - only show on small screens */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Details Panel */}
      <div className="fixed lg:relative inset-0 lg:inset-auto w-full lg:w-2/5 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col z-50 lg:z-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Property Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="p-6 overflow-y-auto flex-1">
        {/* Image Gallery */}
        <div className="relative mb-6">
          <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={property.images[currentImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover"
            />

            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                >
                  ›
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {property.images.length}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Title and Price */}
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{property.title}</h3>
        <p className="text-3xl font-bold text-green-600 mb-4">
          ₹{(property.price / 100000).toFixed(2)} Lakhs
        </p>

        {/* Property Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Property Type</p>
            <p className="font-semibold text-gray-800">{property.type}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Sale Mode</p>
            <p className="font-semibold text-gray-800">{property.saleMode}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Usage</p>
            <p className="font-semibold text-gray-800">{property.usage}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Area</p>
            <p className="font-semibold text-gray-800">{property.area} sq ft</p>
          </div>
        </div>

        {/* Location */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Location</h4>
          <p className="text-gray-700 mb-1">
            <span className="font-medium">Locality:</span> {property.locality}
          </p>
          <p className="text-gray-700 mb-1">
            <span className="font-medium">City:</span> {property.city}
          </p>
          <p className="text-gray-600 text-sm">
            <span className="font-medium">Coordinates:</span> {property.lat.toFixed(4)}, {property.lng.toFixed(4)}
          </p>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Description</h4>
          <p className="text-gray-700 leading-relaxed">{property.description}</p>
        </div>

        {/* Enquiry Button */}
        <button
          onClick={onEnquiryClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md"
        >
          Send Enquiry
        </button>
      </div>
      </div>
    </>
  );
};

export default PropertyDetails;
