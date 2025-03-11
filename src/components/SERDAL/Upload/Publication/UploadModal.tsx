import { useEffect, useRef, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (action: string) => void; // Accept action as a string ("approve" or "decline")
}

const Upload: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const modalRef = useRef<HTMLDivElement | null>(null); // Reference for the modal

  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
          onClose();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          ref={modalRef} // Reference to the modal content
          className={`bg-white rounded-lg p-6 w-[90%] md:w-1/3 border-2 border-primary border-opacity-70 transition-transform duration-200 transform ${
            isOpen ? "scale-100" : "scale-50"
          }`}
        >
          <h2 className="text-lg font-semibold">Are you sure?</h2>
          <p className="text-sm p-4">Do you want to Approve this request?</p>
          <div className="flex justify-end space-x-1 text-sm">
            <button
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-1 rounded-md"
            >
              No
            </button>
            <button
              onClick={() => onConfirm("approve")} // Call onConfirm with "approve"
              className="bg-primary text-white px-4 py-1 rounded-md"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Upload;
