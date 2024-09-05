"use client";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import useMapControls from "@/hooks/useMapControls";
import { getAllToilets } from "@/helper/firestoreFunctions";
import { convertToiletsToGeoJSON } from "@/helper/helperFunctions";
import { Toilet } from "@/types";

const INITIAL_COORDINATES = { lng: 153.01301, lat: -27.49748, zoom: 16 };

const Map = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng, moveLngTo] = useMapControls(INITIAL_COORDINATES.lng, map.current, "lng");
  const [lat, setLat, moveLatTo] = useMapControls(INITIAL_COORDINATES.lat, map.current, "lat");
  const [zoom, setZoom, moveZoomTo] = useMapControls(INITIAL_COORDINATES.zoom, map.current, "zoom");

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
      const toilets = (await getAllToilets()) as Toilet[];
      console.log(toilets);
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

    return () => map.current!.remove();
  }, [setLng, setLat, setZoom]);

  const ZoomButton = () => {
    const zoomIn = () => moveZoomTo(zoom + 1);
    const zoomOut = () => moveZoomTo(zoom - 1);

    return (
      <div className="join join-vertical absolute right-4 top-4 z-10 flex flex-col">
        <button className="btn join-item no-animation btn-sm px-2" onClick={zoomIn}>
          <span className="text-xl">+</span>
        </button>
        <button className="btn join-item no-animation btn-sm px-2" onClick={zoomOut}>
          <span className="text-xl">-</span>
        </button>
      </div>
    );
  };

  return (
    <div className="relative flex h-full w-full">
      <div ref={mapContainer} className="flex h-full w-full rounded-xl" />
      <ZoomButton />
    </div>
  );
};

export default Map;
