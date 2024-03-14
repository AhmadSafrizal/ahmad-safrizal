import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

const ModalAddSocial = ({ onSave, onClose }) => {
  const [newSocial, setNewSocial] = useState({
    name: "",
    link: "",
    icon: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSocial((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(newSocial);
    setNewSocial({
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
            <h3 className="font-bold text-lg">Add Social Link</h3>
            <div className="py-2">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={newSocial.name}
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
                value={newSocial.link}
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
                value={newSocial.icon}
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

export default ModalAddSocial;
