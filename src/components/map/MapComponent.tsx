
import { useEffect, useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Activity, Destination } from "@/types";

interface MapComponentProps {
  destination: Destination;
  activities: Activity[];
}

const MapComponent = ({ destination, activities }: MapComponentProps) => {
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>({
    lat: destination.coordinates.lat, 
    lng: destination.coordinates.lng
  });
  const [selectedMarker, setSelectedMarker] = useState<Activity | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "YOUR_API_KEY" // Replace with your actual Google Maps API key
  });

  // Update map center when activities or destination change
  useEffect(() => {
    if (activities.length > 0) {
      // Find the average of all activity coordinates
      const totalLat = activities.reduce((sum, activity) => sum + activity.location.coordinates.lat, 0);
      const totalLng = activities.reduce((sum, activity) => sum + activity.location.coordinates.lng, 0);
      
      const avgLat = totalLat / activities.length;
      const avgLng = totalLng / activities.length;
      
      setMapCenter({ lat: avgLat, lng: avgLng });
    } else {
      setMapCenter({ lat: destination.coordinates.lat, lng: destination.coordinates.lng });
    }
  }, [destination, activities]);

  // Callback function when map is loaded
  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  // Callback function when map is unmounted
  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (!isLoaded) return <div className="h-full flex items-center justify-center bg-muted">Loading maps...</div>;

  const mapContainerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '0.375rem'
  };

  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    styles: [
      {
        featureType: "all",
        elementType: "geometry",
        stylers: [
          { saturation: -80 },
          { lightness: 10 }
        ]
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          { color: "#87CEEB" }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
          { color: "#c5e8c5" }
        ]
      }
    ]
  };

  return (
    <div className="h-full rounded-md overflow-hidden border">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
      >
        {/* Destination marker */}
        <Marker 
          position={{lat: destination.coordinates.lat, lng: destination.coordinates.lng}}
          icon={{
            url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='10' r='3'/%3E%3Cpath d='M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z'/%3E%3C/svg%3E",
            scaledSize: new google.maps.Size(30, 30),
          }}
          onClick={() => setSelectedMarker(null)}
        />
        
        {/* Activity markers */}
        {activities.map((activity) => (
          <Marker 
            key={activity.id} 
            position={{
              lat: activity.location.coordinates.lat, 
              lng: activity.location.coordinates.lng
            }}
            icon={{
              url: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='%23${getMarkerColor(activity.category)}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Ccircle cx='12' cy='12' r='3'/%3E%3C/svg%3E`,
              scaledSize: new google.maps.Size(24, 24),
            }}
            onClick={() => setSelectedMarker(activity)}
          />
        ))}
        
        {/* Info Window for selected activity */}
        {selectedMarker && (
          <InfoWindow
            position={{
              lat: selectedMarker.location.coordinates.lat,
              lng: selectedMarker.location.coordinates.lng
            }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="p-2 max-w-xs">
              <h3 className="font-medium text-sm">{selectedMarker.title}</h3>
              <p className="text-xs">{selectedMarker.location.name}</p>
              <p className="text-xs text-gray-500 mt-1">{selectedMarker.startTime} - {selectedMarker.endTime}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

// Helper function to get marker color based on activity category
function getMarkerColor(category: Activity["category"]): string {
  switch (category) {
    case "food":
      return "e67e22"; // Orange
    case "attraction":
      return "3498db"; // Blue
    case "accommodation":
      return "2ecc71"; // Green
    case "transportation":
      return "9b59b6"; // Purple
    case "shopping":
      return "e84393"; // Pink
    case "event":
      return "f1c40f"; // Yellow
    default:
      return "7f8c8d"; // Gray
  }
}

export default MapComponent;
