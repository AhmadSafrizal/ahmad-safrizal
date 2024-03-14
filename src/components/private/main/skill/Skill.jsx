import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../loading/Loading";
import ModalEditSkill from "./ModalEditSkill";
import ModalAddSkill from "./ModalAddSkill";
import LevelSkill from "./level/LevelSkill";
import CategorySkill from "./category/CategorySkill";

const addSkill = async (addedData) => {
  try {
    const token = sessionStorage.getItem("token");

    const response = await fetch("http://localhost:8080/api/skill", {
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

const updateSkill = async (id, updatedData) => {
  try {
    const token = sessionStorage.getItem("token");

    const response = await fetch(`http://localhost:8080/api/skill/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
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

const deleteSkill = async (id, dataSkills) => {
  try {
    const token = sessionStorage.getItem("token");

    const response = await fetch(`http://localhost:8080/api/skill/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    dataSkills(); // Call dataSkills after deleting
  } catch (error) {
    console.error("Error deleting skill:", error.message);
  }
};

const Skill = () => {
  const [skillsData, setSkillsData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editableSkill, setEditableSkill] = useState(null);

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

  const handleSaveEdit = async (updatedSkill) => {
    try {
      // Update the skill logic here
      await updateSkill(editableSkill.id, updatedSkill);

      // Refresh data after the update
      dataSkills();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating skill:", error.message);
    }
  };

  const handleSaveAdd = async (newSkill) => {
    try {
      // Add the new skill logic here
      await addSkill(newSkill);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error adding skill:", error.message);
    }
  };

  const dataSkills = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/skill", {
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
      setSkillsData(responseData);
    } catch (error) {
      console.error("Error fetching skills:", error.message);
    }
  };

  console.log("skillsData: ", skillsData);

  if (!skillsData) {
    return <Loading />;
  }

  return (
    <>
      <div className="overflow-x-auto md:m-20 shadow-xl">
        <div className="flex justify-between mx-4 mb-4">
          <h2 className="text-2xl font-semibold">Skills</h2>
          <button className="btn btn-gr" onClick={handleAddButtonClick}>
            Add Skill
          </button>
        </div>
        <table className="table">
          <thead>
            <tr className="text-center">
              <th>No</th>
              <th>Name</th>
              <th>Category</th>
              <th>Level</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {skillsData.data.map((data, index) => (
              <tr key={data.id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{data.name}</div>
                    </div>
                  </div>
                </td>
                <td>{data.category_skill.name}</td>
                <td>{data.level_skill.name}</td>
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
                      deleteSkill(data.id, dataSkills);
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
          <ModalEditSkill
            editableSkill={editableSkill}
            onSave={handleSaveEdit}
            onClose={handleCloseEditModal}
          />
        )}

        {isAddModalOpen && (
          <ModalAddSkill onSave={handleSaveAdd} onClose={handleCloseAddModal} />
        )}
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <LevelSkill />
        </div>
        <div className="w-full md:w-1/2">
          <CategorySkill />
        </div>
      </div>
    </>
  );
};

export default Skill;
