import React, { useEffect, useState } from "react";
import Loading from "../../../../loading/Loading";
import ModalEditSocial from "./ModalEditSocial";
import ModalAddSocial from "./ModalAddSocial";

const addSocial = async (addedData) => {
  try {
    const token = sessionStorage.getItem("token");

    const response = await fetch("http://localhost:8080/api/social", {
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

const updateSocial = async (id, updatedData) => {
  try {
    const token = sessionStorage.getItem("token");

    const response = await fetch(`http://localhost:8080/api/social/${id}`, {
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

const Social = () => {
  const [socialData, setSocialData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editableSocial, setEditableSocial] = useState(null);

  const handleAddButtonClick = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = async (updatedSocial) => {
    try {
      // Update the social link logic here
      await updateSocial(editableSocial.id, updatedSocial);

      // Refresh data after the update
      dataSocial();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating social link:", error.message);
    }
  };

  const handleSaveAdd = async (newSocial) => {
    try {
      // Add the new social link logic here
      await addSocial(newSocial);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error adding social link:", error.message);
    }
  };

  const deleteSocial = async (id) => {
    try {
      // Delete the social link logic here
      const token = sessionStorage.getItem("token");

      const response = await fetch(`http://localhost:8080/api/social/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      // Refresh data after deleting
      dataSocial();
    } catch (error) {
      console.error("Error deleting social link:", error.message);
    }
  };

  const dataSocial = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/social", {
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
      setSocialData(responseData);
    } catch (error) {
      console.error("Error fetching social links:", error.message);
    }
  };

  useEffect(() => {
    dataSocial();
  }, []);

  if (!socialData) {
    return <Loading />;
  }

  return (
    <div className="overflow-x-auto md:m-20 shadow-xl">
      <div className="flex justify-between mx-4 mb-4">
        <h2 className="text-2xl font-semibold">Social Links</h2>
        <button className="btn btn-gr" onClick={handleAddButtonClick}>
          Add Social Link
        </button>
      </div>
      <table className="table">
        <thead>
          <tr className="text-center">
            <th>No</th>
            <th>Name</th>
            <th>Link</th>
            <th>Icon</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {socialData.data.map((data, index) => (
            <tr key={data.id}>
              <td>{index + 1}</td>
              <td>{data.name}</td>
              <td>
                <a href={data.link} target="_blank" rel="noopener noreferrer">
                  {data.link}
                </a>
              </td>
              <td>
                <i className={data.icon}></i>
              </td>
              <th className="text-center">
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => {
                    setIsEditModalOpen(true);
                    setEditableSocial(data);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => {
                    deleteSocial(data.id);
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
        <ModalEditSocial
          editableSocial={editableSocial}
          onSave={handleSaveEdit}
          onClose={handleCloseEditModal}
        />
      )}

      {isAddModalOpen && (
        <ModalAddSocial onSave={handleSaveAdd} onClose={handleCloseAddModal} />
      )}
    </div>
  );
};

export default Social;
