'use client';

import { APIProvider, Map as GoogleMap, AdvancedMarker } from '@vis.gl/react-google-maps';

export default function Map() {
  // Load all variables from the environment
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const lat = process.env.NEXT_PUBLIC_CLINIC_LATITUDE;
  const lng = process.env.NEXT_PUBLIC_CLINIC_LONGITUDE;
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID;

  // Check if essential variables are missing
  if (!apiKey || !lat || !lng) {
    // In development, show a detailed error.
    if (process.env.NODE_ENV === 'development') {
      return <div className="p-4 bg-red-100 text-red-800 rounded-lg">Error: Map environment variables are missing. Please check your .env.local file.</div>;
    }
    return null; // Or a fallback component in production
  }

  const position = { lat: parseFloat(lat), lng: parseFloat(lng) };

  return (
    <APIProvider apiKey={apiKey}>
      <div style={{ height: '400px', width: '100%' }}>
        <GoogleMap
          zoom={15}
          center={position}
          mapId={mapId} // Use the mapId from the environment
        >
          <AdvancedMarker position={position} />
        </GoogleMap>
      </div>
    </APIProvider>
  );
}