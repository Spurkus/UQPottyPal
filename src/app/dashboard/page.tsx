"use client";
import Map from "@/components/Map";

const Dashboard = () => {
  return (
    <div className="mx-12 flex h-[80vh] space-x-6">
      <div className="flex w-[70%] flex-col rounded-3xl bg-base-300 p-5">
        <Map />
      </div>
      <div className="flex w-[30%] flex-col rounded-3xl bg-base-300 p-5">
        <h1 className="text-2xl font-bold">I love Toilets Slurp Slurp Slurp</h1>
      </div>
    </div>
  );
};

export default Dashboard;
