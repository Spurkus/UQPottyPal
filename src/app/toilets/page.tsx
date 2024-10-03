import ToiletResults from "./ToiletResults";

/**
 * Toilets component renders the main layout for the toilets page, including a header and a list of toilets.
 *
 * @returns {JSX.Element} The main container with a title and the ToiletResults component.
 */
const Toilets = (): JSX.Element => {
  return (
    <div className="flex w-[90%] flex-col self-center 2xl:w-2/3">
      {/* Page title */}
      <h1 className="mb-1 text-4xl font-bold">Toilets</h1>

      {/* Component that renders the searchable list of toilets */}
      <ToiletResults />
    </div>
  );
};

export default Toilets;
