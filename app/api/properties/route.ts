import { NextRequest, NextResponse } from 'next/server';
import properties from '@/data/properties.json';
import { Property } from '@/types/property';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const type = searchParams.get('type');
  const saleMode = searchParams.get('saleMode');
  const usage = searchParams.get('usage');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const location = searchParams.get('location');

  let filteredProperties: Property[] = properties as Property[];

  // Apply filters
  if (type) {
    filteredProperties = filteredProperties.filter(p => p.type === type);
  }

  if (saleMode) {
    filteredProperties = filteredProperties.filter(p => p.saleMode === saleMode);
  }

  if (usage) {
    filteredProperties = filteredProperties.filter(p => p.usage === usage);
  }

  if (minPrice) {
    filteredProperties = filteredProperties.filter(p => p.price >= parseInt(minPrice));
  }

  if (maxPrice) {
    filteredProperties = filteredProperties.filter(p => p.price <= parseInt(maxPrice));
  }

  if (location) {
    const locationLower = location.toLowerCase();
    filteredProperties = filteredProperties.filter(p =>
      p.city.toLowerCase().includes(locationLower) ||
      p.locality.toLowerCase().includes(locationLower)
    );
  }

  return NextResponse.json(filteredProperties);
}
