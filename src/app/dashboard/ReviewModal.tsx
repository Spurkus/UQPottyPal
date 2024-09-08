import useInputValidator from "@/hooks/useInputValidator";
import { InputAreaField, InputField } from "@/components/InputFields";
import { closeModal, triggerConfetti } from "@/helper/helperFunctions";
import { useMemo, useState } from "react";
import { Review } from "@/types";
import { createReview } from "@/helper/firestoreFunctions";
import Loading from "@/components/Loading";

interface ReviewModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toiletID: string;
}

const NAME_REGEX = /^[a-zA-Z\s]{1,30}$/;
const COMMENT_REGEX = /^[\w\s\d.,!@#$%^&*()_+-=;:'"<>?/\\|[\]{}]{1,200}$/;

const ReviewModal = ({ open, setOpen, toiletID }: ReviewModalProps) => {
  const nameValidator = (name: string) => NAME_REGEX.test(name);
  const [name, setName, validName] = useInputValidator<string>("", nameValidator);

  const commentValidator = (comment: string) => COMMENT_REGEX.test(comment);
  const [comment, setComment, validComment] = useInputValidator<string>("", commentValidator);

  const statValidator = (stat: number) => stat >= 0 && stat <= 100;
  const [privacy, setPrivacy, validPrivacy] = useInputValidator<number>(50, statValidator);
  const [cleanliness, setCleanliness, validCleanliness] = useInputValidator<number>(50, statValidator);
  const [accessibility, setAccessibility, validAccessibility] = useInputValidator<number>(50, statValidator);
  const [vibe, setVibe, validVibe] = useInputValidator<number>(50, statValidator);

  const ratingValidator = (rating: number) => rating >= 0 && rating <= 5;
  const [rating, setRating, validRating] = useInputValidator<number>(3, ratingValidator);

  const validForm = useMemo(
    () =>
      validName && validComment && validPrivacy && validCleanliness && validAccessibility && validVibe && validRating,
    [validName, validComment, validPrivacy, validCleanliness, validAccessibility, validVibe, validRating],
  );
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleClose = () => {
    closeModal("review_modal", setOpen);
    setComment("");
    setName("");
    setPrivacy(50);
    setCleanliness(50);
    setAccessibility(50);
    setVibe(50);
    setRating(3);
  };

  const handleSubmit = async () => {
    if (!validForm) return;
    setSubmitting(true);

    const review: Omit<Review, "id"> = {
      toiletID,
      username: name,
      comment,
      rating,
      privacy,
      cleanliness,
      accessibility,
      vibe,
      timestamp: Date.now(),
    };

    await createReview(review).then(() => {
      setTimeout(() => {
        handleClose();
        setSubmitting(false);
        triggerConfetti();
      }, 1000);
    });
  };

  return (
    <dialog id="review_modal" className="modal" open={open}>
      <div className="modal-box w-[96rem]">
        <h1 className="text-center text-3xl font-bold">Create Review</h1>
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
                valueMaxLength={200}
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
                    name="rating-10"
                    className={`mask mask-star-2 bg-orange-400 ${index % 2 === 0 ? "mask-half-1" : "mask-half-2"}`}
                    onChange={() => setRating((index + 1) / 2)}
                    checked={rating === (index + 1) / 2}
                  />
                ))}
              </div>
            </div>
            <div className="modal-action justify-center space-x-24">
              <button className={`btn btn-success ${!validForm && "btn-disabled"}`} onClick={handleSubmit}>
                Submit
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
