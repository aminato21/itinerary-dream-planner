
import { Activity } from "@/types";

interface ActivityItemProps {
  activity: Activity;
}

const getActivityIcon = (category: Activity["category"]) => {
  switch (category) {
    case "food":
      return "⊛"; // food - simplified cutlery symbol
    case "attraction":
      return "◎"; // attraction - circle with dot
    case "accommodation":
      return "⌂"; // accommodation - house symbol
    case "transportation":
      return "⇥"; // transportation - right arrow
    case "shopping":
      return "◇"; // shopping - diamond
    case "event":
      return "◈"; // event - diamond with dot
    default:
      return "○"; // default - circle
  }
};

const ActivityItem = ({ activity }: ActivityItemProps) => {
  const icon = getActivityIcon(activity.category);

  return (
    <div className="flex items-center py-4 border-b border-white/10">
      <div className="flex-shrink-0 w-14 text-center">
        <div className="text-sm font-light text-white/70">{activity.startTime}</div>
      </div>

      <div className="flex items-center flex-grow">
        <span className="text-xl mr-4 text-white/90" aria-hidden="true">
          {icon}
        </span>
        <div>
          <h3 className="text-base font-medium text-white truncate">
            {activity.title}
          </h3>
          <div className="mt-1 text-xs text-white/60 flex items-center">
            <span>{activity.location.name}</span>
          </div>
        </div>
      </div>
      
      <div className="flex-shrink-0 w-14 text-center">
        <div className="text-sm font-light text-white/70">{activity.endTime}</div>
      </div>
    </div>
  );
};

export default ActivityItem;
