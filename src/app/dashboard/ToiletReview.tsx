import { useDashboardToilet } from "@/contexts/DashboardToilet";
import { capitaliseFirstLetter, showModal } from "@/helper/helperFunctions";
import { Toilet } from "@/types";
import { useState, useEffect } from "react";
import ReviewModal from "./ReviewModal";
import Reviews from "./display-review/Reviews";

interface MenuProps {
  menu: string;
  setMenu: React.Dispatch<React.SetStateAction<string>>;
  visible: boolean;
}

interface OverviewProps {
  toiletInfo: Toilet | null;
}

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
        className="btn btn-outline join-item w-full"
        type="radio"
        name="options"
        aria-label={capitaliseFirstLetter(name)}
        onClick={() => setMenu(name)}
        onChange={() => {}}
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

const ToiletReview = () => {
  // Toilet state
  const { toilet } = useDashboardToilet();
  const [toiletInfo, setToiletInfo] = useState(toilet);

  // Menu state
  const [menu, setMenu] = useState("overview");
  const [menuVisibility, setMenuVisibility] = useState(!!toilet);

  // Review Modal state
  const [showReviewModal, setShowReviewModal] = useState(false);

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
          {menu === "reviews" && (
            <>
              <h1 className="mb-2 truncate text-wrap text-3xl font-bold">{toiletInfo?.name} Reviews</h1>
              <button className="btn btn-outline btn-sm" onClick={() => showModal("review_modal", setShowReviewModal)}>
                Add Review
              </button>
            </>
          )}
        </div>
      </div>
      <div className={`flex-1 space-y-4 overflow-y-auto ${menu === "overview" && "hidden"}`}>
        {menu === "reviews" && <Reviews toiletID={toilet?.id ?? ""} />}
      </div>
      <ReviewModal open={showReviewModal} setOpen={setShowReviewModal} toiletID={toilet?.id ?? ""} />
    </div>
  );
};

export default ToiletReview;
