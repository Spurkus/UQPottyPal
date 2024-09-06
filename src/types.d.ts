import { GeoPoint } from "firebase/firestore";

export type Toilet = {
  id: string;
  name: string;
  description: string;
  building: string;
  floor: string;
  location: GeoPoint;
};

export type GeoToilet = {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: {
    id: string;
    name: string;
    description: string;
    building: string;
    floor: string;
  };
};

export type GeoToilets = {
  type: "FeatureCollection";
  features: GeoToilet[];
};

export type Review = {
  userID: string;
  toiletID: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  privacy: number;
  cleanliness: number;
  accessibility: number;
  vibe: number;
  timestamp: number;
};
