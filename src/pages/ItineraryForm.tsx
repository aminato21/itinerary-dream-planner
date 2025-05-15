
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
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
      >
        <motion.div variants={item} className="mb-6">
          <Link to="/" className="inline-flex items-center text-gray-600 mb-4 hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-3xl font-bold text-center">
            {id ? "Edit Itinerary" : "Create New Itinerary"}
          </h1>
        </motion.div>
        
        <motion.div variants={item}>
          <ProgressiveItineraryForm initialData={initialData} itineraryId={id} />
        </motion.div>
      </motion.div>
    </PageContainer>
  );
};

export default ItineraryForm;
