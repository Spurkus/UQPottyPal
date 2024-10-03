import { useAddEditReview } from "@/contexts/AddEditReview";
import { showModal } from "@/helper/helperFunctions";

/**
 * ReviewButton component that renders a button to open the review modal.
 * When clicked, it triggers the modal for adding a new review.
 *
 * @returns {JSX.Element} The button for adding a new review.
 */
const ReviewButton = (): JSX.Element => {
  const { setVisible, setEditReview } = useAddEditReview();

  /**
   * Handles the opening of the review modal.
   * Resets the current review being edited and displays the modal for adding a new review.
   */
  const handleOpenReviewModal = () => {
    setEditReview(null); // Reset any existing review data
    showModal("review_modal", setVisible); // Open the review modal
  };

  return (
    <button className="btn btn-ghost btn-outline h-10 min-h-0 grow text-xl" onClick={handleOpenReviewModal}>
      Add Review
    </button>
  );
};

export default ReviewButton;
