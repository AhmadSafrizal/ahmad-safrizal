import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

const ModalUploadImage = ({ projectId, onClose, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(
        `http://localhost:8080/api/project/${projectId}/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      // Additional handling after successful upload if needed

      // Call the onUpload callback to notify the parent component
      onUpload();

      // Close the modal
      onClose();
    } catch (error) {
      console.error("Error uploading image:", error.message);
    }
  };

  return (
    <div className="modal">
      <Transition show={true} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={onClose}
        >
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

            <div className="inline-block align-middle p-8 my-8 text-left bg-white shadow-xl transform transition-all sm:my-16 sm:align-middle sm:max-w-lg sm:w-full">
              <h3 className="font-bold text-lg">Upload Image</h3>
              <div className="py-2">
                <label className="block text-sm font-medium text-gray-700">
                  Select Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              <div className="modal-action">
                <button className="btn" onClick={handleUpload}>
                  Upload
                </button>
                <button className="btn btn-outline" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ModalUploadImage;
