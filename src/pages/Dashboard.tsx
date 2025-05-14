
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CalendarCheck, Plus } from "lucide-react";
import { mockItineraries } from "@/data/mockData";

const Dashboard = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter itineraries based on search term
  const filteredItineraries = mockItineraries.filter(
    (itinerary) =>
      itinerary.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      itinerary.destination.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      itinerary.destination.country.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate upcoming trips
  const now = new Date();
  const upcomingTrips = mockItineraries.filter(
    (itinerary) => new Date(itinerary.startDate) > now
  );
  
  // Calculate trips in progress
  const tripsInProgress = mockItineraries.filter(
    (itinerary) =>
      new Date(itinerary.startDate) <= now && new Date(itinerary.endDate) >= now
  );
  
  return (
    <PageContainer>
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {user?.name}!</h1>
          <p className="text-muted-foreground">
            Manage your travel plans and create new adventures.
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Itineraries</CardTitle>
              <CalendarCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockItineraries.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Trips</CardTitle>
              <CalendarCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingTrips.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Trips In Progress</CardTitle>
              <CalendarCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tripsInProgress.length}</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Your Itineraries</h2>
            <Link to="/create-itinerary">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create New
              </Button>
            </Link>
          </div>
          
          <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
            <Input
              placeholder="Search itineraries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItineraries.length > 0 ? (
              filteredItineraries.map((itinerary) => (
                <Link to={`/itinerary/${itinerary.id}`} key={itinerary.id}>
                  <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                    <div className="aspect-video w-full relative overflow-hidden">
                      <img
                        src={itinerary.coverImage || "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1000"}
                        alt={itinerary.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{itinerary.title}</CardTitle>
                      <CardDescription>
                        {itinerary.destination.city}, {itinerary.destination.country}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {itinerary.description}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <p className="text-sm text-muted-foreground">
                        {new Date(itinerary.startDate).toLocaleDateString()} - {new Date(itinerary.endDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {itinerary.days.length} days
                      </p>
                    </CardFooter>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">No itineraries found. Create one now!</p>
                <Link to="/create-itinerary" className="mt-4 inline-block">
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Itinerary
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
