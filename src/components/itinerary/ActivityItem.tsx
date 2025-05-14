
import { Activity } from "@/types";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ActivityItemProps {
  activity: Activity;
}

const getActivityIcon = (category: Activity["category"]) => {
  switch (category) {
    case "food":
      return "🍽️";
    case "attraction":
      return "🏛️";
    case "accommodation":
      return "🏨";
    case "transportation":
      return "🚌";
    case "shopping":
      return "🛍️";
    case "event":
      return "🎭";
    default:
      return "📝";
  }
};

const getActivityColor = (category: Activity["category"]) => {
  switch (category) {
    case "food":
      return "bg-orange-100 text-orange-800";
    case "attraction":
      return "bg-blue-100 text-blue-800";
    case "accommodation":
      return "bg-green-100 text-green-800";
    case "transportation":
      return "bg-purple-100 text-purple-800";
    case "shopping":
      return "bg-pink-100 text-pink-800";
    case "event":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const ActivityItem = ({ activity }: ActivityItemProps) => {
  const icon = getActivityIcon(activity.category);
  const badgeClass = getActivityColor(activity.category);

  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 w-16 text-center">
        <div className="text-sm font-medium text-gray-500">
          {activity.startTime}
        </div>
        <div className="text-xs text-gray-400">to</div>
        <div className="text-sm font-medium text-gray-500">
          {activity.endTime}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <span className="text-xl" aria-hidden="true">
            {icon}
          </span>
          <h3 className="text-lg font-medium text-gray-900 truncate">
            {activity.title}
          </h3>
          <Badge variant="outline" className={badgeClass}>
            {activity.category.charAt(0).toUpperCase() + activity.category.slice(1)}
          </Badge>
        </div>
        
        <p className="mt-1 text-sm text-gray-600">{activity.description}</p>
        
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="truncate">{activity.location.name}</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
