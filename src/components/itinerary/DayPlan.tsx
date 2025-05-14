
import { Day } from "@/types";
import ActivityItem from "./ActivityItem";

interface DayPlanProps {
  day: Day;
}

const DayPlan = ({ day }: DayPlanProps) => {
  // Sort activities by start time
  const sortedActivities = [...day.activities].sort((a, b) => {
    return a.startTime.localeCompare(b.startTime);
  });

  return (
    <div className="rounded-lg overflow-hidden bg-[#1D1D1F] text-white">
      <div className="p-4 pb-2">
        <div className="text-lg font-medium">
          {new Date(day.date).toLocaleDateString(undefined, {
            weekday: "long",
            month: "short",
            day: "numeric",
          })}
        </div>
        <div className="text-sm text-white/60">
          {sortedActivities.length} activities planned
        </div>
      </div>
      
      <div className="divide-y divide-white/10">
        {sortedActivities.length > 0 ? (
          sortedActivities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))
        ) : (
          <div className="text-center py-10 text-white/60">
            <p>No activities planned for this day.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DayPlan;
