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
  id: string;
  toiletID: string;
  username: string;
  comment: string;
  rating: number;
  privacy: number;
  cleanliness: number;
  accessibility: number;
  vibe: number;
  timestamp: number;
};

type Building = {
  name: string;
  latitude: number;
  longitude: number;
};
