import { Review } from "@/types";
import { db } from "../../firebase";
import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { Toilet } from "@/types";

/**
 * Fetches all toilet entries from the Firestore database.
 * @returns A promise that resolves to an array of Toilet objects.
 */
export const getAllToilets = async (): Promise<Toilet[]> => {
  const toiletCollection = collection(db, "toilet");
  const toiletSnapshot = await getDocs(toiletCollection);
  return toiletSnapshot.docs.map((doc) => doc.data()) as Toilet[];
};

/**
 * Creates a new review in the Firestore database.
 * Automatically generates a unique ID for the review.
 * @param review - An object containing the review data excluding the ID.
 */
export const createReview = async (review: Omit<Review, "id">) => {
  const reviewCollection = collection(db, "review");
  const reviewRef = doc(reviewCollection);
  const reviewID = reviewRef.id;
  await setDoc(reviewRef, { ...review, id: reviewID });
};

/**
 * Updates an existing review in the Firestore database.
 * The review must contain a valid ID.
 * @param review - The complete review object to be updated.
 */
export const editCreatedReview = async (review: Review) => {
  const reviewCollection = collection(db, "review");
  const reviewRef = doc(reviewCollection, review.id);
  await setDoc(reviewRef, review);
};

/**
 * Deletes a review from the Firestore database by its ID.
 * @param reviewID - The unique ID of the review to delete.
 */
export const deleteReview = async (reviewID: string) => {
  const reviewCollection = collection(db, "review");
  const reviewRef = doc(reviewCollection, reviewID);
  await deleteDoc(reviewRef);
};

/**
 * Fetches all reviews associated with a specific toilet by its ID.
 * @param toiletID - The unique ID of the toilet for which to retrieve reviews.
 * @returns A promise that resolves to an array of Review objects.
 */
export const getReviewsForToilet = async (toiletID: string): Promise<Review[]> => {
  const reviewCollection = collection(db, "review");
  const reviewQuery = query(reviewCollection, where("toiletID", "==", toiletID));
  const reviewSnapshot = await getDocs(reviewQuery);
  return reviewSnapshot.docs.map((doc) => doc.data()) as Review[];
};

/**
 * Fetches all toilet entries located in a specific building.
 * @param building - The name of the building for which to retrieve toilets.
 * @returns A promise that resolves to an array of Toilet objects.
 */
export const getToiletsInBuilding = async (building: string): Promise<Toilet[]> => {
  const toiletCollection = collection(db, "toilet");
  const toiletQuery = query(toiletCollection, where("building", "==", building));
  const toiletSnapshot = await getDocs(toiletQuery);
  return toiletSnapshot.docs.map((doc) => doc.data()) as Toilet[];
};

/**
 * Fetches a specific toilet entry by its ID.
 * @param toiletID - The unique ID of the toilet to retrieve.
 * @returns A promise that resolves to a Toilet object.
 */
export const getToilet = async (toiletID: string): Promise<Toilet> => {
  const toiletCollection = collection(db, "toilet");
  const toiletQuery = query(toiletCollection, where("id", "==", toiletID));
  const toiletSnapshot = await getDocs(toiletQuery);
  return toiletSnapshot.docs[0].data() as Toilet;
};

/**
 * Creates a new toilet entry in the Firestore database.
 * Automatically generates a unique ID for the toilet.
 * @param toilet - An object containing the toilet data excluding the ID.
 * @returns The generated ID of the newly created toilet.
 */
export const createToilet = async (toilet: Omit<Toilet, "id">) => {
  const toiletCollection = collection(db, "toilet");
  const toiletRef = doc(toiletCollection);
  const toiletID = toiletRef.id;
  await setDoc(toiletRef, { ...toilet, id: toiletID });
  return toiletID;
};

/**
 * Updates an existing toilet entry in the Firestore database.
 * The toilet must contain a valid ID.
 * @param toilet - The complete toilet object to be updated.
 */
export const editToilet = async (toilet: Toilet) => {
  const toiletCollection = collection(db, "toilet");
  const toiletRef = doc(toiletCollection, toilet.id);
  await setDoc(toiletRef, toilet);
};

/**
 * Deletes a toilet entry and all associated reviews from the Firestore database.
 * @param toiletID - The unique ID of the toilet to delete along with its reviews.
 */
export const deleteToiletAndReviews = async (toiletID: string) => {
  const toiletCollection = collection(db, "toilet");
  const toiletRef = doc(toiletCollection, toiletID);
  await deleteDoc(toiletRef);

  const reviewCollection = collection(db, "review");
  const reviewQuery = query(reviewCollection, where("toiletID", "==", toiletID));
  const reviewSnapshot = await getDocs(reviewQuery);
  reviewSnapshot.docs.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
};
