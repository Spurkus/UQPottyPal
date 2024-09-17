"use client";
import { InputField } from "@/components/InputFields";
import { getAllToilets } from "@/helper/firestoreFunctions";
import { Toilet } from "@/types";
import { useEffect, useState } from "react";
import Link from "next/link";
import ToiletModal from "@/components/toilet-data/ToiletModal";
import { showModal } from "@/helper/helperFunctions";
import { MapContextProvider } from "@/contexts/MapContext";

interface ToiletResultProps {
  toilet: Toilet;
}

const ToiletResult = ({ toilet }: ToiletResultProps) => {
  return (
    <Link
      className="btn flex min-h-24 flex-row items-start justify-between rounded-2xl bg-base-300 p-4 text-start hover:btn-accent"
      href={`/toilets/${toilet.id}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex flex-col space-y-2">
        <h3 className="text-lg">{toilet.name}</h3>
        <p className="text-sm font-normal">{toilet.description}</p>
      </div>
      <div className="flex flex-col space-y-2">
        <p className="text-sm"> {toilet.building}</p>
      </div>
    </Link>
  );
};

const ToiletResults = () => {
  const [createToilet, setCreateToilet] = useState<boolean>(false);
  const [results, setResults] = useState<Toilet[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchToilets = async () => {
      const toilets = await getAllToilets();
      setResults(toilets);
    };

    fetchToilets();
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between space-x-4">
        <InputField
          type="search"
          value={search}
          valuePlaceholder="Search for a toilet"
          valueMaxLength={100}
          noInput={false}
          valueChange={(e) => setSearch(e.target.value)}
          validValue={true}
        />
        <button
          className="btn btn-warning btn-sm min-h-10 px-8"
          onClick={() => showModal("toilet_modal", setCreateToilet)}
        >
          Create New Toilet!
        </button>
      </div>
      <div className="mt-4 space-y-4">
        {results
          .filter((toilet) => toilet.name.toLowerCase().includes(search.toLowerCase()))
          .map((toilet) => (
            <ToiletResult key={toilet.id} toilet={toilet} />
          ))}
      </div>
      <MapContextProvider>
        <ToiletModal open={createToilet} setOpen={setCreateToilet} />
      </MapContextProvider>
    </>
  );
};

export default ToiletResults;
