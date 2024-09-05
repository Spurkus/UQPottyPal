import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export const getAllToilets = async () => {
  const toiletCollection = collection(db, "toilet");
  const toiletSnapshot = await getDocs(toiletCollection);
  return toiletSnapshot.docs.map((doc) => doc.data());
}