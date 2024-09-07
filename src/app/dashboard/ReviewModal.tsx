import useInputValidator from "@/hooks/useInputValidator";
import { InputAreaField } from "@/components/InputFields";

const COMMENT_REGEX = /^[\w\s\d.,!@#$%^&*()_+-=;:'"<>?/\\|[\]{}]*$/;

const ReviewModal = () => {
  const commentValidator = (comment: string) => COMMENT_REGEX.test(comment);
  const [comment, setComment, validComment] = useInputValidator("", commentValidator);

  const statValidator = (stat: number) => stat >= 0 && stat <= 100;
  const [privacy, setPrivacy, validPrivacy] = useInputValidator<number>(50, statValidator);
  const [cleanliness, setCleanliness, validCleanliness] = useInputValidator<number>(50, statValidator);
  const [accessibility, setAccessibility, validAccessibility] = useInputValidator<number>(50, statValidator);
  const [vibe, setVibe, validVibe] = useInputValidator<number>(50, statValidator);

  const ratingValidator = (rating: number) => rating >= 0 && rating <= 5;
  const [rating, setRating, validRating] = useInputValidator<number>(3, ratingValidator);

  return (
    <dialog id="review_modal" className="modal">
      <div className="modal-box w-[96rem]">
        <h1 className="text-center text-3xl font-bold">Create Review</h1>
        <div className="flex flex-col">
          <label className="label pb-0 pt-0 text-xl font-bold">Comment</label>
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
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ReviewModal;
