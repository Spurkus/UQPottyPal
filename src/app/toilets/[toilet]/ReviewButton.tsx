import { useAddEditReview } from "@/contexts/AddEditReview";
import { showModal } from "@/helper/helperFunctions";

const ReviewButton = () => {
  const { setVisible, setEditReview } = useAddEditReview();

  const handleOpenReviewModal = () => {
    setEditReview(null);
    showModal("review_modal", setVisible);
  };

  return (
    <button className="btn btn-ghost btn-outline h-10 min-h-0 grow text-xl" onClick={handleOpenReviewModal}>
      Add Review
    </button>
  );
};

export default ReviewButton;
