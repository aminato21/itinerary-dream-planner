
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import { mockItineraries } from "@/data/mockData";
import ProgressiveItineraryForm from "@/components/itinerary/ProgressiveItineraryForm";

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
  
  return (
    <PageContainer>
      <h1 className="text-3xl font-bold mb-8 text-center">
        {id ? "Edit Itinerary" : "Create New Itinerary"}
      </h1>
      
      <ProgressiveItineraryForm initialData={initialData} itineraryId={id} />
    </PageContainer>
  );
};

export default ItineraryForm;
