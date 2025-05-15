
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CalendarCheck, Plus, Search } from "lucide-react";
import { mockItineraries } from "@/data/mockData";
import { motion } from "framer-motion";

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
        className="flex flex-col space-y-8"
      >
        <motion.div variants={item} className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {user?.name}!</h1>
          <p className="text-muted-foreground">
            Manage your travel plans and create new adventures.
          </p>
        </motion.div>
        
        <motion.div variants={item} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="glass-card overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Itineraries</CardTitle>
              <CalendarCheck className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockItineraries.length}</div>
            </CardContent>
          </Card>
          <Card className="glass-card overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Trips</CardTitle>
              <CalendarCheck className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingTrips.length}</div>
            </CardContent>
          </Card>
          <Card className="glass-card overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Trips In Progress</CardTitle>
              <CalendarCheck className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tripsInProgress.length}</div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={item} className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Your Itineraries</h2>
            <Link to="/create-itinerary">
              <Button className="bg-primary/90 hover:bg-primary">
                <Plus className="mr-2 h-4 w-4" />
                Create New
              </Button>
            </Link>
          </div>
          
          <div className="flex w-full max-w-sm items-center space-x-2 mb-4 relative">
            <Search className="absolute left-3 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search itineraries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass border-white/30"
            />
          </div>
          
          <motion.div 
            variants={container}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredItineraries.length > 0 ? (
              filteredItineraries.map((itinerary) => (
                <motion.div key={itinerary.id} variants={item}>
                  <Link to={`/itinerary/${itinerary.id}`}>
                    <Card className="glass-card overflow-hidden h-full hover:shadow-xl transition-all duration-300 hover:transform hover:scale-[1.02]">
                      <div className="aspect-video w-full relative overflow-hidden">
                        <img
                          src={itinerary.coverImage || "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1000"}
                          alt={itinerary.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl font-bold">{itinerary.title}</CardTitle>
                        <CardDescription className="text-sm font-medium">
                          {itinerary.destination.city}, {itinerary.destination.country}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {itinerary.description}
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <p className="text-xs text-gray-500 flex items-center">
                          <CalendarCheck className="h-3 w-3 mr-1" />
                          {new Date(itinerary.startDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})} - 
                          {new Date(itinerary.endDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
                        </p>
                        <p className="text-xs text-gray-500">
                          {itinerary.days.length} days
                        </p>
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              ))
            ) : (
              <motion.div variants={item} className="col-span-full glass-card rounded-lg text-center py-10">
                <p className="text-muted-foreground">No itineraries found. Create one now!</p>
                <Link to="/create-itinerary" className="mt-4 inline-block">
                  <Button variant="outline" className="glass border-white/30 hover:bg-white/30">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Itinerary
                  </Button>
                </Link>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </PageContainer>
  );
};

export default Dashboard;
