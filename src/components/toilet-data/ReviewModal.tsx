import { InputAreaField, InputField } from "@/components/InputFields";
import { useAddEditReview } from "@/contexts/AddEditReview";
import Loading from "@/components/Loading";

/**
 * ReviewModal component that renders a modal for creating or editing a review.
 * It uses the AddEditReviewContext to manage the state of the review form.
 * The modal contains input fields for the review details and a submit button.
 * When the submit button is clicked, the form data is validated and submitted.
 * The modal can be closed by clicking the close button.
 *
 * @returns {JSX.Element} The modal for creating or editing a review.
 */
const ReviewModal = () => {
  const {
    visible,
    submitting,
    handleClose,
    validForm,
    handleSubmit,
    name,
    setName,
    validName,
    comment,
    setComment,
    validComment,
    privacy,
    setPrivacy,
    cleanliness,
    setCleanliness,
    accessibility,
    setAccessibility,
    vibe,
    setVibe,
    rating,
    setRating,
    editReview,
  } = useAddEditReview();
  return (
    <dialog id="review_modal" className="modal" open={visible}>
      <div className="modal-box w-[96rem]">
        <h1 className="text-center text-3xl font-bold">{editReview ? "Edit" : "Create"} Review</h1>
        {submitting ? (
          <div className="my-12 flex justify-center">
            <Loading />
          </div>
        ) : (
          <>
            <div className="flex flex-col">
              <label className="label pb-0.5 pt-2.5 font-bold">Name</label>
              <InputField
                type="review_name"
                value={name}
                validValue={validName}
                valuePlaceholder="Your Name"
                valueMaxLength={30}
                noInput={false}
                valueChange={(e) => setName(e.target.value)}
              />
              <label className="label pb-0 text-xl font-bold">Comment</label>
              <InputAreaField
                type="review_comment"
                value={comment}
                validValue={validComment}
                valuePlaceholder="Write your review here"
                valueMaxLength={500}
                noInput={false}
                valueChange={(e) => setComment(e.target.value)}
                height={100}
              />
            </div>
            <div className="flex flex-col">
              <label className="label pb-0.5 pt-2.5 font-bold">Privacy</label>
              <input
                type="range"
                min={0}
                max={100}
                value={privacy}
                onChange={(value) => setPrivacy(+value.target.value)}
                className="range range-secondary range-xs"
              />
              <label className="label pb-0.5 pt-2.5 font-bold">Cleanliness</label>
              <input
                type="range"
                min={0}
                max={100}
                value={cleanliness}
                onChange={(value) => setCleanliness(+value.target.value)}
                className="range range-accent range-xs"
              />
              <label className="label pb-0.5 pt-2.5 font-bold">Accessibility</label>
              <input
                type="range"
                min={0}
                max={100}
                value={accessibility}
                onChange={(value) => setAccessibility(+value.target.value)}
                className="range range-success range-xs"
              />
              <label className="label pb-0.5 pt-2.5 font-bold">Vibe</label>
              <input
                type="range"
                min={0}
                max={100}
                value={vibe}
                onChange={(value) => setVibe(+value.target.value)}
                className="range range-info range-xs"
              />
              <label className="label pb-0.5 pt-2.5 text-xl font-bold">Overall Rating</label>
              <div className="rating rating-half rating-lg self-center">
                {[...Array(10)].map((_, index) => (
                  <input
                    key={index}
                    type="radio"
                    name="rating-review"
                    className={`mask mask-star-2 bg-orange-400 ${index % 2 === 0 ? "mask-half-1" : "mask-half-2"}`}
                    onChange={() => setRating((index + 1) / 2)}
                    checked={rating === (index + 1) / 2}
                  />
                ))}
              </div>
            </div>
            <div className="modal-action justify-center space-x-24">
              <button className={`btn btn-success ${!validForm && "btn-disabled"}`} onClick={handleSubmit}>
                {editReview ? "Edit Review" : "Submit"}
              </button>
              <button className="btn" onClick={handleClose}>
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
};

export default ReviewModal;
