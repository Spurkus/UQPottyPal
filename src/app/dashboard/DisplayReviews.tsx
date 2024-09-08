import { Review } from "@/types";

interface ReviewsProps {
  reviews: Review[];
}

interface ReviewProps {
  review: Review;
}

const ReviewComponent = ({ review }: ReviewProps) => {
  return (
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
      </div>
    </div>
  );
};

const Reviews = ({ reviews }: ReviewsProps) => {
  return (
    <>
      {reviews
        .sort((a, b) => b.timestamp - a.timestamp)
        .map((review) => (
          <ReviewComponent key={review.id} review={review} />
        ))}
    </>
  );
};

export default Reviews;
