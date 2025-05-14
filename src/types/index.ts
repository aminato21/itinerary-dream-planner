
// User type
export type User = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
};

// Itinerary types
export type Itinerary = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  days: Day[];
  userId: string;
  destination: Destination;
  coverImage?: string;
};

export type Destination = {
  city: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
};

export type Day = {
  id: string;
  date: string;
  activities: Activity[];
};

export type Activity = {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: Location;
  category: ActivityCategory;
};

export type Location = {
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
};

export type ActivityCategory = 
  'food' | 
  'attraction' | 
  'accommodation' | 
  'transportation' | 
  'shopping' | 
  'event' | 
  'other';

// Weather types
export type Weather = {
  date: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
};
