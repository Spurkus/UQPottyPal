import { useDashboardToilet } from "@/contexts/DashboardToilet";
import { capitaliseFirstLetter } from "@/helper/helperFunctions";
import { Toilet } from "@/types";
import { useState, useEffect } from "react";

type MenuProps = {
  menu: string;
  setMenu: React.Dispatch<React.SetStateAction<string>>;
  visible: boolean;
};

type OverviewProps = {
  toiletInfo: Toilet | null;
};

const MenuButton = ({
  menu,
  setMenu,
  name,
}: {
  menu: string;
  setMenu: React.Dispatch<React.SetStateAction<string>>;
  name: string;
}) => {
  return (
    <div className="w-full">
      <input
        className="btn join-item w-full"
        type="radio"
        name="options"
        aria-label={capitaliseFirstLetter(name)}
        onClick={() => setMenu(name)}
        checked={menu === name}
      />
    </div>
  );
};

const Menu = ({ menu, setMenu, visible }: MenuProps) => {
  const menuItems = ["overview", "reviews", "floors"];
  return (
    <div className={`join mb-3 w-full justify-center ${!visible && "hidden"}`}>
      {menuItems.map((item) => (
        <MenuButton key={item} menu={menu} setMenu={setMenu} name={item} />
      ))}
    </div>
  );
};

const Overview = ({ toiletInfo }: OverviewProps) => {
  return (
    <>
      <h1 className="truncate text-wrap text-3xl font-bold">{toiletInfo?.name}</h1>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col leading-3">
          <h3 className="text-lg font-bold">Building</h3>
          <p>{toiletInfo?.building}</p>
        </div>
        <div className="flex flex-col leading-3">
          <h3 className="text-lg font-bold">Floor</h3>
          <p className="text-right">{toiletInfo?.floor}</p>
        </div>
      </div>
      <h4 className="mt-3 text-xl font-bold leading-5">Description</h4>
      <p className="text-wrap leading-4">{toiletInfo?.description}</p>
      <h2 className="mt-3 text-2xl font-bold">Average Statistics</h2>
      <h3 className="mb-0.5 mt-1.5 text-lg font-bold">Overall Rating</h3>
      <div className="btn-disabled rating rating-md">
        <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
        <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
        <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
        <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" defaultChecked />
        <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
      </div>
      <h3 className="mb-0.5 mt-1.5 text-lg font-bold">Privacy</h3>
      <progress className="progress progress-secondary" value="40" max="100" />
      <h3 className="mb-0.5 mt-1.5 text-lg font-bold">Cleanliness</h3>
      <progress className="progress progress-accent" value="80" max="100" />
      <h3 className="mb-0.5 mt-1.5 text-lg font-bold">Accessibility</h3>
      <progress className="progress progress-success" value="60" max="100" />
      <h3 className="mb-0.5 mt-1.5 text-lg font-bold">Vibe</h3>
      <progress className="progress progress-info" value="20" max="100" />
    </>
  );
};

const Review = () => {
  return (
    <div className="collapse rounded-3xl bg-base-300">
      <input type="checkbox" />
      <div className="collapse-title p-5">
        <div className="flex flex-row justify-between">
          <span className="font-semibold text-gray-500">MockUser</span>
          <div className="btn-disabled rating rating-sm mb-1 self-end">
            <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" defaultChecked />
            <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
          </div>
        </div>
        <p className="text-wrap">
          This is a review of the toilet. It was a great experience. Although it was incredibly smelly but that is to be
          expected for a public toilet. The cleanliness was top-notch. The accessibility was great. The vibe was a bit
          off but oh well.
        </p>
      </div>
      <div className="collapse-content px-5">
        <h4 className="font-bold leading-3">Privacy</h4>
        <progress className="progress progress-secondary" value="40" max="100" />
        <h4 className="mt-1.5 font-bold leading-3">Cleanliness</h4>
        <progress className="progress progress-accent" value="80" max="100" />
        <h4 className="mt-1.5 font-bold leading-3">Accessibility</h4>
        <progress className="progress progress-success" value="60" max="100" />
        <h3 className="mt-1.5 font-bold leading-3">Vibe</h3>
        <progress className="progress progress-info" value="20" max="100" />
      </div>
    </div>
  );
};

const Reviews = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <Review key={index} />
      ))}
    </>
  );
};

const ToiletReview = () => {
  const { toilet } = useDashboardToilet();
  const [toiletInfo, setToiletInfo] = useState(toilet);
  const [menu, setMenu] = useState("overview");
  const [menuVisibility, setMenuVisibility] = useState(!!toilet);

  // Show the toilet review when the toilet is set and hide it when the toilet is unset
  useEffect(() => {
    if (toilet) {
      const menuVisibilityTimeout = setTimeout(() => setMenuVisibility(true), 150);
      const timeout = setTimeout(() => {
        setToiletInfo(toilet);
        setMenu("overview");
      }, 175);
      return () => {
        clearTimeout(timeout);
        clearTimeout(menuVisibilityTimeout);
      };
    } else {
      // Accounts for the delay in hiding the toilet review
      const menuVisibilityTimeout = setTimeout(() => setMenuVisibility(false), 150);
      const timeout = setTimeout(() => {
        setToiletInfo(null);
        setMenu("overview");
      }, 250);
      return () => {
        clearTimeout(timeout);
        clearTimeout(menuVisibilityTimeout);
      };
    }
  }, [toilet]);

  return (
    <div
      className={`flex max-h-[80vh] flex-col space-y-4 transition-all duration-500 ${toilet ? "w-[30%]" : "w-0 opacity-0"}`}
    >
      <div className={`w-full overflow-y-auto rounded-3xl bg-base-300 p-5 ${menu === "overview" && "h-full"}`}>
        <div className={`flex flex-col ${!toiletInfo && "hidden"} `}>
          <Menu menu={menu} setMenu={setMenu} visible={menuVisibility} />
          {menu === "overview" && <Overview toiletInfo={toiletInfo} />}
          {menu === "reviews" && <h1 className="truncate text-wrap text-3xl font-bold">{toiletInfo?.name} Reviews</h1>}
        </div>
      </div>
      <div className={`flex-1 space-y-4 overflow-y-auto ${menu === "overview" && "hidden"}`}>
        {menu === "reviews" && <Reviews />}
      </div>
    </div>
  );
};

export default ToiletReview;
