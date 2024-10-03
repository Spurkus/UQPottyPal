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
import DeleteToiletModal from "./DeleteToiletModal";
import Loading from "@/components/Loading";

interface ToiletPageProps {
  params: {
    toilet: string;
  };
}

/**
 * ToiletPage component displays detailed information about a specific toilet
 * including its reviews, location on the map, and provides options to edit or delete the toilet.
 *
 * @param {ToiletPageProps} props - Contains the `params` object with the toilet ID.
 * @returns {JSX.Element} The page layout displaying toilet information and interactive buttons.
 */
const ToiletPage = ({ params }: ToiletPageProps): JSX.Element => {
  const [toilet, setToilet] = useState<Toilet | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editToilet, setEditToilet] = useState<boolean>(false);
  const [showQRCode, setShowQRCode] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);

  /**
   * Fetches the toilet data and its associated reviews when the page loads.
   * The toilet data is fetched using the toilet ID passed in the URL params.
   */
  useEffect(() => {
    getToilet(params.toilet).then(async (toilet) => {
      setToilet(toilet);
      await getReviewsForToilet(toilet.id).then((reviews) => {
        setReviews(reviews);
      });
    });
  }, [params.toilet]);

  // If no toilet is found, return nothing
  if (!toilet) return <Loading />;

  return (
    <>
      <div className="flex w-[90%] flex-col space-y-4 self-center 2xl:w-2/3">
        <AddEditReviewContextProvider toilet={toilet} setReviews={setReviews}>
          <MapContextProvider>
            <div className="flex h-96 w-full">
              {/* Displays the map with the toilet's location */}
              <Map location={{ lng: toilet.location.longitude, lat: toilet.location.latitude }} />
            </div>
          </MapContextProvider>
          <div className="w-full overflow-y-auto rounded-3xl bg-base-300 p-5">
            {/* Displays an overview of the toilet including basic information and reviews */}
            <Overview toiletInfo={toilet} reviews={reviews} />
            <div className="mt-6 flex w-full flex-row gap-6">
              {/* Button to open the modal for editing the toilet information */}
              <button
                className="btn btn-outline btn-info h-10 min-h-0 grow text-xl"
                onClick={() => showModal("toilet_modal", setEditToilet)}
              >
                Edit Toilet
              </button>
              {/* Button to display the toilet's QR code */}
              <button
                className="btn btn-outline btn-accent h-10 min-h-0 grow text-xl"
                onClick={() => showModal("qr_code_modal", setShowQRCode)}
              >
                QR Code
              </button>
              {/* Button to add a new review */}
              <ReviewButton />
              {/* Button to delete the toilet and associated reviews */}
              <button
                className="btn btn-outline btn-error h-10 min-h-0 grow text-xl"
                onClick={() => showModal("delete_modal", setShowDelete)}
              >
                Delete Toilet
              </button>
            </div>
          </div>
          <div className="mt-0 flex-1 space-y-4 overflow-y-auto">
            {/* Displays a list of reviews for the toilet */}
            <Reviews reviews={reviews} setReviews={setReviews} />
            {/* Modal for adding or editing reviews */}
            <ReviewModal />
          </div>
        </AddEditReviewContextProvider>
      </div>
      {/* Modal for editing the toilet information */}
      <TextEditorContextProvider defaultContent={toilet.description}>
        <MapContextProvider>
          <ToiletModal open={editToilet} setOpen={setEditToilet} toilet={toilet} />
        </MapContextProvider>
      </TextEditorContextProvider>
      {/* Modal to display QR code */}
      <QRCodeModal open={showQRCode} setOpen={setShowQRCode} value={toilet.id} />
      {/* Modal for deleting the toilet and its reviews */}
      <DeleteToiletModal open={showDelete} setOpen={setShowDelete} toiletId={toilet.id} />
    </>
  );
};

export default ToiletPage;
