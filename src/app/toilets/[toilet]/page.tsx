"use client";
import { useState, useEffect } from "react";
import { Review, Toilet } from "@/types";
import { getReviewsForToilet, getToilet } from "@/helper/firestoreFunctions";
import { AddEditReviewContextProvider } from "@/contexts/AddEditReview";
import ReviewModal from "@/components/toilet-data/ReviewModal";
import Reviews from "@/components/toilet-data/DisplayReviews";
import Overview from "@/components/toilet-data/ToiletOverview";

interface ToiletPageProps {
  params: {
    toilet: string;
  };
}

const ToiletPage = ({ params }: ToiletPageProps) => {
  const [toilet, setToilet] = useState<Toilet | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    getToilet(params.toilet).then(async (toilet) => {
      setToilet(toilet);
      await getReviewsForToilet(toilet.id).then((reviews) => {
        setReviews(reviews);
      });
    });
  }, [params.toilet]);

  if (!toilet) return;

  return (
    <div className="flex w-[90%] flex-col space-y-4 self-center 2xl:w-2/3">
      <div className="w-full overflow-y-auto rounded-3xl bg-base-300 p-5">
        <Overview toiletInfo={toilet} reviews={reviews} />
      </div>
      <div
        className={`flex max-h-[80vh] w-full flex-col space-y-4 transition-all duration-500 ${toilet ? "w-[30%]" : "w-0 opacity-0"}`}
      >
        <h1 className="ml-2 mt-2 truncate text-wrap text-3xl font-bold">Reviews</h1>
        <div className="flex-1 space-y-4 overflow-y-auto">
          <AddEditReviewContextProvider toilet={toilet} setReviews={setReviews}>
            <Reviews reviews={reviews} setReviews={setReviews} />
            <ReviewModal />
          </AddEditReviewContextProvider>
        </div>
      </div>
    </div>
  );
};

export default ToiletPage;
