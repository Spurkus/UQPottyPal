import { deleteToiletAndReviews } from "@/helper/firestoreFunctions";
import { closeModal } from "@/helper/helperFunctions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

interface DeleteToiletModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toiletId: string;
}

/**
 * DeleteToiletModal component that displays a modal for deleting a toilet and its associated reviews.
 * It provides users with a confirmation prompt and handles the deletion process.
 *
 * @param {boolean} open - Controls whether the modal is visible.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setOpen - Function to set the open state of the modal.
 * @param {string} toiletId - The ID of the toilet to be deleted.
 *
 * @returns {JSX.Element} The modal dialog for deleting a toilet.
 */
const DeleteToiletModal = ({ open, setOpen, toiletId }: DeleteToiletModalProps): JSX.Element => {
  const router = useRouter();
  const [deleting, setDeleting] = useState<boolean>(false);

  /**
   * Handles the deletion of the toilet and its associated reviews.
   * Navigates the user to the "/toilets" page after successful deletion.
   */
  const handleDelete = async () => {
    setDeleting(true);
    await deleteToiletAndReviews(toiletId);
    router.push("/toilets");
  };

  return (
    <dialog id="delete_modal" className="modal" open={open}>
      <div className="modal-box w-[96rem]">
        <h1 className="text-center text-3xl font-bold">Delete Toilet</h1>
        {deleting ? (
          <div className="flex w-full place-items-center items-center justify-center self-center text-center">
            <Loading />
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4 text-center">
            <p>
              Are you sure you want to delete this toilet? All the reviews associated with this toilet will also be
              deleted :O
            </p>
            <div className="flex space-x-32">
              {/* Button to confirm deletion */}
              <button className="btn btn-error" onClick={handleDelete}>
                Delete
              </button>
              {/* Button to cancel the deletion and close the modal */}
              <button className="btn" onClick={() => closeModal("delete_modal", setOpen)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
};

export default DeleteToiletModal;
