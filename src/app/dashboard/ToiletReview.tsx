import { useDashboardToilet } from "@/contexts/DashboardToilet";
import { capitaliseFirstLetter, showModal } from "@/helper/helperFunctions";
import { Review } from "@/types";
import { useState, useEffect } from "react";
import ReviewModal from "./ReviewModal";
import Reviews from "./DisplayReviews";
import Overview from "./Overview";
import { getReviewsForToilet } from "@/helper/firestoreFunctions";

interface MenuProps {
  menu: string;
  setMenu: React.Dispatch<React.SetStateAction<string>>;
  visible: boolean;
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

const ToiletReview = () => {
  // Toilet state
  const { toilet } = useDashboardToilet();
  const [toiletInfo, setToiletInfo] = useState(toilet);

  // Review state for the toilet
  const [reviews, setReviews] = useState<Review[]>([]);

  // Menu state
  const [menu, setMenu] = useState("overview");
  const [menuVisibility, setMenuVisibility] = useState(!!toilet);

  // Review Modal state
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Show the toilet review when the toilet is set and hide it when the toilet is unset
  useEffect(() => {
    if (toilet) {
      // Get the reviews for the toilet
      const fetchReviews = async () => {
        const reviews = await getReviewsForToilet(toilet?.id ?? "");
        setReviews(reviews);
      };
      fetchReviews();

      // Accounts for the delay in showing the toilet review
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
          {menu === "overview" && <Overview toiletInfo={toiletInfo} reviews={reviews} />}
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
        {menu === "reviews" && <Reviews reviews={reviews} />}
      </div>
      <ReviewModal open={showReviewModal} setOpen={setShowReviewModal} toiletID={toilet?.id ?? ""} />
    </div>
  );
};

export default ToiletReview;
