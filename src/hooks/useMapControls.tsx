import { useState, useCallback } from "react";

type MapControl = "lng" | "lat" | "zoom";
const useMapControls = (
  initialState: number,
  map: mapboxgl.Map | null,
  control: MapControl,
): [number, React.Dispatch<React.SetStateAction<number>>, (value: number) => void] => {
  const [state, setState] = useState<number>(initialState);

  const moveTo = useCallback(
    (value: number) => {
      if (!map) return;
      switch (control) {
        case "lng":
          map.easeTo({ center: [value, map.getCenter().lat] });
          break;
        case "lat":
          map.easeTo({ center: [map.getCenter().lng, value] });
          break;
        case "zoom":
          map.easeTo({ zoom: value });
          break;
      }
      setState(value);
    },
    [map, control, setState],
  );

  return [state, setState, moveTo];
};

export default useMapControls;
