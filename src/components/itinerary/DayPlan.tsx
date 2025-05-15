
import { Day, Activity, TransportationMethod } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ActivityItem from "./ActivityItem";
import { Bus, Car, Train as TrainFront, Plane, Train as TramFront } from "lucide-react";

interface DayPlanProps {
  day: Day;
  preferredTransport?: string;
}

const DayPlan = ({ day, preferredTransport = 'all' }: DayPlanProps) => {
  // Sort activities by start time
  const sortedActivities = [...day.activities].sort((a, b) => {
    return a.startTime.localeCompare(b.startTime);
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {new Date(day.date).toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </CardTitle>
        <CardDescription>
          {sortedActivities.length} activities planned for this day
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sortedActivities.length > 0 ? (
            sortedActivities.map((activity, index) => (
              <div key={activity.id}>
                <ActivityItem activity={activity} />
                
                {/* Add transportation information between activities */}
                {index < sortedActivities.length - 1 && (
                  <div className="my-4 px-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="w-6 flex justify-center">
                        {getTransportIcon(getTransportMethod(preferredTransport, activity, sortedActivities[index + 1]))}
                      </div>
                      <div className="ml-2 flex-grow">
                        <p className="font-medium">
                          Travel to next destination ({calculateDistance(activity, sortedActivities[index + 1])} km)
                        </p>
                        <p className="text-xs">
                          via {getTransportDescription(getTransportMethod(preferredTransport, activity, sortedActivities[index + 1]))} • 
                          Approximately {calculateTravelTime(activity, sortedActivities[index + 1], getTransportMethod(preferredTransport, activity, sortedActivities[index + 1]))} minutes
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {index < sortedActivities.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No activities planned for this day.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Helper functions for transportation details
function calculateDistance(from: Activity, to: Activity): number {
  // This would use a real geolocation calculation in a production app
  // Here we're just simulating distances
  const fromLat = from.location.coordinates.lat;
  const fromLng = from.location.coordinates.lng;
  const toLat = to.location.coordinates.lat;
  const toLng = to.location.coordinates.lng;
  
  // Simple Euclidean distance as a simulation
  const latDiff = toLat - fromLat;
  const lngDiff = toLng - fromLng;
  
  // Scale to make it somewhat realistic
  return Math.round((Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 111) * 10) / 10;
}

function calculateTravelTime(from: Activity, to: Activity, transportMethod: TransportationMethod): number {
  const distance = calculateDistance(from, to);
  // Average speeds (km/h) for different transportation methods
  const speeds: Record<TransportationMethod, number> = {
    walking: 5,
    public_transit: 20,
    taxi: 30,
    rideshare: 30,
    bicycle: 15,
    car: 40,
    train: 60,
    bus: 25,
    ferry: 20,
    other: 25
  };
  
  // Calculate time in minutes
  return Math.round((distance / speeds[transportMethod]) * 60);
}

function getTransportMethod(preference: string, from: Activity, to: Activity): TransportationMethod {
  const distance = calculateDistance(from, to);
  
  // Determine transport method based on preference and distance
  if (distance < 0.5) {
    return 'walking';
  } else if (distance < 3) {
    switch (preference) {
      case 'walking':
        return 'walking';
      case 'public':
        return 'public_transit';
      case 'car':
        return 'taxi';
      case 'budget':
        return 'walking';
      default:
        return distance < 1 ? 'walking' : 'public_transit';
    }
  } else if (distance < 10) {
    switch (preference) {
      case 'walking':
        return 'public_transit';
      case 'public':
        return 'public_transit';
      case 'car':
        return 'taxi';
      case 'budget':
        return 'public_transit';
      default:
        return 'public_transit';
    }
  } else {
    switch (preference) {
      case 'public':
        return distance > 30 ? 'train' : 'bus';
      case 'car':
        return 'car';
      case 'budget':
        return 'bus';
      default:
        return distance > 50 ? 'train' : 'car';
    }
  }
}

function getTransportIcon(method: TransportationMethod) {
  switch (method) {
    case 'walking':
      return <span className="text-green-600">🚶</span>;
    case 'public_transit':
      return <TramFront size={16} className="text-blue-600" />;
    case 'taxi':
      return <Car size={16} className="text-yellow-600" />;
    case 'rideshare':
      return <Car size={16} className="text-purple-600" />;
    case 'bicycle':
      return <span className="text-green-600">🚲</span>;
    case 'car':
      return <Car size={16} className="text-red-600" />;
    case 'train':
      return <TrainFront size={16} className="text-blue-700" />;
    case 'bus':
      return <Bus size={16} className="text-orange-600" />;
    case 'ferry':
      return <span className="text-blue-500">⛴️</span>;
    default:
      return <Bus size={16} className="text-gray-600" />;
  }
}

function getTransportDescription(method: TransportationMethod): string {
  switch (method) {
    case 'walking':
      return 'Walking';
    case 'public_transit':
      return 'Public Transit';
    case 'taxi':
      return 'Taxi';
    case 'rideshare':
      return 'Rideshare';
    case 'bicycle':
      return 'Bicycle';
    case 'car':
      return 'Car';
    case 'train':
      return 'Train';
    case 'bus':
      return 'Bus';
    case 'ferry':
      return 'Ferry';
    default:
      return 'Transit';
  }
}

export default DayPlan;
