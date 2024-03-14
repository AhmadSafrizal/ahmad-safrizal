import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

const ModalEditContact = ({ editableContact, onSave, onClose }) => {
  const [updatedContact, setUpdatedContact] = useState({ ...editableContact });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedContact((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(updatedContact);
  };

  return (
    <div className="modal">
      <Transition show={true} as={React.Fragment}>
        <Dialog onClose={onClose}>
          <div className="inline-block align-middle p-8 my-8 text-left bg-white shadow-xl transform transition-all sm:my-16 sm:align-middle sm:max-w-lg sm:w-full">
            <h3 className="font-bold text-lg">Edit Contact Link</h3>
            <div className="py-2">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={updatedContact.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="py-2">
              <label className="block text-sm font-medium text-gray-700">
                Link
              </label>
              <input
                type="text"
                name="link"
                value={updatedContact.link}
                onChange={handleInputChange}
              />
            </div>
            <div className="py-2">
              <label className="block text-sm font-medium text-gray-700">
                Icon
              </label>
              <input
                type="text"
                name="icon"
                value={updatedContact.icon}
                onChange={handleInputChange}
              />
            </div>
            <div className="modal-action">
              <button className="btn" onClick={handleSave}>
                Save
              </button>
              <button className="btn btn-outline" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ModalEditContact;
