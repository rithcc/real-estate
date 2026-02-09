export interface Property {
  id: number;
  title: string;
  type: PropertyType;
  saleMode: SaleMode;
  usage: PropertyUsage;
  price: number;
  area: number;
  city: string;
  locality: string;
  lat: number;
  lng: number;
  images: string[];
  description: string;
}

export type PropertyType = 'Land' | 'Plot' | 'Flat' | 'Villa' | 'Office' | 'Shop' | 'Warehouse';
export type SaleMode = 'Fresh' | 'Resale';
export type PropertyUsage = 'Residential' | 'Commercial';

export interface Filters {
  type?: PropertyType;
  saleMode?: SaleMode;
  usage?: PropertyUsage;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
}

export interface Enquiry {
  name: string;
  mobile: string;
  email: string;
  message: string;
  propertyId: number;
}
