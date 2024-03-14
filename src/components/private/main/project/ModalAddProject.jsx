import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

const ModalAddProject = ({ onClose, onSave }) => {
  const [newProject, setNewProject] = useState({
    name: "",
    category_id: "",
    description: "",
    link: "",
    github: "",
    photo: "",
  });
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const categoryResponse = await fetch(
        "http://localhost:8080/api/category-project"
      );

      if (!categoryResponse.ok) {
        throw new Error("Failed to fetch categories project");
      }

      const categoryData = await categoryResponse.json();

      setCategories(categoryData);
    } catch (error) {
      console.error("Error fetching categories :", error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (key, value) => {
    setNewProject((prevData) => ({ ...prevData, [key]: value }));
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
              <h3 className="font-bold text-lg">Add Project</h3>
              <div className="py-2">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="form-input mt-1 block w-full"
                  value={newProject.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              <div className="py-2">
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  className="form-select mt-1 block w-full"
                  value={newProject.category_id}
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
                  Description
                </label>
                <textarea
                  className="form-textarea mt-1 block w-full"
                  value={newProject.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                />
              </div>
              <div className="py-2">
                <label className="block text-sm font-medium text-gray-700">
                  Link
                </label>
                <input
                  type="text"
                  className="form-input mt-1 block w-full"
                  value={newProject.link}
                  onChange={(e) => handleInputChange("link", e.target.value)}
                />
              </div>
              <div className="py-2">
                <label className="block text-sm font-medium text-gray-700">
                  Github
                </label>
                <input
                  type="text"
                  className="form-input mt-1 block w-full"
                  value={newProject.github}
                  onChange={(e) => handleInputChange("github", e.target.value)}
                />
              </div>
              <div className="modal-action">
                <button className="btn" onClick={() => onSave(newProject)}>
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

export default ModalAddProject;
