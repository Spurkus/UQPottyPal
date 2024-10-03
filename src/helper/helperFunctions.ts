import { Toilet, GeoToilet, GeoToilets, Review } from "@/types";
import { GeoPoint } from "firebase/firestore";
import { SetStateAction } from "react";
import confetti from "canvas-confetti";

/**
 * Converts an array of Toilet objects into GeoJSON format.
 * @param toilets - An array of Toilet objects to be converted.
 * @returns A GeoToilets object in GeoJSON format.
 */
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

/**
 * Converts an array of numbers into a Firebase GeoPoint object.
 * @param coordinates - An array of numbers representing [longitude, latitude].
 * @returns A GeoPoint object.
 */
export const convertNumberArrayToGeoPoint = (coordinates: number[]): GeoPoint => {
  return new GeoPoint(coordinates[1], coordinates[0]);
};

/**
 * Capitalizes the first letter of a string.
 * @param string - The string to capitalize.
 * @returns A new string with the first letter capitalized.
 */
export const capitaliseFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Opens a modal dialog and updates the state to show the modal.
 * @param elementID - The ID of the HTML element representing the modal.
 * @param setShow - A React state setter function to update the modal visibility.
 */
export const showModal = (elementID: string, setShow: React.Dispatch<SetStateAction<boolean>>) => {
  const element = document.getElementById(elementID);
  if (element instanceof HTMLDialogElement) {
    element.showModal();
    setShow(true);
  }
};

/**
 * Closes a modal dialog and updates the state to hide the modal.
 * @param elementID - The ID of the HTML element representing the modal.
 * @param setShow - A React state setter function to update the modal visibility.
 */
export const closeModal = (elementID: string, setShow: React.Dispatch<SetStateAction<boolean>>) => {
  const element = document.getElementById(elementID);
  if (element instanceof HTMLDialogElement) {
    element.close();
    setShow(false);
  }
};

/**
 * Triggers a confetti animation on the screen with default settings.
 */
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

/**
 * Calculates the average value of a specific key from an array of reviews.
 * Rounds the result to the nearest 0.5.
 * @param reviews - An array of Review objects.
 * @param key - The key to calculate the average for.
 * @returns The average value, rounded to the nearest 0.5.
 */
export const calculateAverageReviewStat = (reviews: Review[], key: keyof Review) => {
  if (!reviews) return 0;
  const average = reviews.reduce((acc, review) => acc + +review[key], 0) / reviews.length;
  return Math.round(average * 2) / 2; // Round to the nearest 0.5
};

/**
 * Converts a file to a base64-encoded string.
 * @param file - The file to convert.
 * @returns A promise that resolves to the base64 string representation of the file.
 */
export const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

/**
 * Closes the currently active dropdown by blurring the focused element.
 */
export const closeDropdown = () => {
  const elem = document.activeElement as HTMLElement;
  elem?.blur();
};

/**
 * Extracts the building ID from a building name formatted as "Name (ID)".
 * @param buildingName - The building name string containing the ID in parentheses.
 * @returns The extracted building ID, or null if no ID is found.
 */
export const getIDFromBuildingName = (buildingName: string) => {
  const match = buildingName.match(/\(([^)]+)\)/);
  return match ? match[1] : null;
};
