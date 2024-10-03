"use client";
import { useState, useEffect, useRef, createContext, useContext, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import useMapControls from "@/hooks/useMapControls";
import { getAllToilets } from "@/helper/firestoreFunctions";
import { convertNumberArrayToGeoPoint, convertToiletsToGeoJSON } from "@/helper/helperFunctions";
import { Toilet } from "@/types";

const INITIAL_COORDINATES = { lng: 153.01301, lat: -27.49748, zoom: 16 };

export interface MapType {
  mapContainer: React.MutableRefObject<HTMLDivElement | null>;
  map: React.MutableRefObject<mapboxgl.Map | null>;
  lng: number;
  setLng: React.Dispatch<React.SetStateAction<number>>;
  lat: number;
  setLat: React.Dispatch<React.SetStateAction<number>>;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  moveZoomTo: (newZoom: number) => void;
  moveTo: (lat: number, lng: number, zoom?: number) => void;
  toilet: Toilet | null;
  setToilet: React.Dispatch<React.SetStateAction<Toilet | null>>;
  clickable: boolean;
  setClickable: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Map = createContext<MapType | null>(null);

/** Map context provider
 * Provides the map context to its children components.
 * @param {React.ReactNode} children - The children components
 * @returns {JSX.Element} The rendered MapContextProvider component
 */
export const MapContextProvider = ({ children }: { children: React.ReactNode }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useMapControls(INITIAL_COORDINATES.lng, map.current, "lng");
  const [lat, setLat] = useMapControls(INITIAL_COORDINATES.lat, map.current, "lat");
  const [zoom, setZoom, moveZoomTo] = useMapControls(INITIAL_COORDINATES.zoom, map.current, "zoom");
  const [toilet, setToilet] = useState<Toilet | null>(null);
  const [clickable, setClickable] = useState<boolean>(true);

  const moveTo = useCallback((lat: number, lng: number, zoom?: number) => {
    if (!map.current) return;
    if (zoom) map.current.easeTo({ center: [lng, lat], zoom });
    else map.current.easeTo({ center: [lng, lat] });
  }, []);

  // Initialize the map
  useEffect(() => {
    if (!mapContainer.current) return; // Initialize the map only once

    // Set the access token
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

    // Create the map
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: process.env.NEXT_PUBLIC_MAPBOX_STYLE as string,
      center: [INITIAL_COORDINATES.lng, INITIAL_COORDINATES.lat],
      zoom: INITIAL_COORDINATES.zoom,
      minZoom: 15,
      maxZoom: 18,
      maxBounds: [
        INITIAL_COORDINATES.lng - 0.01,
        INITIAL_COORDINATES.lat - 0.01,
        INITIAL_COORDINATES.lng + 0.01,
        INITIAL_COORDINATES.lat + 0.01,
      ],
    });

    // Add navigation controls
    map.current.on("move", () => {
      setLng(+map!.current!.getCenter().lng.toFixed(5));
      setLat(+map!.current!.getCenter().lat.toFixed(5));
      setZoom(+map!.current!.getZoom().toFixed(2));
    });

    // Add toilet markers
    map.current.on("load", async () => {
      const toilets = await getAllToilets();
      map.current!.addSource("toilets", {
        type: "geojson",
        data: convertToiletsToGeoJSON(toilets),
      });

      map.current!.addLayer({
        id: "toilets-layer",
        type: "symbol",
        source: "toilets",
        layout: {
          "icon-image": "toilet",
          "icon-size": 0.1,
        },
      });
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.current.on("mouseenter", "toilets-layer", () => {
      map.current!.getCanvas().style.cursor = "pointer";
    });

    // Change it back to a pointer when it leaves.
    map.current.on("mouseleave", "toilets-layer", () => {
      map.current!.getCanvas().style.cursor = "";
    });

    // Click toilet marker to view details
    map.current.on("click", "toilets-layer", (event) => {
      if (!clickable) return;
      const feature = event.features![0];
      const coordinates = (feature.geometry as GeoJSON.Point).coordinates;
      const properties = feature.properties;

      // Set the toilet details
      const newToilet = { location: convertNumberArrayToGeoPoint(coordinates), ...properties } as Toilet;
      setToilet((prev) => (prev?.id === newToilet.id ? null : newToilet));
    });

    return () => map.current!.remove();
  }, [setLng, setLat, setZoom, clickable]);

  useEffect(() => {
    if (!toilet) return;
    const offset = toilet ? 0.00065 : 0;
    moveTo(toilet.location.latitude, toilet.location.longitude + offset, 18);
  }, [toilet, moveTo, moveZoomTo]);

  return (
    <Map.Provider
      value={{
        mapContainer,
        map,
        lng,
        setLng,
        lat,
        setLat,
        zoom,
        setZoom,
        moveZoomTo,
        moveTo,
        toilet,
        setToilet,
        clickable,
        setClickable,
      }}
    >
      {children}
    </Map.Provider>
  );
};

/** useMap hook
 *
 * A custom hook to use the map context
 *
 * @returns {MapType} The map context
 * @throws {Error} If the hook is not used within a MapContextProvider
 */
export const useMap = () => {
  const context = useContext(Map);
  if (!context) throw new Error("useMap must be used within a MapContextProvider");
  return context;
};
