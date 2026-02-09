'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Property } from '@/types/property';

// Fix for default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  properties: Property[];
  onPropertyClick: (property: Property) => void;
}

// Color mapping for different property types
const getMarkerColor = (type: string): string => {
  const colors: { [key: string]: string } = {
    'Land': '#10b981',      // green
    'Plot': '#14b8a6',      // teal
    'Flat': '#3b82f6',      // blue
    'Villa': '#8b5cf6',     // purple
    'Office': '#f59e0b',    // orange
    'Shop': '#ef4444',      // red
    'Warehouse': '#6b7280', // gray
  };
  return colors[type] || '#3b82f6';
};

const Map: React.FC<MapProps> = ({ properties, onPropertyClick }) => {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    // Initialize map only once
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([20.5937, 78.9629], 5); // Center of India

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
    }

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add markers for properties
    properties.forEach((property) => {
      if (mapRef.current) {
        // Create custom icon with color
        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: `
            <div style="
              background-color: ${getMarkerColor(property.type)};
              width: 30px;
              height: 30px;
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              border: 2px solid white;
              box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            ">
              <div style="
                transform: rotate(45deg);
                color: white;
                font-size: 16px;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
              ">₹</div>
            </div>
          `,
          iconSize: [30, 30],
          iconAnchor: [15, 30],
        });

        const marker = L.marker([property.lat, property.lng], { icon: customIcon })
          .addTo(mapRef.current);

        // Create popup content
        const popupContent = `
          <div style="min-width: 200px;">
            <h3 style="font-weight: bold; margin-bottom: 8px; font-size: 14px;">${property.title}</h3>
            <p style="color: #059669; font-weight: bold; margin-bottom: 8px;">₹${(property.price / 100000).toFixed(2)} L</p>
            <p style="font-size: 12px; color: #666; margin-bottom: 8px;">${property.locality}, ${property.city}</p>
            <button
              onclick="window.viewPropertyDetails(${property.id})"
              style="
                background-color: #3b82f6;
                color: white;
                padding: 6px 12px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                width: 100%;
                font-size: 12px;
                font-weight: 500;
              "
            >View Details</button>
          </div>
        `;

        marker.bindPopup(popupContent);
        markersRef.current.push(marker);
      }
    });

    // Set up global callback for property details
    (window as any).viewPropertyDetails = (propertyId: number) => {
      const property = properties.find(p => p.id === propertyId);
      if (property) {
        onPropertyClick(property);
      }
    };

    // Fit map bounds to show all markers
    if (properties.length > 0 && mapRef.current) {
      const bounds = L.latLngBounds(properties.map(p => [p.lat, p.lng]));
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }

    return () => {
      // Cleanup markers on unmount
      markersRef.current.forEach(marker => marker.remove());
    };
  }, [properties, onPropertyClick]);

  return (
    <div id="map" className="w-full h-full rounded-lg shadow-lg" />
  );
};

export default Map;
