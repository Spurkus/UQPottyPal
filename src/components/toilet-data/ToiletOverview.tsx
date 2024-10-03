import { calculateAverageReviewStat } from "@/helper/helperFunctions";
import { Toilet, Review } from "@/types";

interface OverviewProps {
  toiletInfo: Toilet | null;
  reviews: Review[];
}

interface StatisticsProps {
  averageRating: number;
  averagePrivacy: number;
  averageCleanliness: number;
  averageAccessibility: number;
  averageVibe: number;
  toiletID: string;
}

/**
 * Statistics component
 *
 * Displays average statistics for a toilet, including overall rating and various attributes.
 *
 * @param {StatisticsProps} props - The component props
 * @returns {JSX.Element} The rendered Statistics component
 */
const Statistics = ({
  averageRating,
  averagePrivacy,
  averageCleanliness,
  averageAccessibility,
  averageVibe,
  toiletID,
}: StatisticsProps): JSX.Element => {
  return (
    <>
      <h3 className="mb-0.5 mt-1.5 text-lg font-bold">Overall Rating</h3>
      <div className="btn-disabled rating rating-half rating-md">
        {[...Array(10)].map((_, index) => (
          <input
            key={index}
            type="radio"
            name={`rating-${toiletID}`}
            className={`mask mask-star-2 bg-orange-400 ${index % 2 === 0 ? "mask-half-1" : "mask-half-2"}`}
            checked={averageRating === (index + 1) / 2}
            readOnly
          />
        ))}
      </div>
      {/* Privacy rating */}
      <h3 className="mb-0.5 mt-1.5 text-lg font-bold">Privacy</h3>
      <progress className="progress progress-secondary" value={averagePrivacy} max="100" />
      {/* Cleanliness rating */}
      <h3 className="mb-0.5 mt-1.5 text-lg font-bold">Cleanliness</h3>
      <progress className="progress progress-accent" value={averageCleanliness} max="100" />
      {/* Accessibility rating */}
      <h3 className="mb-0.5 mt-1.5 text-lg font-bold">Accessibility</h3>
      <progress className="progress progress-success" value={averageAccessibility} max="100" />
      {/* Vibe rating */}
      <h3 className="mb-0.5 mt-1.5 text-lg font-bold">Vibe</h3>
      <progress className="progress progress-info" value={averageVibe} max="100" />
    </>
  );
};

/**
 * Overview component
 *
 * Displays an overview of a toilet, including its details and average statistics from reviews.
 *
 * @param {OverviewProps} props - The component props
 * @returns {JSX.Element} The rendered Overview component
 */
const Overview = ({ toiletInfo, reviews }: OverviewProps): JSX.Element => {
  // Calculate average statistics from reviews
  const averageRating = calculateAverageReviewStat(reviews, "rating");
  const averagePrivacy = calculateAverageReviewStat(reviews, "privacy");
  const averageCleanliness = calculateAverageReviewStat(reviews, "cleanliness");
  const averageAccessibility = calculateAverageReviewStat(reviews, "accessibility");
  const averageVibe = calculateAverageReviewStat(reviews, "vibe");

  return (
    <>
      {/* Toilet name */}
      <h1 className="truncate text-wrap text-3xl font-bold">{toiletInfo?.name}</h1>
      {/* Building and floor information */}
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
      {/* Toilet description */}
      <h4 className="mt-3 text-xl font-bold leading-5">Description</h4>
      <p
        className="text-wrap leading-4"
        dangerouslySetInnerHTML={{ __html: toiletInfo?.description || "<p>Default description</p>" }}
      ></p>
      {/* Average statistics */}
      <h2 className="mt-3 text-2xl font-bold">Average Statistics</h2>
      {reviews.length > 0 ? (
        <Statistics
          averageRating={averageRating}
          averagePrivacy={averagePrivacy}
          averageCleanliness={averageCleanliness}
          averageAccessibility={averageAccessibility}
          averageVibe={averageVibe}
          toiletID={toiletInfo?.id ?? ""}
        />
      ) : (
        <h2 className="text-4xl font-bold text-gray-500">No Data from Reviews Yet {":(("}</h2>
      )}
    </>
  );
};

export default Overview;
