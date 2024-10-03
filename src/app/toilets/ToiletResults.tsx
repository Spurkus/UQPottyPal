"use client";
import { InputField } from "@/components/InputFields";
import { getAllToilets } from "@/helper/firestoreFunctions";
import { Toilet } from "@/types";
import { useEffect, useState } from "react";
import Link from "next/link";
import ToiletModal from "@/components/toilet-data/ToiletModal";
import { showModal } from "@/helper/helperFunctions";
import { MapContextProvider } from "@/contexts/MapContext";
import { TextEditorContextProvider } from "@/contexts/TextEditorContext";

interface ToiletResultProps {
  toilet: Toilet;
}

/**
 * ToiletResult component renders a clickable button that links to a toilet's page.
 *
 * @param {ToiletResultProps} props - Contains a toilet object with details such as name, location, and building.
 * @returns {JSX.Element} A button that displays the toilet's information and links to its detailed page.
 */
const ToiletResult = ({ toilet }: ToiletResultProps): JSX.Element => {
  return (
    <Link
      className="btn flex min-h-24 flex-row items-start justify-between rounded-2xl bg-base-300 p-4 text-start hover:btn-accent"
      href={`/toilets/${toilet.id}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex flex-col space-y-2">
        <h3 className="text-lg font-bold">{toilet.name}</h3>
        <p className="text-wrap leading-4">
          {toilet.location.latitude}, {toilet.location.longitude}
        </p>
      </div>
      <div className="flex flex-col space-y-2">
        <p className="text-sm">{toilet.building}</p>
      </div>
    </Link>
  );
};

/**
 * ToiletResults component displays a searchable list of toilets and an option to create a new toilet.
 *
 * @returns {JSX.Element} The search input, list of toilets, and a button to create a new toilet.
 */
const ToiletResults = (): JSX.Element => {
  const [createToilet, setCreateToilet] = useState<boolean>(false);
  const [results, setResults] = useState<Toilet[]>([]);
  const [search, setSearch] = useState<string>("");

  /**
   * Fetches the list of toilets when the component mounts.
   * The fetched data is stored in the `results` state.
   */
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
        {/* InputField component to search for a toilet by name */}
        <InputField
          type="search"
          value={search}
          valuePlaceholder="Search for a toilet"
          valueMaxLength={100}
          noInput={false}
          valueChange={(e) => setSearch(e.target.value)}
          validValue={true}
        />
        {/* Button to open the modal for creating a new toilet */}
        <button
          className="btn btn-warning btn-sm min-h-10 px-8"
          onClick={() => showModal("toilet_modal", setCreateToilet)}
        >
          Create New Toilet!
        </button>
      </div>
      <div className="mt-4 space-y-4">
        {/* Filters toilets based on the search input and maps them to ToiletResult components */}
        {results
          .filter((toilet) => toilet.name.toLowerCase().includes(search.toLowerCase()))
          .map((toilet) => (
            <ToiletResult key={toilet.id} toilet={toilet} />
          ))}
      </div>
      {/* Modal for creating a new toilet */}
      <TextEditorContextProvider defaultContent="<p>Default Description</p>">
        <MapContextProvider>
          <ToiletModal open={createToilet} setOpen={setCreateToilet} />
        </MapContextProvider>
      </TextEditorContextProvider>
    </>
  );
};

export default ToiletResults;
