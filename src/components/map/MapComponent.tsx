
import { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Activity, Destination } from "@/types";

interface MapComponentProps {
  destination: Destination;
  activities: Activity[];
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    {
      featureType: 'all',
      elementType: 'geometry',
      stylers: [{ color: '#242f3e' }]
    },
    {
      featureType: 'all',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#746855' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#17263c' }]
    }
  ]
};

const MapComponent = ({ destination, activities }: MapComponentProps) => {
  const [selectedMarker, setSelectedMarker] = useState<Activity | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  
  // Calculate map center based on activities or destination
  const mapCenter = activities.length > 0 
    ? {
        lat: activities.reduce((sum, activity) => sum + activity.location.coordinates.lat, 0) / activities.length,
        lng: activities.reduce((sum, activity) => sum + activity.location.coordinates.lng, 0) / activities.length
      }
    : { lat: destination.coordinates.lat, lng: destination.coordinates.lng };
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY' // This should be replaced with an actual API key in production
  });
  
  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);
  
  if (!isLoaded) return <div className="h-full rounded-md overflow-hidden border bg-gray-100 flex items-center justify-center">Loading Map...</div>;
  
  return (
    <div className="h-full rounded-md overflow-hidden border">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={options}
      >
        {/* Destination marker */}
        <Marker 
          position={{ lat: destination.coordinates.lat, lng: destination.coordinates.lng }}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#ffffff',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
            scale: 8
          }}
        />
        
        {/* Activity markers */}
        {activities.map((activity) => (
          <Marker 
            key={activity.id} 
            position={{ lat: activity.location.coordinates.lat, lng: activity.location.coordinates.lng }}
            onClick={() => setSelectedMarker(activity)}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: '#33C3F0',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 1.5,
              scale: 6
            }}
          />
        ))}
        
        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.location.coordinates.lat, lng: selectedMarker.location.coordinates.lng }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="p-2">
              <h3 className="font-medium text-sm">{selectedMarker.title}</h3>
              <p className="text-xs">{selectedMarker.location.name}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
