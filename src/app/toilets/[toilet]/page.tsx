"use client";
import { useState, useEffect } from "react";
import { Review, Toilet } from "@/types";
import { getReviewsForToilet, getToilet } from "@/helper/firestoreFunctions";
import { AddEditReviewContextProvider } from "@/contexts/AddEditReview";
import ReviewModal from "@/components/toilet-data/ReviewModal";
import Reviews from "@/components/toilet-data/DisplayReviews";
import Overview from "@/components/toilet-data/ToiletOverview";
import { MapContextProvider } from "@/contexts/MapContext";
import Map from "@/components/Map";
import { showModal } from "@/helper/helperFunctions";
import { TextEditorContextProvider } from "@/contexts/TextEditorContext";
import ToiletModal from "@/components/toilet-data/ToiletModal";
import ReviewButton from "./ReviewButton";
import QRCodeModal from "@/components/QRCodeModal";

interface ToiletPageProps {
  params: {
    toilet: string;
  };
}

const ToiletPage = ({ params }: ToiletPageProps) => {
  const [toilet, setToilet] = useState<Toilet | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editToilet, setEditToilet] = useState<boolean>(false);
  const [showQRCode, setShowQRCode] = useState<boolean>(false);

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
    <>
      <div className="flex w-[90%] flex-col space-y-4 self-center 2xl:w-2/3">
        <AddEditReviewContextProvider toilet={toilet} setReviews={setReviews}>
          <MapContextProvider>
            <div className="flex h-96 w-full">
              <Map location={{ lng: toilet.location.longitude, lat: toilet.location.latitude }} />
            </div>
          </MapContextProvider>
          <div className="w-full overflow-y-auto rounded-3xl bg-base-300 p-5">
            <Overview toiletInfo={toilet} reviews={reviews} />
            <div className="mt-6 flex w-full flex-row gap-6">
              <button
                className="btn btn-outline btn-info h-10 min-h-0 grow text-xl"
                onClick={() => showModal("toilet_modal", setEditToilet)}
              >
                Edit Toilet
              </button>
              <button
                className="btn btn-outline btn-accent h-10 min-h-0 grow text-xl"
                onClick={() => showModal("qr_code_modal", setShowQRCode)}
              >
                QR Code
              </button>
              <ReviewButton />
              <button className="btn btn-outline btn-error h-10 min-h-0 grow text-xl">Delete Toilet</button>
            </div>
          </div>
          <div className="mt-0 flex-1 space-y-4 overflow-y-auto">
            <Reviews reviews={reviews} setReviews={setReviews} />
            <ReviewModal />
          </div>
        </AddEditReviewContextProvider>
      </div>
      <TextEditorContextProvider defaultContent={toilet.description}>
        <MapContextProvider>
          <ToiletModal open={editToilet} setOpen={setEditToilet} toilet={toilet} />
        </MapContextProvider>
      </TextEditorContextProvider>
      <QRCodeModal open={showQRCode} setOpen={setShowQRCode} value={toilet.id} />
    </>
  );
};

export default ToiletPage;
