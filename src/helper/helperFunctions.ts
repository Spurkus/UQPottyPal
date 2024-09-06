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
