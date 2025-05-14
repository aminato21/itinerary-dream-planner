
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, Settings } from "lucide-react";
import { mockItineraries } from "@/data/mockData";
import { Itinerary, Day } from "@/types";
import DayPlan from "@/components/itinerary/DayPlan";
import MapComponent from "@/components/map/MapComponent";
import WeatherWidget from "@/components/weather/WeatherWidget";

const ItineraryView = () => {
  const { id } = useParams<{ id: string }>();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [selectedDay, setSelectedDay] = useState<Day | null>(null);

  useEffect(() => {
    if (id) {
      const foundItinerary = mockItineraries.find((i) => i.id === id);
      if (foundItinerary) {
        setItinerary(foundItinerary);
        // Set the first day as selected by default
        if (foundItinerary.days.length > 0) {
          setSelectedDay(foundItinerary.days[0]);
        }
      }
    }
  }, [id]);

  if (!itinerary) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <h1 className="text-2xl font-bold">Itinerary not found</h1>
          <Link to="/" className="mt-4">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">{itinerary.title}</h1>
            <div className="flex items-center mt-2 text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>
                {itinerary.destination.city}, {itinerary.destination.country}
              </span>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Calendar className="h-4 w-4 mr-1" />
              <span>
                {new Date(itinerary.startDate).toLocaleDateString()} -{" "}
                {new Date(itinerary.endDate).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to={`/edit-itinerary/${itinerary.id}`}>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Trip Overview</CardTitle>
            <CardDescription>{itinerary.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1 md:col-span-1">
                <WeatherWidget 
                  destination={itinerary.destination} 
                  startDate={itinerary.startDate}
                  endDate={itinerary.endDate}
                />
              </div>
              <div className="col-span-1 md:col-span-2 h-[300px]">
                <MapComponent 
                  destination={itinerary.destination} 
                  activities={selectedDay ? selectedDay.activities : []}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6">
          <Tabs defaultValue={itinerary.days[0]?.id || "day1"} onValueChange={(value) => {
            const day = itinerary.days.find(d => d.id === value);
            if (day) setSelectedDay(day);
          }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Daily Itinerary</h2>
            </div>
            <TabsList className="mb-4 flex w-full overflow-x-auto pb-1 justify-start">
              {itinerary.days.map((day, index) => (
                <TabsTrigger key={day.id} value={day.id} className="min-w-20">
                  Day {index + 1}
                </TabsTrigger>
              ))}
            </TabsList>
            {itinerary.days.map((day) => (
              <TabsContent key={day.id} value={day.id}>
                <DayPlan day={day} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </PageContainer>
  );
};

export default ItineraryView;
