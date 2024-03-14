import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

const ModalAddContact = ({ onSave, onClose }) => {
  const [newContact, setNewContact] = useState({
    name: "",
    link: "",
    icon: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(newContact);
    setNewContact({
      name: "",
      link: "",
      icon: "",
    });
  };

  return (
    <div className="modal">
      <Transition show={true} as={React.Fragment}>
        <Dialog onClose={onClose}>
          <div className="inline-block align-middle p-8 my-8 text-left bg-white shadow-xl transform transition-all sm:my-16 sm:align-middle sm:max-w-lg sm:w-full">
            <h3 className="font-bold text-lg">Add Contact Link</h3>
            <div className="py-2">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={newContact.name}
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
                value={newContact.link}
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
                value={newContact.icon}
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

export default ModalAddContact;
