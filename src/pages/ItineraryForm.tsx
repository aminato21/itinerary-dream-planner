
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { mockItineraries } from "@/data/mockData";
import { Itinerary } from "@/types";

const ItineraryForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    destinationCity: "",
    destinationCountry: "",
    coverImage: "",
  });
  
  // If we have an ID, load the existing itinerary
  useEffect(() => {
    if (id) {
      const itinerary = mockItineraries.find((i) => i.id === id);
      if (itinerary) {
        setFormData({
          title: itinerary.title,
          description: itinerary.description,
          startDate: itinerary.startDate,
          endDate: itinerary.endDate,
          destinationCity: itinerary.destination.city,
          destinationCountry: itinerary.destination.country,
          coverImage: itinerary.coverImage || "",
        });
      }
    }
  }, [id]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate form
      if (!formData.title || !formData.startDate || !formData.endDate || !formData.destinationCity || !formData.destinationCountry) {
        throw new Error("Please fill in all required fields");
      }
      
      // Validate dates
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (end < start) {
        throw new Error("End date cannot be before start date");
      }
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (id) {
        toast({
          title: "Itinerary updated",
          description: "Your itinerary has been updated successfully",
        });
      } else {
        toast({
          title: "Itinerary created",
          description: "Your new itinerary has been created successfully",
        });
      }
      
      // Navigate back to the dashboard
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          {id ? "Edit Itinerary" : "Create New Itinerary"}
        </h1>
        
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>
                Provide the basic details about your trip.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Trip Title *</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., Summer Vacation in Paris"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Briefly describe your trip..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date *</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Destination</CardTitle>
              <CardDescription>
                Where are you traveling to?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="destinationCity">City *</Label>
                  <Input
                    id="destinationCity"
                    name="destinationCity"
                    placeholder="e.g., Paris"
                    value={formData.destinationCity}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destinationCountry">Country *</Label>
                  <Input
                    id="destinationCountry"
                    name="destinationCountry"
                    placeholder="e.g., France"
                    value={formData.destinationCountry}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover Image URL (optional)</Label>
                <Input
                  id="coverImage"
                  name="coverImage"
                  placeholder="https://example.com/image.jpg"
                  value={formData.coverImage}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? id
                    ? "Updating..."
                    : "Creating..."
                  : id
                  ? "Update Itinerary"
                  : "Create Itinerary"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </PageContainer>
  );
};

export default ItineraryForm;
