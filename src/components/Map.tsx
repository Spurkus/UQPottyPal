"use client";
import { useDashboardToilet } from "@/contexts/DashboardToilet";

const Map = () => {
  const { moveZoomTo, zoom, mapContainer, toilet } = useDashboardToilet();

  const ZoomButton = () => {
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
      className={`relative flex flex-col rounded-3xl bg-base-300 p-5 transition-all duration-500 ${toilet ? "w-[70%]" : "w-full"}`}
    >
      <div ref={mapContainer} className="flex h-full w-full rounded-xl" />
      <ZoomButton />
    </div>
  );
};

export default Map;
