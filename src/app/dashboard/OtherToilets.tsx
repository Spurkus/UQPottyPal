import { useDashboardToilet } from "@/contexts/DashboardToilet";
import { Toilet } from "@/types";

interface OtherToiletProps {
  otherToilet: Toilet;
}

interface OtherToiletsProps {
  toilets: Toilet[];
}

const OtherToilet = ({ otherToilet }: OtherToiletProps) => {
  const { toilet, setToilet } = useDashboardToilet();
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
