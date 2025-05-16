import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageContainer from "@/components/layout/PageContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, Settings, ArrowLeft, Wallet, Bus } from "lucide-react";
import { mockItineraries } from "@/data/mockData";
import { Itinerary, Day } from "@/types";
import DayPlan from "@/components/itinerary/DayPlan";
import MapComponent from "@/components/map/MapComponent";
import WeatherWidget from "@/components/weather/WeatherWidget";
import { toast } from "@/hooks/use-toast";

const ItineraryView = () => {
  const { id } = useParams<{ id: string }>();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [selectedDay, setSelectedDay] = useState<Day | null>(null);
  const [transportationCost, setTransportationCost] = useState<number>(0);
  const [remainingBudget, setRemainingBudget] = useState<number>(0);

  useEffect(() => {
    if (id) {
      const foundItinerary = mockItineraries.find((i) => i.id === id);
      if (foundItinerary) {
        setItinerary(foundItinerary);
        // Set the first day as selected by default
        if (foundItinerary.days.length > 0) {
          setSelectedDay(foundItinerary.days[0]);
        }
        
        // Calculate transportation costs (simulated)
        const transportCost = calculateTransportationCost(foundItinerary);
        setTransportationCost(transportCost);
        
        // Calculate remaining budget
        const budget = parseFloat(foundItinerary.budget || "0");
        setRemainingBudget(budget - transportCost);
      }
    }
  }, [id]);
  
  // Simulate transportation cost calculation based on activities and preferences
  const calculateTransportationCost = (itinerary: Itinerary): number => {
    // In a real app, this would be calculated based on actual distances and transportation methods
    const totalDays = itinerary.days.length;
    const activitiesCount = itinerary.days.reduce((count, day) => count + day.activities.length, 0);
    
    // Base cost depends on preferred transportation
    let baseCostPerDay = 0;
    switch(itinerary.preferredTransport) {
      case 'public':
        baseCostPerDay = 15; // Public transport daily pass
        break;
      case 'car':
        baseCostPerDay = 45; // Car rental/taxi average
        break;
      case 'walking':
        baseCostPerDay = 5; // Occasional public transport
        break;
      case 'budget':
        baseCostPerDay = 10; // Budget options
        break;
      default:
        baseCostPerDay = 25; // Mixed options
    }
    
    // Calculate total cost based on days and activities
    const totalTransportCost = totalDays * baseCostPerDay + (activitiesCount * 3); // Additional cost per activity for moving between locations
    
    return Math.round(totalTransportCost);
  };

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

  const handlePrintItinerary = () => {
    toast({
      title: "Itinerary ready for printing",
      description: "Preparing a printer-friendly version of your itinerary",
    });
    window.print();
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <PageContainer>
      <motion.div 
        initial="hidden"
        animate="show"
        variants={container}
        className="flex flex-col space-y-6"
      >
        <motion.div variants={item} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <Link to="/" className="inline-flex items-center text-gray-400 mb-2 hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-3xl font-bold text-gradient">{itinerary.title}</h1>
            <div className="flex items-center mt-2 text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1 text-primary" />
              <span>
                {itinerary.destination.city}, {itinerary.destination.country}
              </span>
              <Separator orientation="vertical" className="mx-2 h-4 bg-white/20" />
              <Calendar className="h-4 w-4 mr-1 text-primary" />
              <span>
                {new Date(itinerary.startDate).toLocaleDateString()} -{" "}
                {new Date(itinerary.endDate).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="glass border-white/30 hover:bg-white/10" onClick={handlePrintItinerary}>
              <span className="h-4 w-4 mr-2">📄</span>
              Print
            </Button>
            <Link to={`/edit-itinerary/${itinerary.id}`}>
              <Button variant="outline" size="sm" className="glass border-white/30 hover:bg-white/10">
                <Settings className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div variants={item}>
          <Card className="glass-card overflow-hidden border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Trip Overview</CardTitle>
              <CardDescription className="text-gray-300">{itinerary.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1 md:col-span-1 space-y-4">
                  <WeatherWidget 
                    destination={itinerary.destination} 
                    startDate={itinerary.startDate}
                    endDate={itinerary.endDate}
                  />
                  
                  {/* Budget and Transportation Section */}
                  <div className="glass border border-white/10 rounded-lg p-4 shadow-sm">
                    <h3 className="font-medium flex items-center gap-1.5 mb-2 text-white">
                      <Wallet className="h-4 w-4 text-primary" />
                      Budget Overview
                    </h3>
                    <div className="space-y-1.5 text-sm">
                      <div className="flex justify-between text-gray-300">
                        <span>Total Budget:</span>
                        <span className="font-medium text-white">{itinerary.budget} {itinerary.budgetCurrency}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Transportation Cost:</span>
                        <span className="font-medium text-white">{transportationCost} {itinerary.budgetCurrency}</span>
                      </div>
                      <Separator className="my-1.5 bg-white/20" />
                      <div className="flex justify-between text-gray-300">
                        <span>Remaining for Activities:</span>
                        <span className="font-medium text-primary">{remainingBudget} {itinerary.budgetCurrency}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-medium flex items-center gap-1.5 mt-4 mb-2 text-white">
                      <Bus className="h-4 w-4 text-primary" />
                      Transportation
                    </h3>
                    <div className="text-sm text-gray-300">
                      <p className="mb-1">Primary: {getTransportName(itinerary.preferredTransport)}</p>
                      <p className="text-xs text-gray-400">Transportation costs are automatically calculated based on your activities and preferences.</p>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 md:col-span-2 h-[300px] rounded-lg overflow-hidden">
                  <MapComponent 
                    destination={itinerary.destination} 
                    activities={selectedDay ? selectedDay.activities : []}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="mt-6">
          <Tabs defaultValue={itinerary.days[0]?.id || "day1"} onValueChange={(value) => {
            const day = itinerary.days.find(d => d.id === value);
            if (day) setSelectedDay(day);
          }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Daily Itinerary</h2>
            </div>
            <TabsList className="mb-4 flex w-full overflow-x-auto pb-1 justify-start glass border-white/10 no-scrollbar">
              {itinerary.days.map((day, index) => (
                <TabsTrigger key={day.id} value={day.id} className="min-w-20 data-[state=active]:bg-primary/20 data-[state=active]:text-white">
                  Day {index + 1}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="glass-card rounded-lg p-4 border-white/10">
              {itinerary.days.map((day) => (
                <TabsContent key={day.id} value={day.id}>
                  <DayPlan day={day} preferredTransport={itinerary.preferredTransport} />
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </motion.div>
      </motion.div>
    </PageContainer>
  );
};

// Helper function to display transportation method in a user-friendly way
function getTransportName(transportCode: string | undefined): string {
  switch(transportCode) {
    case 'public':
      return 'Public Transportation';
    case 'car':
      return 'Car & Taxi Services';
    case 'walking':
      return 'Walking (with occasional transit)';
    case 'budget':
      return 'Budget-friendly Options';
    default:
      return 'Mixed Transportation';
  }
}

export default ItineraryView;
