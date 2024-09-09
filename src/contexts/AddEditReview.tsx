"use client";
import { useState, useMemo, createContext, useContext, useEffect, useCallback } from "react";
import { Review, Toilet } from "@/types";
import { showModal, closeModal, triggerConfetti } from "@/helper/helperFunctions";
import useInputValidator from "@/hooks/useInputValidator";
import { createReview, editCreatedReview, getReviewsForToilet } from "@/helper/firestoreFunctions";
import { useDashboardToilet } from "./DashboardToilet";

const NAME_REGEX = /^[a-zA-Z\s]{1,30}$/;
const COMMENT_REGEX = /^[\w\s\d.,!@#$%^&*()_+-=;:'"<>?/\\|[\]{}]{1,500}$/;

export interface AddEditReviewType {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  validName: boolean;
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  validComment: boolean;
  privacy: number;
  setPrivacy: React.Dispatch<React.SetStateAction<number>>;
  cleanliness: number;
  setCleanliness: React.Dispatch<React.SetStateAction<number>>;
  accessibility: number;
  setAccessibility: React.Dispatch<React.SetStateAction<number>>;
  vibe: number;
  setVibe: React.Dispatch<React.SetStateAction<number>>;
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  validForm: boolean;
  submitting: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  setDefaultValues: () => void;
  editReview: Review | null;
  setEditReview: React.Dispatch<React.SetStateAction<Review | null>>;
}

export interface AddEditReviewProps {
  toilet: Toilet;
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  children: React.ReactNode;
}

export const AddEditReview = createContext<AddEditReviewType | null>(null);

export const AddEditReviewContextProvider = ({ toilet, setReviews, children }: AddEditReviewProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  const [editReview, setEditReview] = useState<Review | null>(null);

  const nameValidator = (name: string) => NAME_REGEX.test(name);
  const [name, setName, validName] = useInputValidator<string>(editReview?.username ?? "", nameValidator);

  const commentValidator = (comment: string) => COMMENT_REGEX.test(comment);
  const [comment, setComment, validComment] = useInputValidator<string>(editReview?.comment ?? "", commentValidator);

  const statValidator = (stat: number) => stat >= 0 && stat <= 100;
  const [privacy, setPrivacy, validPrivacy] = useInputValidator<number>(editReview?.privacy ?? 50, statValidator);
  const [cleanliness, setCleanliness, validCleanliness] = useInputValidator<number>(
    editReview?.cleanliness ?? 50,
    statValidator,
  );
  const [accessibility, setAccessibility, validAccessibility] = useInputValidator<number>(
    editReview?.accessibility ?? 50,
    statValidator,
  );
  const [vibe, setVibe, validVibe] = useInputValidator<number>(editReview?.vibe ?? 50, statValidator);

  const ratingValidator = (rating: number) => rating >= 0 && rating <= 5;
  const [rating, setRating, validRating] = useInputValidator<number>(editReview?.rating ?? 3, ratingValidator);

  const validForm = useMemo(
    () =>
      validName && validComment && validPrivacy && validCleanliness && validAccessibility && validVibe && validRating,
    [validName, validComment, validPrivacy, validCleanliness, validAccessibility, validVibe, validRating],
  );
  const [submitting, setSubmitting] = useState<boolean>(false);

  const setDefaultValues = useCallback(() => {
    setName(editReview?.username ?? "");
    setComment(editReview?.comment ?? "");
    setPrivacy(editReview?.privacy ?? 50);
    setCleanliness(editReview?.cleanliness ?? 50);
    setAccessibility(editReview?.accessibility ?? 50);
    setVibe(editReview?.vibe ?? 50);
    setRating(editReview?.rating ?? 3);
  }, [editReview, setAccessibility, setCleanliness, setComment, setName, setPrivacy, setRating, setVibe]);

  useEffect(() => setDefaultValues(), [editReview, setDefaultValues]);

  const handleClose = () => {
    closeModal("review_modal", setVisible);
    setDefaultValues();
  };

  const handleSubmit = async () => {
    if (!validForm || !toilet) return;
    setSubmitting(true);

    const review: Review | Omit<Review, "id"> = {
      ...editReview,
      toiletID: toilet.id,
      username: name,
      comment,
      rating,
      privacy,
      cleanliness,
      accessibility,
      vibe,
      timestamp: editReview ? editReview.timestamp : Date.now(),
    };

    const saveReview = editReview ? editCreatedReview : createReview;

    await saveReview(review as Review).then(async () => {
      const reviews = await getReviewsForToilet(toilet.id);
      setReviews(reviews);
      handleClose();
      setSubmitting(false);
      triggerConfetti();
    });
  };

  return (
    <AddEditReview.Provider
      value={{
        visible,
        setVisible,
        name,
        setName,
        validName,
        comment,
        setComment,
        validComment,
        privacy,
        setPrivacy,
        cleanliness,
        setCleanliness,
        accessibility,
        setAccessibility,
        vibe,
        setVibe,
        rating,
        setRating,
        validForm,
        submitting,
        handleClose,
        handleSubmit,
        setDefaultValues,
        editReview,
        setEditReview,
      }}
    >
      {children}
    </AddEditReview.Provider>
  );
};

export const useAddEditReview = () => {
  const context = useContext(AddEditReview);
  if (!context) throw new Error("useAddEditReview must be used within an AddEditReviewProvider");
  return context;
};
