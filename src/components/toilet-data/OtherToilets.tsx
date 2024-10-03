import { useMap } from "@/contexts/MapContext";
import { Toilet } from "@/types";

interface OtherToiletProps {
  otherToilet: Toilet;
}

interface OtherToiletsProps {
  toilets: Toilet[];
}

/**
 * OtherToilet component displays a button for selecting a different toilet.
 *
 * @param {OtherToiletProps} props - Contains the toilet object for comparison.
 * @returns {JSX.Element} A button that displays the toilet's name and floor.
 */
const OtherToilet = ({ otherToilet }: OtherToiletProps) => {
  const { toilet, setToilet } = useMap();
  const sameToilet = toilet?.id === otherToilet.id;
  const handleClick = () => {
    if (sameToilet) return;
    setToilet(otherToilet);
  };
  return (
    <button
      className={`btn flex w-full justify-between rounded-2xl bg-base-300 shadow-none hover:btn-accent ${sameToilet && "btn-disabled"}`}
      onClick={handleClick}
    >
      <h4 className="text-lg font-bold">{otherToilet.name.split(",")[1].slice(1)}</h4>
      <p className="font-bold">Floor {otherToilet.floor}</p>
    </button>
  );
};

/**
 * OtherToilets component displays a list of buttons for selecting different toilets in the building.
 * The buttons are sorted by floor number.
 * @param {OtherToiletsProps} props - Contains a list of toilets in the same building.
 * @returns {JSX.Element} A list of buttons that display the toilet's name and floor.
 * */
const OtherToilets = ({ toilets }: OtherToiletsProps) => {
  return (
    <>
      {toilets
        .sort((a, b) => a.floor.localeCompare(b.floor))
        .map((toilet) => (
          <OtherToilet key={toilet.id} otherToilet={toilet} />
        ))}
    </>
  );
};

export default OtherToilets;
