import { Review } from "@/types";
import { db } from "../../firebase";
import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
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

export const editCreatedReview = async (review: Review) => {
  const reviewCollection = collection(db, "review");
  const reviewRef = doc(reviewCollection, review.id);
  await setDoc(reviewRef, review);
};

export const deleteReview = async (reviewID: string) => {
  const reviewCollection = collection(db, "review");
  const reviewRef = doc(reviewCollection, reviewID);
  await deleteDoc(reviewRef);
};

export const getReviewsForToilet = async (toiletID: string): Promise<Review[]> => {
  const reviewCollection = collection(db, "review");
  const reviewQuery = query(reviewCollection, where("toiletID", "==", toiletID));
  const reviewSnapshot = await getDocs(reviewQuery);
  return reviewSnapshot.docs.map((doc) => doc.data()) as Review[];
};

export const getToiletsInBuilding = async (building: string): Promise<Toilet[]> => {
  const toiletCollection = collection(db, "toilet");
  const toiletQuery = query(toiletCollection, where("building", "==", building));
  const toiletSnapshot = await getDocs(toiletQuery);
  return toiletSnapshot.docs.map((doc) => doc.data()) as Toilet[];
};

export const getToilet = async (toiletID: string): Promise<Toilet> => {
  const toiletCollection = collection(db, "toilet");
  const toiletQuery = query(toiletCollection, where("id", "==", toiletID));
  const toiletSnapshot = await getDocs(toiletQuery);
  return toiletSnapshot.docs[0].data() as Toilet;
};
