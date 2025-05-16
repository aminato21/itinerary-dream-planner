
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageContainer from "@/components/layout/PageContainer";
import { mockItineraries } from "@/data/mockData";
import ProgressiveItineraryForm from "@/components/itinerary/ProgressiveItineraryForm";
import { ArrowLeft } from "lucide-react";

const ItineraryForm = () => {
  const { id } = useParams<{ id: string }>();
  const [initialData, setInitialData] = useState(null);
  
  // If we have an ID, load the existing itinerary
  useEffect(() => {
    if (id) {
      const itinerary = mockItineraries.find((i) => i.id === id);
      if (itinerary) {
        setInitialData({
          title: itinerary.title,
          description: itinerary.description,
          startDate: itinerary.startDate,
          endDate: itinerary.endDate,
          destinationCity: itinerary.destination.city,
          destinationCountry: itinerary.destination.country,
          coverImage: itinerary.coverImage || "",
          budget: "",  // Default values for new fields
          budgetCurrency: "USD",
          preferredTransport: "all",
        });
      }
    }
  }, [id]);

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
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none" />
      
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="relative z-10"
      >
        <motion.div variants={item} className="mb-6">
          <Link to="/" className="inline-flex items-center text-white mb-4 hover:text-primary transition-colors backdrop-blur-sm px-3 py-1 rounded-full bg-white/10">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-4xl font-bold text-center text-gradient">
            {id ? "Edit Itinerary" : "Create New Itinerary"}
          </h1>
          <p className="text-center text-white/80 mt-2 max-w-lg mx-auto">
            Fill in the details below to {id ? "update your" : "create your personalized"} travel itinerary
          </p>
        </motion.div>
        
        <motion.div variants={item}>
          <ProgressiveItineraryForm initialData={initialData} itineraryId={id} />
        </motion.div>
      </motion.div>
    </PageContainer>
  );
};

export default ItineraryForm;
