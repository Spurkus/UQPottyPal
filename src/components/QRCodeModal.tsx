import { closeModal } from "@/helper/helperFunctions";
import QRCode from "react-qr-code";

interface QRCodeModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
}

/**
 * QRCodeModal component
 *
 * This component renders a modal for displaying a QR code.
 *
 * @param {QRCodeModalProps} props - The component props
 * @returns {JSX.Element} The rendered QRCodeModal component
 */
const QRCodeModal = ({ open, setOpen, value }: QRCodeModalProps) => {
  return (
    <dialog id="qr_code_modal" className="modal" open={open}>
      <div className="modal-box w-[96rem]">
        <h1 className="text-center text-3xl font-bold">QR Code</h1>
        <div className="flex flex-col items-center space-y-4">
          <QRCode value={value} size={256} />
          <button className="btn" onClick={() => closeModal("qr_code_modal", setOpen)}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default QRCodeModal;
