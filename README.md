# Real Estate Map Viewer

A modern, interactive real estate property discovery interface built with Next.js, React, TypeScript, and Leaflet. Users can view properties on an interactive map, apply advanced filters, and submit enquiries.

## 🌟 Features

### ✅ Core Features Implemented
- **Interactive Map View** using Leaflet with OpenStreetMap
- **Property Categories**:
  - Types: Land, Plot, Flat, Villa, Office, Shop, Warehouse
  - Sale Modes: Fresh, Resale
  - Usage: Residential, Commercial
- **Advanced Filters**:
  - Property Type
  - Sale Mode
  - Usage Type
  - Budget Range (Min/Max Price)
  - Location Search (City/Locality)
  - Active Filter Chips with Clear All option
- **Property Details Panel** - Slide-in drawer with:
  - Image gallery with navigation
  - Price, area, and location details
  - Property attributes (type, sale mode, usage)
  - Latitude & Longitude display
  - Full description
- **Enquiry Form** - Modal with validation:
  - Name, Mobile, Email, Message fields
  - Form validation
  - Success/Error feedback
- **Bonus Features**:
  - Color-Coded Markers - Different colors for each property type
  - User Geolocation - "Search near me" button
  - Filter Chips + Clear All
  - Toggle between Map View / List View
- **Responsive Design** - Works on desktop, tablet, and mobile

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm installed
- Git (optional, for cloning)

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd real-estate-map
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
real-estate-map/
├── app/
│   ├── api/
│   │   ├── properties/
│   │   │   └── route.ts          # GET /api/properties - Fetch filtered properties
│   │   └── enquiry/
│   │       └── route.ts          # POST /api/enquiry - Submit enquiry
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page component
├── components/
│   ├── Map.tsx                   # Interactive map with Leaflet
│   ├── Filters.tsx               # Filter component with geolocation
│   ├── PropertyDetails.tsx       # Property details drawer
│   ├── EnquiryForm.tsx          # Enquiry form drawer
│   └── ListView.tsx             # List view component
├── data/
│   └── properties.json          # Sample property data with lat/lng
├── types/
│   └── property.ts              # TypeScript type definitions
├── public/                      # Static assets
└── package.json                 # Dependencies
```

## 🗺️ API Endpoints

### GET `/api/properties`

Fetch properties with optional filters.

**Query Parameters:**
- `type` - Property type (Land, Plot, Flat, Villa, Office, Shop, Warehouse)
- `saleMode` - Sale mode (Fresh, Resale)
- `usage` - Usage type (Residential, Commercial)
- `minPrice` - Minimum price in rupees
- `maxPrice` - Maximum price in rupees
- `location` - Search by city or locality

**Example:**
```
GET /api/properties?type=Flat&usage=Residential&minPrice=10000000&maxPrice=25000000
```

### POST `/api/enquiry`

Submit a property enquiry.

**Request Body:**
```json
{
  "name": "John Doe",
  "mobile": "9876543210",
  "email": "john@example.com",
  "message": "Interested in this property",
  "propertyId": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Enquiry submitted successfully",
  "enquiry": { /* enquiry data */ }
}
```

## 🎨 Features Breakdown

### 1. Map Component
- Uses Leaflet with OpenStreetMap tiles (free, no API key required)
- Custom color-coded markers for each property type
- Marker popups with quick property info
- Click-to-view-details functionality
- Auto-fit bounds to show all properties
- Zoom and pan controls

### 2. Filters Component
- Dropdown filters for type, sale mode, and usage
- Price range inputs (min/max)
- Location text search
- **📍 "Near Me" button** - Get user location and sort by distance
- Active filter chips display
- Show/Hide filters toggle
- Clear all filters button

### 3. Property Details Drawer
- Slide-in from right side
- Image gallery with prev/next navigation
- Comprehensive property information
- "Send Enquiry" CTA button
- Responsive design
- Side-by-side with map on desktop

### 4. Enquiry Form
- Drawer design (similar to property details)
- Form validation (required fields)
- Mobile number pattern validation (10 digits)
- Email validation
- Success/error feedback messages
- Auto-close on successful submission
- Side-by-side with map on desktop

### 5. View Toggle
- **🗺️ Map View** - Interactive map with colored markers
- **📋 List View** - Grid of property cards
- Seamless switching between views
- Responsive grid layout for list view

## 📊 Sample Data

The application includes 10 sample properties across major Indian cities:
- Mumbai (Andheri West, Bandra West, Bhiwandi)
- Bangalore (HSR Layout, Whitefield, Koramangala, Electronic City)
- Pune (Ring Road)
- Hyderabad (Gachibowli)
- Delhi (Connaught Place)

Each property includes:
- Precise latitude & longitude coordinates
- High-quality images from Unsplash
- Realistic pricing and area details
- Comprehensive descriptions

## 🔧 Technologies Used

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Maps:** Leaflet + React Leaflet
- **Map Tiles:** OpenStreetMap (free, no API key)
- **Images:** Unsplash (royalty-free)

## 🐛 Development

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Lint Code
```bash
npm run lint
```

## 📝 Notes

### Adding More Properties

Edit `/data/properties.json` and add new entries with this structure:

```json
{
  "id": 11,
  "title": "Property Title",
  "type": "Flat",
  "saleMode": "Fresh",
  "usage": "Residential",
  "price": 25000000,
  "area": 1200,
  "city": "Mumbai",
  "locality": "Powai",
  "lat": 19.1176,
  "lng": 72.9060,
  "images": [
    "https://images.unsplash.com/photo-example?w=800&h=600&fit=crop"
  ],
  "description": "Property description here..."
}
```

### Finding Latitude & Longitude

Use any of these free tools:
- Google Maps: Right-click on location → "What's here?"
- [latlong.net](https://www.latlong.net/)
- OpenStreetMap: Click on location to see coordinates

### Database Integration

To connect to MongoDB:
1. Install MongoDB driver: `npm install mongodb`
2. Update `/app/api/properties/route.ts` to fetch from database
3. Update `/app/api/enquiry/route.ts` to save enquiries to database

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Developer

Built as a MERN + Next.js developer task demonstrating:
- Modern React patterns with hooks
- TypeScript for type safety
- Next.js App Router and API routes
- Interactive map integration
- Responsive UI/UX design
- Form handling and validation
- Component composition
- State management
- Geolocation API integration

---

**Ready to discover your dream property? Start the dev server and explore!** 🏠✨
