"use client";
import Map from "@/components/Map";
import ToiletReview from "./ToiletReview";
import { MapContextProvider } from "@/contexts/MapContext";

const Dashboard = () => {
  return (
    <div className="mx-12 flex h-[80vh] space-x-6">
      <MapContextProvider>
        <Map shrinks={true} />
        <ToiletReview />
      </MapContextProvider>
    </div>
  );
};

export default Dashboard;
