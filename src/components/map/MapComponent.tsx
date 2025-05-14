
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Activity, Destination } from "@/types";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for marker icons in Leaflet with React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapComponentProps {
  destination: Destination;
  activities: Activity[];
}

// Center map component
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  
  return null;
}

const MapComponent = ({ destination, activities }: MapComponentProps) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([destination.coordinates.lat, destination.coordinates.lng]);
  
  useEffect(() => {
    // If we have activities, center the map around them, otherwise use the destination
    if (activities.length > 0) {
      // Find the average of all activity coordinates
      const totalLat = activities.reduce((sum, activity) => sum + activity.location.coordinates.lat, 0);
      const totalLng = activities.reduce((sum, activity) => sum + activity.location.coordinates.lng, 0);
      
      const avgLat = totalLat / activities.length;
      const avgLng = totalLng / activities.length;
      
      setMapCenter([avgLat, avgLng]);
    } else {
      setMapCenter([destination.coordinates.lat, destination.coordinates.lng]);
    }
  }, [destination, activities]);
  
  return (
    <div className="h-full rounded-md overflow-hidden border">
      <MapContainer 
        center={mapCenter} 
        zoom={13} 
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater center={mapCenter} />
        
        {/* Destination marker */}
        <Marker position={[destination.coordinates.lat, destination.coordinates.lng]}>
          <Popup>
            <div>
              <h3 className="font-medium">{destination.city}</h3>
              <p>{destination.country}</p>
            </div>
          </Popup>
        </Marker>
        
        {/* Activity markers */}
        {activities.map((activity) => (
          <Marker 
            key={activity.id} 
            position={[activity.location.coordinates.lat, activity.location.coordinates.lng]}
          >
            <Popup>
              <div>
                <h3 className="font-medium">{activity.title}</h3>
                <p className="text-sm">{activity.location.name}</p>
                <p className="text-xs text-gray-500">{activity.startTime} - {activity.endTime}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
