import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../loading/Loading";
import Modal from "./ModalEdit";

const userId = sessionStorage.getItem("userId");
const token = sessionStorage.getItem("token");
const dataUser = async (user, setUserData) => {
  try {
    const response = await fetch(`http://localhost:8080/api/user/${userId}`, {
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
    setUserData(responseData);
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUser = async (user, updatedData) => {
  try {
    const response = await fetch(`http://localhost:8080/api/user/${userId}`, {
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

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [editableUserData, setEditableUserData] = useState({
    name: "",
    description: "",
    profile: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dataUser(userId, setUserData); // Ganti dengan userId yang sesuai
  }, [isModalOpen]);

  const handleEditButtonClick = () => {
    setIsModalOpen(true);
    setEditableUserData({
      name: userData.data.name,
      description: userData.data.description,
      profile: userData.data.profile,
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveEdit = async () => {
    try {
      const updatedData = {
        name: editableUserData.name,
        description: editableUserData.description,
        profile: editableUserData.profile,
      };

      await updateUser(userId, updatedData); // Ganti dengan userId yang sesuai

      // Refresh data setelah pembaruan
      dataUser(userId, setUserData);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  if (!userData) {
    return <Loading />;
  }

  return (
    <div className="overflow-x-auto md:m-20 shadow-xl">
      <table className="table">
        <thead>
          <tr className="text-center">
            <th>Name</th>
            <th>Description</th>
            <th>Profile</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img
                      src={userData.data.photo}
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{userData.data.name}</div>
                  <div className="text-sm opacity-50">
                    {userData.data.username}
                  </div>
                </div>
              </div>
            </td>
            <td>{userData.data.description}</td>
            <td>{userData.data.profile}</td>
            <th>
              <button
                className="btn"
                onClick={() => {
                  handleEditButtonClick();
                  // console.log("handleEditButtonClick called");
                }}
              >
                edit
              </button>
            </th>
          </tr>
        </tbody>
      </table>

      {isModalOpen && (
        <Modal
          editableUserData={editableUserData}
          onInputChange={(key, value) =>
            setEditableUserData((prevData) => ({ ...prevData, [key]: value }))
          }
          onSave={handleSaveEdit}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Home;
