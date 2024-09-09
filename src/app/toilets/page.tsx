import ToiletResults from "./ToiletResults";

const Toilets = () => {
  return (
    <div className="flex w-[90%] flex-col self-center 2xl:w-2/3">
      <h1 className="mb-1 text-4xl font-bold">Toilets</h1>
      <ToiletResults />
    </div>
  );
};

export default Toilets;
