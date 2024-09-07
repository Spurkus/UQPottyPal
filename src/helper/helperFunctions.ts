import { Toilet, GeoToilet, GeoToilets } from "@/types";
import { GeoPoint } from "firebase/firestore";

export const convertToiletsToGeoJSON = (toilets: Toilet[]): GeoToilets => {
  const features = toilets.map((toilet) => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [toilet.location.longitude, toilet.location.latitude],
      },
      properties: {
        id: toilet.id,
        name: toilet.name,
        description: toilet.description,
        building: toilet.building,
        floor: toilet.floor,
      },
    } as GeoToilet;
  });

  return {
    type: "FeatureCollection",
    features,
  };
};

export const convertNumberArrayToGeoPoint = (coordinates: number[]): GeoPoint => {
  return new GeoPoint(coordinates[1], coordinates[0]);
};

export const capitaliseFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
