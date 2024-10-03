"use client";
import Map from "@/components/Map";
import ToiletReview from "./ToiletReview";
import { MapContextProvider } from "@/contexts/MapContext";

/**
 * Dashboard component that provides the layout for the map and toilet review sections.
 * It uses the MapContextProvider to manage state related to the map.
 *
 * @returns {JSX.Element} The rendered dashboard component.
 */
const Dashboard = (): JSX.Element => {
  return (
    <div className="mx-12 flex h-[80vh] space-x-6">
      {/* Provide map-related context to child components */}
      <MapContextProvider>
        {/* Renders the map, which has a shrinking behavior */}
        <Map shrinks={true} />
        {/* Renders the toilet review section */}
        <ToiletReview />
      </MapContextProvider>
    </div>
  );
};

export default Dashboard;
