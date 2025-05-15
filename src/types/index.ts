
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
  budget?: string;
  budgetCurrency?: string;
  preferredTransport?: string;
  transportationDetails?: TransportationDetails;
};

export type TransportationDetails = {
  totalCost: number;
  dailyCosts: {
    dayId: string;
    cost: number;
    methods: TransportationMethod[];
  }[];
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
  transportationCost?: number;
};

export type Activity = {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: Location;
  category: ActivityCategory;
  transportationMethod?: TransportationMethod;
  cost?: {
    amount: number;
    currency: string;
  };
  details?: string[];
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

export type TransportationMethod =
  'walking' |
  'public_transit' |
  'taxi' |
  'rideshare' |
  'bicycle' |
  'car' |
  'train' |
  'bus' |
  'ferry' |
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
