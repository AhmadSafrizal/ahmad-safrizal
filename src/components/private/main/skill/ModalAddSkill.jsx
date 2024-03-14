import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

const ModalAddSkill = ({ onClose, onSave }) => {
  const [newSkill, setNewSkill] = useState({
    name: "",
    category_id: "",
    level_id: "",
  });
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);

  const fetchCategoriesAndLevels = async () => {
    try {
      const categoryResponse = await fetch(
        "http://localhost:8080/api/category-skill"
      );
      const levelResponse = await fetch(
        "http://localhost:8080/api/level-skill"
      );

      if (!categoryResponse.ok || !levelResponse.ok) {
        throw new Error("Failed to fetch categories or levels");
      }

      const categoryData = await categoryResponse.json();
      const levelData = await levelResponse.json();

      setCategories(categoryData);
      setLevels(levelData);
    } catch (error) {
      console.error("Error fetching categories or levels:", error.message);
    }
  };

  useEffect(() => {
    fetchCategoriesAndLevels();
  }, []);

  const handleInputChange = (key, value) => {
    setNewSkill((prevData) => ({ ...prevData, [key]: value }));
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
              <h3 className="font-bold text-lg">Add Skill</h3>
              <div className="py-2">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="form-input mt-1 block w-full"
                  value={newSkill.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              <div className="py-2">
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  className="form-select mt-1 block w-full"
                  value={newSkill.category_id}
                  onChange={(e) =>
                    handleInputChange("category_id", e.target.value)
                  }
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.data &&
                    categories.data.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="py-2">
                <label className="block text-sm font-medium text-gray-700">
                  Level
                </label>
                <select
                  className="form-select mt-1 block w-full"
                  value={newSkill.level_id}
                  onChange={(e) =>
                    handleInputChange("level_id", e.target.value)
                  }
                >
                  <option value="" disabled>
                    Select Level
                  </option>
                  {levels.data &&
                    levels.data.map((level) => (
                      <option key={level.id} value={level.id}>
                        {level.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="modal-action">
                <button className="btn" onClick={() => onSave(newSkill)}>
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

export default ModalAddSkill;
