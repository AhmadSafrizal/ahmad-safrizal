import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

const ModalEdotLevelSkill = ({ editableLevelSkill, onClose, onSave }) => {
  const [updatedLevelSkill, setUpdatedLevelSkill] = useState({
    ...editableLevelSkill,
  });

  useEffect(() => {
    setUpdatedLevelSkill({ ...editableLevelSkill });
  }, [editableLevelSkill]);

  const handleInputChange = (key, value) => {
    setUpdatedLevelSkill((prevData) => ({ ...prevData, [key]: value }));
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
              <h3 className="font-bold text-lg">Edit Skill</h3>
              <div className="py-2">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="form-input mt-1 block w-full"
                  value={updatedLevelSkill.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              <div className="modal-action">
                <button
                  className="btn"
                  onClick={() => onSave(updatedLevelSkill)}
                >
                  Save
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

export default ModalEdotLevelSkill;
