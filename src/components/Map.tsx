"use client";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import useMapControls from "@/hooks/useMapControls";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

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

    // Create the map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: process.env.NEXT_PUBLIC_MAPBOX_STYLE as string,
      center: [INITIAL_COORDINATES.lng, INITIAL_COORDINATES.lat],
      zoom: INITIAL_COORDINATES.zoom,
    });

    // Add navigation controls
    map.current.on("move", () => {
      setLng(+map!.current!.getCenter().lng.toFixed(5));
      setLat(+map!.current!.getCenter().lat.toFixed(5));
      setZoom(+map!.current!.getZoom().toFixed(2));
    });
  }, [setLng, setLat, setZoom]);

  const ZoomButton = () => {
    const zoomIn = () => moveZoomTo(zoom + 1);
    const zoomOut = () => moveZoomTo(zoom - 1);

    return (
      <div className="absolute right-4 top-4 z-10 flex flex-col space-y-2">
        <button className="btn btn-circle btn-sm" onClick={zoomIn}>
          <span className="text-xl">+</span>
        </button>
        <button className="btn btn-circle btn-sm" onClick={zoomOut}>
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
