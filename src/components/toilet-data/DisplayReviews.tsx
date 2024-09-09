import { useAddEditReview } from "@/contexts/AddEditReview";
import { closeModal, showModal } from "@/helper/helperFunctions";
import { useState } from "react";
import { Review } from "@/types";
import { deleteReview, getReviewsForToilet } from "@/helper/firestoreFunctions";

interface ReviewsProps {
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
}

interface ReviewProps {
  review: Review;
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
}

interface DeleteReviewModalProps {
  review: Review;
  deleteReviewModal: boolean;
  setDeleteReviewModal: React.Dispatch<React.SetStateAction<boolean>>;
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
}

const DeleteReviewModal = ({ review, deleteReviewModal, setDeleteReviewModal, setReviews }: DeleteReviewModalProps) => {
  const handleClose = () => {
    closeModal("delete_review_modal", setDeleteReviewModal);
  };

  const handleDelete = async () => {
    await deleteReview(review.id);
    handleClose();
    const reviews = await getReviewsForToilet(review.toiletID);
    setReviews(reviews);
  };

  return (
    <dialog className="modal" id="delete_review_modal" open={deleteReviewModal}>
      <div className="modal-box flex flex-col place-items-center">
        <h1 className="mb-3 text-3xl font-bold">Delete Review</h1>
        <p className="text-lg">Are you sure you want to delete this review?</p>
        <div className="modal-action justify-center space-x-24">
          <button className="btn btn-error" onClick={handleDelete}>
            Delete
          </button>
          <button className="btn btn-neutral" onClick={handleClose}>
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

const ReviewComponent = ({ review, setReviews }: ReviewProps) => {
  const { setVisible, setEditReview } = useAddEditReview();
  const [deleteReviewModal, setDeleteReviewModal] = useState(false);

  const handleEdit = () => {
    setEditReview(review);
    showModal("review_modal", setVisible);
  };

  const handleOpenDeleteModal = () => {
    showModal("delete_review_modal", setDeleteReviewModal);
  };

  return (
    <>
      <div className="collapse rounded-3xl bg-base-300">
        <input type="checkbox" />
        <div className="collapse-title p-5">
          <div className="flex flex-row justify-between">
            <span className="font-semibold text-gray-500">{review.username}</span>
            <div className="btn-disabled rating rating-half rating-sm mb-1 self-end">
              {[...Array(10)].map((_, index) => (
                <input
                  key={index}
                  type="radio"
                  name={`rating-${review.id}`}
                  className={`mask mask-star-2 bg-orange-400 ${index % 2 === 0 ? "mask-half-1" : "mask-half-2"}`}
                  checked={review.rating === (index + 1) / 2}
                  readOnly
                />
              ))}
            </div>
          </div>
          <p className="text-wrap">{review.comment}</p>
        </div>
        <div className="collapse-content px-5">
          <h4 className="font-bold leading-3">Privacy</h4>
          <progress className="progress progress-secondary" value={review.privacy} max="100" />
          <h4 className="mt-1.5 font-bold leading-3">Cleanliness</h4>
          <progress className="progress progress-accent" value={review.cleanliness} max="100" />
          <h4 className="mt-1.5 font-bold leading-3">Accessibility</h4>
          <progress className="progress progress-success" value={review.accessibility} max="100" />
          <h4 className="mt-1.5 font-bold leading-3">Vibe</h4>
          <progress className="progress progress-info" value={review.vibe} max="100" />
          <div className="mt-2 flex flex-row justify-between">
            <button className="btn btn-outline btn-success btn-sm" onClick={handleEdit}>
              Edit
            </button>
            <button className="btn btn-outline btn-error btn-sm" onClick={handleOpenDeleteModal}>
              Delete
            </button>
          </div>
        </div>
      </div>
      <DeleteReviewModal
        review={review}
        setDeleteReviewModal={setDeleteReviewModal}
        deleteReviewModal={deleteReviewModal}
        setReviews={setReviews}
      />
    </>
  );
};

const Reviews = ({ reviews, setReviews }: ReviewsProps) => {
  return (
    <>
      {reviews
        .sort((a, b) => b.timestamp - a.timestamp)
        .map((review) => (
          <ReviewComponent key={review.id} review={review} setReviews={setReviews} />
        ))}
    </>
  );
};

export default Reviews;
