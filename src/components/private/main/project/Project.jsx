import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../loading/Loading";
import ModalEditProject from "./ModalEditProject";
import ModalAddProject from "./ModalAddProject";
import ModalUploadImage from "./ModalUploadImage";
import CategoryProject from "./category/CategoryProject";

const addProject = async (addedData) => {
  try {
    const token = sessionStorage.getItem("token");

    const response = await fetch("http://localhost:8080/api/project", {
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

const updateProject = async (id, updatedData) => {
  try {
    const token = sessionStorage.getItem("token");

    const response = await fetch(`http://localhost:8080/api/project/${id}`, {
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

const deleteProject = async (id, dataUser) => {
  try {
    const token = sessionStorage.getItem("token");

    const response = await fetch(`http://localhost:8080/api/project/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    dataUser(); // Call dataUser after deleting
  } catch (error) {
    console.error("Error deleting project:", error.message);
  }
};

const Project = () => {
  const [userData, setUserData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [editableProject, setEditableProject] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

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

  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  const handleSaveEdit = async (updatedProject) => {
    try {
      await updateProject(editableProject.id, updatedProject);
      // Refresh data after the update
      dataUser();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating project:", error.message);
    }
  };

  const handleSaveAdd = async (newProject) => {
    try {
      await addProject(newProject);
      setIsAddModalOpen(false);
      // Refresh data after adding
      dataUser();
    } catch (error) {
      console.error("Error adding project:", error.message);
    }
  };

  const handleUploadButtonClick = (projectId) => {
    setSelectedProjectId(projectId);
    setIsUploadModalOpen(true);
  };

  const dataUser = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/project", {
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
      console.error("Error fetching projects:", error.message);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const tokenExpiration = sessionStorage.getItem("tokenExpiration");

    if (!token || !tokenExpiration) {
      const currentTime = new Date().getTime();

      if (currentTime > tokenExpiration) {
        navigate("/auth/login");
      }
    }
  }, [navigate]);

  useEffect(() => {
    dataUser();
  }, []);

  if (!userData) {
    return <Loading />;
  }

  return (
    <>
      <div className="overflow-x-auto md:m-20 shadow-xl">
        <div className="flex justify-between mx-4 mb-4">
          <h2 className="text-2xl font-semibold">Projects</h2>
          <button className="btn btn-gr" onClick={handleAddButtonClick}>
            Add Project
          </button>
        </div>
        <table className="table">
          <thead>
            <tr className="text-center">
              <th>No</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Link</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.data.map((data, index) => (
              <tr key={data.id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={
                            data.photo === null || data.photo === ""
                              ? "https://res.cloudinary.com/dro4ilrjo/image/upload/v1710256875/jvr50ytruzrjop3v2ur0.png"
                              : data.photo
                          }
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{data.name}</div>
                    </div>
                  </div>
                </td>
                <td>{data.category_project.name}</td>
                <td>{data.description}</td>
                <td>
                  <div className="font-bold">{data.link}</div>
                  <div className="text-sm opacity-50">{data.github}</div>
                </td>
                <th>
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
                    onClick={() => handleUploadButtonClick(data.id)}
                  >
                    Gambar
                  </button>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => {
                      deleteProject(data.id, dataUser);
                    }}
                  >
                    Hapus
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>

        <dialog id="modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              Pilih yang akan kamu ubah!
            </h3>
            <div className="flex flex-wrap gap-3 justify-center items-center">
              <form method="dialog">
                <button
                  className="btn modal-action"
                  onClick={() => {
                    setIsEditModalOpen(true);
                    setEditableProject(editableProject);
                  }}
                >
                  Data
                </button>
              </form>
              <form method="dialog">
                <button
                  className="btn modal-action"
                  onClick={() => {
                    setIsUploadModalOpen(true);
                    setSelectedProjectId(
                      editableProject ? editableProject.id : null
                    );
                  }}
                >
                  Gambar
                </button>
              </form>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button
                  className="btn"
                  onClick={() => setIsUploadModalOpen(false)}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>

        {isEditModalOpen && (
          <ModalEditProject
            editableProject={editableProject}
            onSave={handleSaveEdit}
            onClose={handleCloseEditModal}
          />
        )}

        {isAddModalOpen && (
          <ModalAddProject
            onSave={handleSaveAdd}
            onClose={handleCloseAddModal}
          />
        )}

        {isUploadModalOpen && (
          <ModalUploadImage
            projectId={selectedProjectId}
            onUpload={dataUser} // Refresh data after successful upload
            onClose={handleCloseUploadModal}
          />
        )}
      </div>

      <CategoryProject />
    </>
  );
};

export default Project;
