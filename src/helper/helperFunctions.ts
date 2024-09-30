import { Toilet, GeoToilet, GeoToilets, Review } from "@/types";
import { GeoPoint } from "firebase/firestore";
import { SetStateAction } from "react";
import confetti from "canvas-confetti";

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

export const showModal = (elementID: string, setShow: React.Dispatch<SetStateAction<boolean>>) => {
  const element = document.getElementById(elementID);
  if (element instanceof HTMLDialogElement) {
    element.showModal();
    setShow(true);
  }
};

export const closeModal = (elementID: string, setShow: React.Dispatch<SetStateAction<boolean>>) => {
  const element = document.getElementById(elementID);
  if (element instanceof HTMLDialogElement) {
    element.close();
    setShow(false);
  }
};

export const triggerConfetti = () => {
  const defaults = {
    zIndex: 10000000,
    spread: 360,
    ticks: 50,
    decay: 0.94,
    startVelocity: 30,
  };

  confetti({
    ...defaults,
    particleCount: 45,
    scalar: 2,
  });

  confetti({
    ...defaults,
    particleCount: 20,
    scalar: 0.75,
  });
};

export const calculateAverageReviewStat = (reviews: Review[], key: keyof Review) => {
  if (!reviews) return 0;
  const average = reviews.reduce((acc, review) => acc + +review[key], 0) / reviews.length;
  return Math.round(average * 2) / 2; // Round to the nearest 0.5
};

export const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const closeDropdown = () => {
  const elem = document.activeElement as HTMLElement;
  elem?.blur();
};

export const getIDFromBuildingName = (buildingName: string) => {
  const match = buildingName.match(/\(([^)]+)\)/);
  return match ? match[1] : null;
};
