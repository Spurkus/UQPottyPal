import { Review } from "@/types";
import { db } from "../../firebase";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { Toilet } from "@/types";

export const getAllToilets = async (): Promise<Toilet[]> => {
  const toiletCollection = collection(db, "toilet");
  const toiletSnapshot = await getDocs(toiletCollection);
  return toiletSnapshot.docs.map((doc) => doc.data()) as Toilet[];
};

export const createReview = async (review: Omit<Review, "id">) => {
  const reviewCollection = collection(db, "review");
  const reviewRef = doc(reviewCollection);
  const reviewID = reviewRef.id;
  await setDoc(reviewRef, { ...review, id: reviewID });
};

export const getReviewsForToilet = async (toiletID: string): Promise<Review[]> => {
  const reviewCollection = collection(db, "review");
  const reviewQuery = query(reviewCollection, where("toiletID", "==", toiletID));
  const reviewSnapshot = await getDocs(reviewQuery);
  return reviewSnapshot.docs.map((doc) => doc.data()) as Review[];
};
