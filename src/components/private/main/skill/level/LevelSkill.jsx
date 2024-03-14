import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../../loading/Loading";
import ModalEditLevelSkill from "./ModalEditLevelSkill";
import ModalAddLevelSkill from "./ModalAddLevelSkill";

const addLevelSkill = async (addedData) => {
  try {
    const token = sessionStorage.getItem("token");

    const response = await fetch("http://localhost:8080/api/level-skill", {
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

const updateLevelSkill = async (id, updatedData) => {
  try {
    const token = sessionStorage.getItem("token");

    const response = await fetch(
      `http://localhost:8080/api/level-skill/${id}`,
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

const deleteLevelSkill = async (id, dataLevelSkills) => {
  try {
    const token = sessionStorage.getItem("token");

    const response = await fetch(
      `http://localhost:8080/api/level-skill/${id}`,
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

    dataLevelSkills(); // Call dataLevelSkills after deleting
  } catch (error) {
    console.error("Error deleting level skill:", error.message);
  }
};

const LevelSkill = () => {
  const [levelSkillsData, setLevelSkillsData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editableLevelSkill, setEditableSkill] = useState(null);

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

  const handleSaveEdit = async (updatedLevelSkill) => {
    try {
      // Update the skill logic here
      await updateLevelSkill(editableLevelSkill.id, updatedLevelSkill);

      // Refresh data after the update
      dataLevelSkills();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating level skill:", error.message);
    }
  };

  const handleSaveAdd = async (newLevelSkill) => {
    try {
      // Add the new skill logic here
      await addLevelSkill(newLevelSkill);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error adding level skill:", error.message);
    }
  };

  const dataLevelSkills = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/level-skill", {
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
      setLevelSkillsData(responseData);
    } catch (error) {
      console.error("Error fetching level skills:", error.message);
    }
  };

  useEffect(() => {
    dataLevelSkills();
  }, []);

  console.log("levelSkillsData: ", levelSkillsData);

  if (!levelSkillsData) {
    return <Loading />;
  }

  return (
    <div className="overflow-x-auto md:m-20 shadow-xl">
      <div className="flex justify-between mx-4 mb-4">
        <h2 className="text-2xl font-semibold">Level Skills</h2>
        <button className="btn btn-gr" onClick={handleAddButtonClick}>
          Add Level Skill
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
          {levelSkillsData.data.map((data, index) => (
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
                    deleteLevelSkill(data.id, dataLevelSkills);
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
        <ModalEditLevelSkill
          editableLevelSkill={editableLevelSkill}
          onSave={handleSaveEdit}
          onClose={handleCloseEditModal}
        />
      )}

      {isAddModalOpen && (
        <ModalAddLevelSkill
          onSave={handleSaveAdd}
          onClose={handleCloseAddModal}
        />
      )}
    </div>
  );
};

export default LevelSkill;
