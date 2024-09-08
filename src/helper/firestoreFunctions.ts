import { Review } from "@/types";
import { db } from "../../firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

export const getAllToilets = async () => {
  const toiletCollection = collection(db, "toilet");
  const toiletSnapshot = await getDocs(toiletCollection);
  return toiletSnapshot.docs.map((doc) => doc.data());
};

export const createReview = async (review: Omit<Review, "id">) => {
  const reviewCollection = collection(db, "review");
  const reviewRef = doc(reviewCollection);
  await setDoc(reviewRef, review); // Creates review document with auto-generated ID
};
