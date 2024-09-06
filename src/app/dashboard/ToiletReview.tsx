import { useDashboardToilet } from "@/contexts/DashboardToilet";
import { useMemo, useState, useEffect } from "react";

const ToiletReview = () => {
  const { toilet } = useDashboardToilet();

  // Show the toilet review when the toilet is set and hide it when the toilet is unset
  const [isVisible, setIsVisible] = useState(!!toilet);
  useEffect(() => {
    if (toilet) {
      setIsVisible(true);
    } else {
      // Accounts for the delay in hiding the toilet review
      const timeout = setTimeout(() => setIsVisible(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [toilet]);

  return (
    <div className={`rounded-3xl bg-base-300 transition-all duration-500 ${toilet ? "w-[30%] p-5" : "w-0 opacity-0"}`}>
      <div className={`flex flex-col ${!isVisible && "hidden"} `}>
        <h1 className="text-2xl font-bold">Toilet</h1>
      </div>
    </div>
  );
};

export default ToiletReview;
