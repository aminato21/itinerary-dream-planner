
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, MapPin, Calendar, Image, PenLine, Wallet, Bus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Itinerary } from "@/types";
import { mockItineraries } from "@/data/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type FormData = {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  destinationCity: string;
  destinationCountry: string;
  coverImage: string;
  budget: string;
  budgetCurrency: string;
  preferredTransport: string;
};

type ProgressiveItineraryFormProps = {
  initialData?: FormData;
  itineraryId?: string;
};

const ProgressiveItineraryForm = ({ initialData, itineraryId }: ProgressiveItineraryFormProps) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [direction, setDirection] = useState(0);
  
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    destinationCity: "",
    destinationCountry: "",
    coverImage: "",
    budget: "",
    budgetCurrency: "USD",
    preferredTransport: "all",
  });
  
  // If we have initial data, set it
  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData,
        budget: initialData.budget || "",
        budgetCurrency: initialData.budgetCurrency || "USD",
        preferredTransport: initialData.preferredTransport || "all",
      }));
    }
  }, [initialData]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const steps = [
    {
      title: "Let's name your adventure",
      description: "Give your trip a title and brief description",
      icon: <PenLine className="h-5 w-5 text-primary" />,
      fields: (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Trip Title *</Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g., Summer Vacation in Paris"
              value={formData.title}
              onChange={handleChange}
              className="text-lg"
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
              rows={4}
              className="resize-none"
            />
          </div>
        </div>
      ),
    },
    {
      title: "When are you going?",
      description: "Select your travel dates",
      icon: <Calendar className="h-5 w-5 text-primary" />,
      fields: (
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Choose your trip start and end dates
          </p>
          
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
                className="text-base"
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
                className="text-base"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Where are you going?",
      description: "Enter your destination details",
      icon: <MapPin className="h-5 w-5 text-primary" />,
      fields: (
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Enter the city and country you'll be visiting
          </p>
          
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
                className="text-base"
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
                className="text-base"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "What's your budget?",
      description: "Set your trip budget and preferences",
      icon: <Wallet className="h-5 w-5 text-primary" />,
      fields: (
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm text-muted-foreground">
            Enter your total budget and preferred transportation options
          </p>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-1">
                <Label htmlFor="budget">Trip Budget *</Label>
                <Input
                  id="budget"
                  name="budget"
                  type="number"
                  min="0"
                  placeholder="e.g., 2000"
                  value={formData.budget}
                  onChange={handleChange}
                  className="text-base"
                  required
                />
              </div>
              <div className="space-y-2 col-span-1">
                <Label htmlFor="budgetCurrency">Currency</Label>
                <Select 
                  value={formData.budgetCurrency}
                  onValueChange={(value) => handleSelectChange('budgetCurrency', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="JPY">JPY (¥)</SelectItem>
                    <SelectItem value="CAD">CAD ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="preferredTransport">Preferred Transportation</Label>
              <Select 
                value={formData.preferredTransport}
                onValueChange={(value) => handleSelectChange('preferredTransport', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select preferred transport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Options</SelectItem>
                  <SelectItem value="public">Public Transport</SelectItem>
                  <SelectItem value="car">Car/Taxi</SelectItem>
                  <SelectItem value="walking">Walking</SelectItem>
                  <SelectItem value="budget">Budget-friendly Options</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                This will help suggest appropriate transportation between attractions
              </p>
            </div>
          </div>
        </motion.div>
      ),
    },
    {
      title: "Give it a look",
      description: "Add a cover image for your trip (optional)",
      icon: <Image className="h-5 w-5 text-primary" />,
      fields: (
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Add an image URL to personalize your itinerary
          </p>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image URL (optional)</Label>
              <Input
                id="coverImage"
                name="coverImage"
                placeholder="https://example.com/image.jpg"
                value={formData.coverImage}
                onChange={handleChange}
                className="text-base"
              />
            </div>
            
            {formData.coverImage && (
              <div className="mt-4 rounded-lg overflow-hidden aspect-video bg-muted">
                <img
                  src={formData.coverImage}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1000";
                    toast({
                      title: "Image not found",
                      description: "Using a default image instead",
                      variant: "destructive",
                    });
                  }}
                />
              </div>
            )}
          </div>
        </div>
      ),
    },
  ];
  
  const nextStep = () => {
    // Validate current step
    if (currentStep === 0 && !formData.title) {
      toast({
        title: "Missing information",
        description: "Please provide a title for your trip",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep === 1) {
      // Validate dates
      if (!formData.startDate || !formData.endDate) {
        toast({
          title: "Missing information",
          description: "Please select both start and end dates",
          variant: "destructive",
        });
        return;
      }
      
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (end < start) {
        toast({
          title: "Invalid dates",
          description: "End date cannot be before start date",
          variant: "destructive",
        });
        return;
      }
    }
    
    if (currentStep === 2 && (!formData.destinationCity || !formData.destinationCountry)) {
      toast({
        title: "Missing information",
        description: "Please provide both city and country",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep === 3 && !formData.budget) {
      toast({
        title: "Missing information",
        description: "Please provide a budget for your trip",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Validate form
      if (!formData.title || !formData.startDate || !formData.endDate || !formData.destinationCity || !formData.destinationCountry || !formData.budget) {
        throw new Error("Please fill in all required fields");
      }
      
      // Validate dates again as a safeguard
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (end < start) {
        throw new Error("End date cannot be before start date");
      }
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (itineraryId) {
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
  
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;
  
  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 200 : -200,
        opacity: 0,
      };
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? 200 : -200,
        opacity: 0,
      };
    },
  };
  
  const currentStep_data = steps[currentStep];
  
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <div className="flex justify-center items-center space-x-2">
          {currentStep_data.icon}
          <h2 className="text-2xl font-bold">{currentStep_data.title}</h2>
        </div>
        <p className="text-muted-foreground">{currentStep_data.description}</p>
      </div>

      <div className="space-y-2">
        <Progress value={progressPercentage} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Step {currentStep + 1} of {steps.length}</span>
          <span>{Math.round(progressPercentage)}% complete</span>
        </div>
      </div>

      <Card className="border-none shadow-lg glass-card backdrop-blur-md">
        <CardContent className="pt-6">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              {currentStep_data.fields}
            </motion.div>
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between pt-4 pb-6 border-t">
          <Button
            variant="outline"
            onClick={() => (currentStep === 0 ? navigate(-1) : prevStep())}
            disabled={isSubmitting}
            className="backdrop-blur-sm bg-white/10 border-white/20 hover:bg-white/20"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            {currentStep === 0 ? "Cancel" : "Previous"}
          </Button>
          <Button 
            onClick={nextStep} 
            disabled={isSubmitting}
            className="backdrop-blur-sm bg-primary/80 hover:bg-primary shadow-md"
          >
            {currentStep < steps.length - 1 ? (
              <>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            ) : isSubmitting ? (
              "Saving..."
            ) : itineraryId ? (
              "Update Itinerary"
            ) : (
              "Create Itinerary"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProgressiveItineraryForm;
