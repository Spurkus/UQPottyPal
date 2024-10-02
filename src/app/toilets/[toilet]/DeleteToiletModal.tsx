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

const DeleteToiletModal = ({ open, setOpen, toiletId }: DeleteToiletModalProps) => {
  const router = useRouter();
  const [deleting, setDeleting] = useState<boolean>(false);

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
              <button className="btn btn-error" onClick={handleDelete}>
                Delete
              </button>
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
