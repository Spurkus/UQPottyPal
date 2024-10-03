"use client";

import { useMap } from "@/contexts/MapContext";
import { useEffect } from "react";

interface MapProps {
  shrinks?: boolean;
  middle?: boolean;
  location?: {
    lat: number;
    lng: number;
  };
}

/**
 * Map component
 *
 * Renders a map with zoom controls and optional center marker.
 *
 * @param {MapProps} props - The component props
 * @returns {JSX.Element} The rendered Map component
 */
const Map = ({ shrinks, middle, location }: MapProps): JSX.Element => {
  const { moveZoomTo, zoom, mapContainer, toilet, setClickable, moveTo } = useMap();

  // Set map clickability based on shrinks prop
  useEffect(() => setClickable(!!shrinks), [shrinks, setClickable]);

  // Move map to specified location if provided
  useEffect(() => {
    if (location) moveTo(location.lat, location.lng, 17);
  }, [location, moveTo]);

  /**
   * ZoomButton component
   *
   * Renders zoom in and zoom out buttons for the map.
   *
   * @returns {JSX.Element} The rendered ZoomButton component
   */
  const ZoomButton = (): JSX.Element => {
    const zoomIn = () => moveZoomTo(zoom + 1);
    const zoomOut = () => moveZoomTo(zoom - 1);

    return (
      <div className="join join-vertical absolute right-8 top-8 z-10 flex flex-col">
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
    <div
      className={`relative flex flex-col rounded-3xl bg-base-300 p-5 transition-all duration-500 ${shrinks && toilet ? "w-[70%]" : "w-full"}`}
    >
      {/* Center marker */}
      {middle && <div className="absolute right-[50%] top-[50%] z-50 h-2 w-2 rounded-3xl bg-red-600" />}

      {/* Map container */}
      <div ref={mapContainer} className="flex h-full w-full rounded-xl" />

      {/* Zoom controls */}
      <ZoomButton />
    </div>
  );
};

export default Map;
