import haldia from "@/assets/property-haldia.jpg";
import kolkata from "@/assets/property-kolkata.jpg";
import durgapur from "@/assets/property-durgapur.jpg";
import midnapore from "@/assets/property-midnapore.jpg";

export type Availability = "vacant" | "full";

export type Property = {
  id: string;
  title: string;
  propertyType: string;
  bhk: string;
  rent: number;
  deposit: number;
  location: string;
  city: string;
  images: string[];
  description: string;
  amenities: string[];
  status: Availability;
  lastUpdated: string;
  stale?: boolean;
  ownerName: string;
  coordinates: {
    x: number;
    y: number;
  };
  furnished: boolean;
  bathrooms: number;
};

const descriptions = {
  apartment:
    "A spacious, naturally lit home in a quiet residential neighbourhood with convenient access to markets, transport and everyday essentials.",

  room:
    "A comfortable, well-maintained space ideal for students and working professionals, close to local transport and daily conveniences.",
};

export const initialProperties: Property[] = [
  {
    id: "green-residency",
    title: "Green Residency",
    propertyType: "Apartment",
    bhk: "2 BHK",
    rent: 8500,
    deposit: 17000,
    location: "City Centre, Haldia",
    city: "Haldia",
    images: [haldia, kolkata, midnapore],
    description: descriptions.apartment,
    amenities: [
      "Parking",
      "Water supply",
      "Electricity",
      "Balcony",
      "Furnished",
    ],
    status: "vacant",
    lastUpdated: "12 minutes ago",
    ownerName: "Anirban Das",
    coordinates: {
      x: 62,
      y: 35,
    },
    furnished: true,
    bathrooms: 2,
  },

  {
    id: "river-view-heights",
    title: "River View Heights",
    propertyType: "Flat",
    bhk: "3 BHK",
    rent: 14500,
    deposit: 29000,
    location: "Riverside, Haldia",
    city: "Haldia",
    images: [kolkata, haldia, durgapur],
    description: descriptions.apartment,
    amenities: [
      "Lift",
      "Parking",
      "Balcony",
      "Power backup",
    ],
    status: "vacant",
    lastUpdated: "8 minutes ago",
    ownerName: "Sutapa Roy",
    coordinates: {
      x: 35,
      y: 56,
    },
    furnished: true,
    bathrooms: 2,
  },

  {
    id: "salt-lake-studio",
    title: "Salt Lake Studio",
    propertyType: "Room",
    bhk: "Studio",
    rent: 11000,
    deposit: 22000,
    location: "Sector II, Salt Lake",
    city: "Kolkata",
    images: [midnapore, kolkata, haldia],
    description: descriptions.room,
    amenities: [
      "Wi-Fi",
      "Water supply",
      "Furnished",
      "Security",
    ],
    status: "vacant",
    lastUpdated: "24 minutes ago",
    ownerName: "Ritwick Sen",
    coordinates: {
      x: 72,
      y: 63,
    },
    furnished: true,
    bathrooms: 1,
  },

  {
    id: "cityscape-apartments",
    title: "Cityscape Apartments",
    propertyType: "Apartment",
    bhk: "2 BHK",
    rent: 18500,
    deposit: 37000,
    location: "New Town, Kolkata",
    city: "Kolkata",
    images: [durgapur, kolkata, haldia],
    description: descriptions.apartment,
    amenities: [
      "Gym",
      "Lift",
      "Parking",
      "Security",
    ],
    status: "full",
    lastUpdated: "2 hours ago",
    ownerName: "Madhurima Ghosh",
    coordinates: {
      x: 51,
      y: 74,
    },
    furnished: false,
    bathrooms: 2,
  },

  {
    id: "midnapore-homestead",
    title: "Midnapore Homestead",
    propertyType: "House",
    bhk: "2 BHK",
    rent: 7200,
    deposit: 14000,
    location: "Vidyasagar Pally",
    city: "Midnapore",
    images: [haldia, midnapore, durgapur],
    description: descriptions.apartment,
    amenities: [
      "Parking",
      "Garden",
      "Water supply",
    ],
    status: "vacant",
    lastUpdated: "2 days ago",
    stale: true,
    ownerName: "Subhasis Pal",
    coordinates: {
      x: 23,
      y: 34,
    },
    furnished: false,
    bathrooms: 1,
  },

  {
    id: "station-road-rooms",
    title: "Station Road Rooms",
    propertyType: "PG",
    bhk: "1 Room",
    rent: 4800,
    deposit: 4800,
    location: "Station Road",
    city: "Midnapore",
    images: [midnapore, kolkata, haldia],
    description: descriptions.room,
    amenities: [
      "Wi-Fi",
      "Electricity",
      "Water supply",
    ],
    status: "full",
    lastUpdated: "1 day ago",
    stale: true,
    ownerName: "Prabir Jana",
    coordinates: {
      x: 42,
      y: 22,
    },
    furnished: true,
    bathrooms: 1,
  },

  {
    id: "steel-city-enclave",
    title: "Steel City Enclave",
    propertyType: "Flat",
    bhk: "2 BHK",
    rent: 9800,
    deposit: 19600,
    location: "Bidhannagar",
    city: "Durgapur",
    images: [durgapur, kolkata, haldia],
    description: descriptions.apartment,
    amenities: [
      "Parking",
      "Lift",
      "Security",
      "Balcony",
    ],
    status: "vacant",
    lastUpdated: "36 minutes ago",
    ownerName: "Amitava Dey",
    coordinates: {
      x: 79,
      y: 28,
    },
    furnished: false,
    bathrooms: 2,
  },

  {
    id: "benachity-corner",
    title: "Benachity Corner",
    propertyType: "Apartment",
    bhk: "1 BHK",
    rent: 6500,
    deposit: 13000,
    location: "Benachity",
    city: "Durgapur",
    images: [kolkata, durgapur, midnapore],
    description: descriptions.apartment,
    amenities: [
      "Water supply",
      "Electricity",
      "Balcony",
    ],
    status: "full",
    lastUpdated: "4 hours ago",
    ownerName: "Koyel Basu",
    coordinates: {
      x: 16,
      y: 68,
    },
    furnished: false,
    bathrooms: 1,
  },
];

export const formatRent = (rent: number) =>
  `₹${rent.toLocaleString("en-IN")}`;