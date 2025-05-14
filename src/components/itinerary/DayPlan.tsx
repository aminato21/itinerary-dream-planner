
import { Day, Activity } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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

export default DayPlan;
