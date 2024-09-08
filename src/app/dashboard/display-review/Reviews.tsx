"use client";
import { useEffect, useState } from "react";
import { getReviewsForToilet } from "@/helper/firestoreFunctions";
import { Review } from "@/types";
import Loading from "@/components/Loading";
import ReviewComponent from "./Review";

interface ReviewsProps {
  toiletID: string;
}

const Reviews = ({ toiletID }: ReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviews = await getReviewsForToilet(toiletID);
      setReviews(reviews);
      setLoading(false);
    };

    fetchReviews();
  });

  if (loading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loading />
      </div>
    );

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
