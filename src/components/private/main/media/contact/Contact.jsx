import React, { useEffect, useState } from "react";
import Loading from "../../../../loading/Loading";
import ModalEditContact from "./ModalEditContact";
import ModalAddContact from "./ModalAddContact";

const addContact = async (addedData) => {
  try {
    const token = sessionStorage.getItem("token");

    const response = await fetch("http://localhost:8080/api/contact", {
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

const updateContact = async (id, updatedData) => {
  try {
    const token = sessionStorage.getItem("token");

    const response = await fetch(`http://localhost:8080/api/contact/${id}`, {
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

const Contact = () => {
  const [contactData, setContactData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editableContact, setEditableContact] = useState(null);

  const handleAddButtonClick = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = async (updatedContact) => {
    try {
      // Update the contact link logic here
      await updateContact(editableContact.id, updatedContact);

      // Refresh data after the update
      dataContact();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating contact link:", error.message);
    }
  };

  const handleSaveAdd = async (newContact) => {
    try {
      // Add the new contact link logic here
      await addContact(newContact);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error adding contact link:", error.message);
    }
  };

  const deleteContact = async (id) => {
    try {
      // Delete the contact link logic here
      const token = sessionStorage.getItem("token");

      const response = await fetch(`http://localhost:8080/api/contact/${id}`, {
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
      dataContact();
    } catch (error) {
      console.error("Error deleting contact link:", error.message);
    }
  };

  const dataContact = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/contact", {
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
      setContactData(responseData);
    } catch (error) {
      console.error("Error fetching contact links:", error.message);
    }
  };

  useEffect(() => {
    dataContact();
  }, []);

  if (!contactData) {
    return <Loading />;
  }

  return (
    <div className="overflow-x-auto md:m-20 shadow-xl">
      <div className="flex justify-between mx-4 mb-4">
        <h2 className="text-2xl font-semibold">Contact Links</h2>
        <button className="btn btn-gr" onClick={handleAddButtonClick}>
          Add Contact Link
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
          {contactData.data.map((data, index) => (
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
                    setEditableContact(data);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => {
                    deleteContact(data.id);
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
        <ModalEditContact
          editableContact={editableContact}
          onSave={handleSaveEdit}
          onClose={handleCloseEditModal}
        />
      )}

      {isAddModalOpen && (
        <ModalAddContact onSave={handleSaveAdd} onClose={handleCloseAddModal} />
      )}
    </div>
  );
};

export default Contact;
