import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../../loading/Loading";
import ModalEditCategoryProject from "./ModalEditCategoryProject";
import ModalAddCategoryProject from "./ModalAddCategoryProject";

const addCategoryProject = async (addedData) => {
  try {
    const token = sessionStorage.getItem("token");

    const response = await fetch("http://localhost:8080/api/category-project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(addedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateCategoryProject = async (id, updatedData) => {
  try {
    const token = sessionStorage.getItem("token");

    const response = await fetch(
      `http://localhost:8080/api/category-project/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteCategoryProject = async (id, dataCategoryProjects) => {
  try {
    const token = sessionStorage.getItem("token");

    const response = await fetch(
      `http://localhost:8080/api/category-project/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    dataCategoryProjects(); // Call dataCategoryProjects after deleting
  } catch (error) {
    console.error("Error deleting category project:", error.message);
  }
};

const CategoryProject = () => {
  const [categoryProjectsData, setCategoryProjectsData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editableCategoryProject, setEditableProject] = useState(null);

  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = async (updatedCategoryProject) => {
    try {
      // Update the project logic here
      await updateCategoryProject(
        editableCategoryProject.id,
        updatedCategoryProject
      );

      // Refresh data after the update
      dataCategoryProjects();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating category project:", error.message);
    }
  };

  const handleSaveAdd = async (newCategoryProject) => {
    try {
      // Add the new project logic here
      await addCategoryProject(newCategoryProject);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error adding category project:", error.message);
    }
  };

  const dataCategoryProjects = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/category-project",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const responseData = await response.json();
      setCategoryProjectsData(responseData);
    } catch (error) {
      console.error("Error fetching category projects:", error.message);
    }
  };

  useEffect(() => {
    dataCategoryProjects();
  }, []);

  console.log("categoryProjectsData: ", categoryProjectsData);

  if (!categoryProjectsData) {
    return <Loading />;
  }

  return (
    <div className="overflow-x-auto md:m-20 shadow-xl">
      <div className="flex justify-between mx-4 mb-4">
        <h2 className="text-2xl font-semibold">Category Projects</h2>
        <button className="btn btn-gr" onClick={handleAddButtonClick}>
          Add Category Project
        </button>
      </div>
      <table className="table">
        <thead>
          <tr className="text-center">
            <th>No</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categoryProjectsData.data.map((data, index) => (
            <tr key={data.id}>
              <td>{index + 1}</td>
              <td>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-bold">{data.name}</div>
                  </div>
                </div>
              </td>
              <th className="text-center">
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => {
                    setIsEditModalOpen(true);
                    setEditableProject(data);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => {
                    deleteCategoryProject(data.id, dataCategoryProjects);
                  }}
                >
                  Hapus
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditModalOpen && (
        <ModalEditCategoryProject
          editableCategoryProject={editableCategoryProject}
          onSave={handleSaveEdit}
          onClose={handleCloseEditModal}
        />
      )}

      {isAddModalOpen && (
        <ModalAddCategoryProject
          onSave={handleSaveAdd}
          onClose={handleCloseAddModal}
        />
      )}
    </div>
  );
};

export default CategoryProject;
