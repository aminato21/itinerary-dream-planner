
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { mockItineraries } from "@/data/mockData";
import { Itinerary, Day } from "@/types";
import DayPlan from "@/components/itinerary/DayPlan";
import MapComponent from "@/components/map/MapComponent";
import WeatherWidget from "@/components/weather/WeatherWidget";

const ItineraryView = () => {
  const { id } = useParams<{ id: string }>();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [selectedDay, setSelectedDay] = useState<Day | null>(null);
  const [currentTab, setCurrentTab] = useState("days");

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
    <div className="min-h-screen bg-[#1D1D1F] text-white">
      <div className="max-w-lg mx-auto px-4 py-6">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-light">{itinerary.destination.city}</h1>
            <p className="text-sm text-white/70">
              {new Date(itinerary.startDate).toLocaleDateString(undefined, {
                month: "long",
                day: "numeric",
              })} - {new Date(itinerary.endDate).toLocaleDateString(undefined, {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <Link to={`/edit-itinerary/${itinerary.id}`}>
            <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
        </header>

        <div className="mb-8 h-64">
          <div className="rounded-lg overflow-hidden h-full">
            <MapComponent 
              destination={itinerary.destination} 
              activities={selectedDay ? selectedDay.activities : []}
            />
          </div>
        </div>
        
        <div className="mb-8">
          <WeatherWidget 
            destination={itinerary.destination} 
            startDate={itinerary.startDate}
            endDate={itinerary.endDate}
          />
        </div>
        
        <div className="mb-4">
          <div className="flex text-center border-b border-white/20">
            <button 
              className={`flex-1 py-2 text-sm font-medium ${currentTab === 'days' ? 'text-white border-b-2 border-white' : 'text-white/60'}`}
              onClick={() => setCurrentTab('days')}
            >
              Daily Plan
            </button>
            <button 
              className={`flex-1 py-2 text-sm font-medium ${currentTab === 'overview' ? 'text-white border-b-2 border-white' : 'text-white/60'}`}
              onClick={() => setCurrentTab('overview')}
            >
              Overview
            </button>
          </div>
        </div>
        
        {currentTab === 'days' && (
          <div>
            <div className="flex overflow-x-auto pb-2 mb-4 scrollbar-none">
              {itinerary.days.map((day, index) => (
                <button 
                  key={day.id}
                  className={`px-4 py-2 mr-2 rounded-full whitespace-nowrap text-sm ${selectedDay?.id === day.id ? 'bg-white/20 text-white' : 'text-white/70'}`}
                  onClick={() => setSelectedDay(day)}
                >
                  Day {index + 1}
                </button>
              ))}
            </div>
            
            {selectedDay && <DayPlan day={selectedDay} />}
          </div>
        )}
        
        {currentTab === 'overview' && (
          <div className="space-y-6">
            {itinerary.days.map((day, index) => (
              <div key={day.id}>
                <h2 className="text-lg font-medium mb-2">Day {index + 1}</h2>
                <DayPlan day={day} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryView;
