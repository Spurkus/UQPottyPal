import { useMap } from "@/contexts/MapContext";
import { capitaliseFirstLetter, showModal } from "@/helper/helperFunctions";
import { Review, Toilet } from "@/types";
import { useState, useEffect } from "react";
import ReviewModal from "@/components/toilet-data/ReviewModal";
import Reviews from "@/components/toilet-data/DisplayReviews";
import Overview from "@/components/toilet-data/ToiletOverview";
import OtherToilets from "@/components/toilet-data/OtherToilets";
import { getReviewsForToilet, getToiletsInBuilding } from "@/helper/firestoreFunctions";
import { AddEditReviewContextProvider, useAddEditReview } from "@/contexts/AddEditReview";
import QRCodeModal from "@/components/QRCodeModal";

/**
 * Props for the Menu component.
 */
interface MenuProps {
  menu: string; // Current menu selection
  setMenu: React.Dispatch<React.SetStateAction<string>>; // Function to update menu
  visible: boolean; // Controls menu visibility
}

/**
 * Props for the MenuButton component.
 */
interface MenuButtonProps {
  menu: string; // Current menu selection
  setMenu: React.Dispatch<React.SetStateAction<string>>; // Function to update menu
  name: string; // Name of the menu item
}

/**
 * Props for the ToiletReviewDisplay component.
 */
interface ToiletReviewDisplayProps {
  toiletInfo: Toilet | null; // Information about the selected toilet
  reviews: Review[]; // List of reviews for the toilet
  toiletsInBuilding: Toilet[]; // List of toilets in the same building
  menu: string; // Current menu selection
  setMenu: React.Dispatch<React.SetStateAction<string>>; // Function to update menu
  menuVisibility: boolean; // Controls menu visibility
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>; // Function to update reviews
}

/**
 * MenuButton component - Renders a button for selecting menu options.
 *
 * @param {MenuButtonProps} props - Properties for the MenuButton component.
 * @returns {JSX.Element} A button that sets the selected menu.
 */
const MenuButton = ({ menu, setMenu, name }: MenuButtonProps) => {
  return (
    <div className="w-full">
      <input
        className="btn btn-outline join-item w-full"
        type="radio"
        name="options"
        aria-label={capitaliseFirstLetter(name)}
        onClick={() => setMenu(name)}
        onChange={() => {}} // Empty onChange to satisfy JSX rules
        checked={menu === name}
      />
    </div>
  );
};

/**
 * Menu component - Renders the menu for navigating between different sections (overview, reviews, others).
 *
 * @param {MenuProps} props - Properties for the Menu component.
 * @returns {JSX.Element} A menu that allows switching between different views.
 */
const Menu = ({ menu, setMenu, visible }: MenuProps) => {
  const menuItems = ["overview", "reviews", "others"];
  return (
    <div className={`join mb-3 w-full justify-center ${!visible && "hidden"}`}>
      {menuItems.map((item) => (
        <MenuButton key={item} menu={menu} setMenu={setMenu} name={item} />
      ))}
    </div>
  );
};

/**
 * ToiletReviewDisplay component - Displays the overview, reviews, or other toilets for a selected toilet.
 *
 * @param {ToiletReviewDisplayProps} props - Properties for the ToiletReviewDisplay component.
 * @returns {JSX.Element} A display that shows toilet information, reviews, or other toilets in the building.
 */
const ToiletReviewDisplay = ({
  toiletInfo,
  reviews,
  toiletsInBuilding,
  menu,
  setMenu,
  menuVisibility,
  setReviews,
}: ToiletReviewDisplayProps) => {
  const { setVisible, setEditReview } = useAddEditReview();
  const [showQRCode, setShowQRCode] = useState<boolean>(false);

  /**
   * Opens the review modal for adding or editing reviews.
   */
  const handleOpenReviewModal = () => {
    setEditReview(null);
    showModal("review_modal", setVisible);
  };

  return (
    <>
      <div className={`w-full overflow-y-auto rounded-3xl bg-base-300 p-5 ${menu === "overview" && "h-full"}`}>
        <div className={`flex flex-col ${!toiletInfo && "hidden"} `}>
          <Menu menu={menu} setMenu={setMenu} visible={menuVisibility} />
          {menu === "overview" && (
            <>
              <button
                className="btn btn-outline btn-info h-8 min-h-0"
                onClick={() => showModal("qr_code_modal", setShowQRCode)}
              >
                QR Code
              </button>
              <Overview toiletInfo={toiletInfo} reviews={reviews} />
              <QRCodeModal open={showQRCode} setOpen={setShowQRCode} value={toiletInfo?.id ?? ""} />
            </>
          )}
          {menu === "reviews" && (
            <>
              <h1 className="mb-2 truncate text-wrap text-3xl font-bold">{toiletInfo?.name} Reviews</h1>
              <button className="btn btn-outline btn-sm" onClick={handleOpenReviewModal}>
                Add Review
              </button>
            </>
          )}
          {menu === "others" && (
            <h1 className="mb-2 truncate text-wrap text-3xl font-bold">Other Toilets in {toiletInfo?.building}</h1>
          )}
        </div>
      </div>
      <div className={`flex-1 space-y-4 overflow-y-auto overflow-x-hidden ${menu === "overview" && "hidden"}`}>
        {menu === "reviews" && <Reviews reviews={reviews} setReviews={setReviews} />}
        {menu === "others" && <OtherToilets toilets={toiletsInBuilding} />}
      </div>
      <ReviewModal />
    </>
  );
};

/**
 * Main ToiletReview component - Handles fetching reviews, toilets in the building, and menu visibility.
 *
 * @returns {JSX.Element} The main component that manages the toilet reviews interface.
 */
const ToiletReview = () => {
  // State for the currently selected toilet
  const { toilet } = useMap();
  const [toiletInfo, setToiletInfo] = useState(toilet);

  // State for reviews related to the selected toilet
  const [reviews, setReviews] = useState<Review[]>([]);

  // State for other toilets in the same building
  const [toiletsInBuilding, setToiletsInBuilding] = useState<Toilet[]>([]);

  // State for controlling the menu and its visibility
  const [menu, setMenu] = useState("overview");
  const [menuVisibility, setMenuVisibility] = useState(!!toilet);

  // Effect to handle fetching reviews and other toilets when a toilet is selected
  useEffect(() => {
    if (toilet) {
      // Fetch reviews and other toilets asynchronously
      const fetchReviewsAndToiletsInBuilding = async () => {
        const reviews = await getReviewsForToilet(toilet?.id ?? "");
        setReviews(reviews);
        const toilets = await getToiletsInBuilding(toilet?.building ?? "");
        setToiletsInBuilding(toilets);
      };
      fetchReviewsAndToiletsInBuilding();

      // Delayed visibility and state updates for smooth transitions
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
      // Handle hiding the toilet review display when no toilet is selected
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
      <AddEditReviewContextProvider toilet={toilet!} setReviews={setReviews}>
        <ToiletReviewDisplay
          toiletInfo={toiletInfo}
          reviews={reviews}
          toiletsInBuilding={toiletsInBuilding}
          menu={menu}
          setMenu={setMenu}
          menuVisibility={menuVisibility}
          setReviews={setReviews}
        />
      </AddEditReviewContextProvider>
    </div>
  );
};

export default ToiletReview;
