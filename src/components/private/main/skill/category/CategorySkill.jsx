import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../../loading/Loading";
import ModalEditCategorySkill from "./ModalEditCategorySkill";
import ModalAddCategorySkill from "./ModalAddCategorySkill";

const addCategorySkill = async (addedData) => {
  try {
    const token = sessionStorage.getItem("token");

    const response = await fetch("http://localhost:8080/api/category-skill", {
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

const updateCategorySkill = async (id, updatedData) => {
  try {
    const token = sessionStorage.getItem("token");

    const response = await fetch(
      `http://localhost:8080/api/category-skill/${id}`,
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

const deleteCategorySkill = async (id, dataCategorySkills) => {
  try {
    const token = sessionStorage.getItem("token");

    const response = await fetch(
      `http://localhost:8080/api/category-skill/${id}`,
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

    dataCategorySkills(); // Call dataCategorySkills after deleting
  } catch (error) {
    console.error("Error deleting category skill:", error.message);
  }
};

const CategorySkill = () => {
  const [categorySkillsData, setCategorySkillsData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editableCategorySkill, setEditableSkill] = useState(null);

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

  const handleSaveEdit = async (updatedCategorySkill) => {
    try {
      // Update the skill logic here
      await updateCategorySkill(editableCategorySkill.id, updatedCategorySkill);

      // Refresh data after the update
      dataCategorySkills();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating category skill:", error.message);
    }
  };

  const handleSaveAdd = async (newCategorySkill) => {
    try {
      // Add the new skill logic here
      await addCategorySkill(newCategorySkill);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error adding category skill:", error.message);
    }
  };

  const dataCategorySkills = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/category-skill", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const responseData = await response.json();
      setCategorySkillsData(responseData);
    } catch (error) {
      console.error("Error fetching category skills:", error.message);
    }
  };

  useEffect(() => {
    dataCategorySkills();
  }, []);

  console.log("categorySkillsData: ", categorySkillsData);

  if (!categorySkillsData) {
    return <Loading />;
  }

  return (
    <div className="overflow-x-auto md:m-20 shadow-xl">
      <div className="flex justify-between mx-4 mb-4">
        <h2 className="text-2xl font-semibold">Category Skills</h2>
        <button className="btn btn-gr" onClick={handleAddButtonClick}>
          Add Category Skill
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
          {categorySkillsData.data.map((data, index) => (
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
                    setEditableSkill(data);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => {
                    deleteCategorySkill(data.id, dataCategorySkills);
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
        <ModalEditCategorySkill
          editableCategorySkill={editableCategorySkill}
          onSave={handleSaveEdit}
          onClose={handleCloseEditModal}
        />
      )}

      {isAddModalOpen && (
        <ModalAddCategorySkill
          onSave={handleSaveAdd}
          onClose={handleCloseAddModal}
        />
      )}
    </div>
  );
};

export default CategorySkill;
