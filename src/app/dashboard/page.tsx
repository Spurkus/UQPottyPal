"use client";
import Map from "@/components/Map";
import { DashboardToiletContextProvider } from "@/contexts/DashboardToilet";
import ToiletReview from "./ToiletReview";

const Dashboard = () => {
  return (
    <div className="mx-12 flex h-[80vh] space-x-6">
      <DashboardToiletContextProvider>
        <Map />
        <ToiletReview />
      </DashboardToiletContextProvider>
    </div>
  );
};

export default Dashboard;
