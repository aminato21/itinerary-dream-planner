
import { Itinerary } from "../types";

export const mockItineraries: Itinerary[] = [
  {
    id: "1",
    title: "Paris Adventure",
    description: "Exploring the City of Lights",
    startDate: "2025-06-10",
    endDate: "2025-06-15",
    userId: "1",
    destination: {
      city: "Paris",
      country: "France",
      coordinates: {
        lat: 48.856614,
        lng: 2.3522219,
      },
    },
    coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000",
    days: [
      {
        id: "day1",
        date: "2025-06-10",
        activities: [
          {
            id: "act1",
            title: "Eiffel Tower Visit",
            description: "Enjoy the iconic views of Paris from the Eiffel Tower.",
            startTime: "10:00",
            endTime: "12:00",
            location: {
              name: "Eiffel Tower",
              address: "Champ de Mars, 5 Avenue Anatole France, 75007 Paris",
              coordinates: {
                lat: 48.8584,
                lng: 2.2945,
              },
            },
            category: "attraction",
          },
          {
            id: "act2",
            title: "Lunch at Le Jules Verne",
            description: "Fine dining experience at the Eiffel Tower.",
            startTime: "12:30",
            endTime: "14:30",
            location: {
              name: "Le Jules Verne",
              address: "Eiffel Tower, 2nd floor, 75007 Paris",
              coordinates: {
                lat: 48.8583,
                lng: 2.2944,
              },
            },
            category: "food",
          },
          {
            id: "act3",
            title: "Louvre Museum",
            description: "Explore one of the world's largest art museums.",
            startTime: "15:30",
            endTime: "18:30",
            location: {
              name: "Louvre Museum",
              address: "Rue de Rivoli, 75001 Paris",
              coordinates: {
                lat: 48.8606,
                lng: 2.3376,
              },
            },
            category: "attraction",
          },
        ],
      },
      {
        id: "day2",
        date: "2025-06-11",
        activities: [
          {
            id: "act4",
            title: "Notre-Dame Cathedral",
            description: "Visit the famous medieval Catholic cathedral.",
            startTime: "09:00",
            endTime: "11:00",
            location: {
              name: "Notre-Dame Cathedral",
              address: "6 Parvis Notre-Dame - Pl. Jean-Paul II, 75004 Paris",
              coordinates: {
                lat: 48.8530,
                lng: 2.3499,
              },
            },
            category: "attraction",
          },
          {
            id: "act5",
            title: "Lunch at Saint Regis",
            description: "Traditional French cuisine in a charming setting.",
            startTime: "12:00",
            endTime: "13:30",
            location: {
              name: "Saint Regis",
              address: "6 Rue Jean du Bellay, 75004 Paris",
              coordinates: {
                lat: 48.8531,
                lng: 2.3509,
              },
            },
            category: "food",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Tokyo Exploration",
    description: "Discover the wonders of Japan's capital",
    startDate: "2025-07-05",
    endDate: "2025-07-12",
    userId: "1",
    destination: {
      city: "Tokyo",
      country: "Japan",
      coordinates: {
        lat: 35.6762,
        lng: 139.6503,
      },
    },
    coverImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1000",
    days: [
      {
        id: "day1",
        date: "2025-07-05",
        activities: [
          {
            id: "act1",
            title: "Meiji Shrine",
            description: "Visit this tranquil Shinto shrine set in a forest.",
            startTime: "09:00",
            endTime: "11:00",
            location: {
              name: "Meiji Shrine",
              address: "1-1 Yoyogikamizonocho, Shibuya City, Tokyo",
              coordinates: {
                lat: 35.6763,
                lng: 139.6993,
              },
            },
            category: "attraction",
          },
          {
            id: "act2",
            title: "Lunch at Ichiran Ramen",
            description: "Enjoy the famous tonkotsu ramen in individual booths.",
            startTime: "12:00",
            endTime: "13:30",
            location: {
              name: "Ichiran Ramen Shibuya",
              address: "1-22-7 Jinnan, Shibuya City, Tokyo",
              coordinates: {
                lat: 35.6614,
                lng: 139.7012,
              },
            },
            category: "food",
          },
        ],
      },
    ],
  },
];

export const mockWeather = {
  "2025-06-10": {
    date: "2025-06-10",
    temperature: 23,
    description: "Sunny",
    icon: "01d",
    humidity: 60,
    windSpeed: 10,
  },
  "2025-06-11": {
    date: "2025-06-11",
    temperature: 21,
    description: "Partly Cloudy",
    icon: "02d",
    humidity: 65,
    windSpeed: 12,
  },
  "2025-06-12": {
    date: "2025-06-12",
    temperature: 22,
    description: "Cloudy",
    icon: "03d",
    humidity: 70,
    windSpeed: 8,
  },
  "2025-07-05": {
    date: "2025-07-05",
    temperature: 28,
    description: "Hot and Humid",
    icon: "01d",
    humidity: 80,
    windSpeed: 5,
  }
};
