import React, { useState, useEffect } from "react";
import UserList from "./UserControl/UserList/UserList";
import UserForm from "../UI/Forms/UserForm/UserForm";
import Modal from "../UI/Modal/Modal";

import { createErrorMessage } from "../../utils/errorHandler";
import axiosinstance from "../../axios-todo";

const MainPage = props => {
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  const removeUserHandler = async userId => {
    try {
      setLoading(true);
      setError(null);
      let result = await axiosinstance.delete("api/user/" + userId);

      setUsers(prevUsers =>
        prevUsers.filter(user => user.id !== result.data.id)
      );
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(createErrorMessage(e));
    }
  };

  const addUserHandler = async user => {
    try {
      setLoading(true);
      setError(null);
      let result = await axiosinstance.post("api/user/", user);
      const addedUser = result.data;
      setUsers(prevUsers => [...prevUsers, addedUser]);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(createErrorMessage(e));
    }
  };

  const updateUserHandler = async (userId, user) => {
    try {
      setLoading(true);
      setError(false);
      let result = await axiosinstance.patch("api/user/" + userId, user);

      const updatedUser = result.data;

      setUsers(prevUsers => {
        let userIndex = prevUsers.findIndex(user => {
          return user.id === userId;
        });
        return [
          ...prevUsers.slice(0, userIndex),
          updatedUser,
          ...prevUsers.slice(userIndex + 1)
        ];
      });
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(createErrorMessage(e));
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        let result = await axiosinstance.get("api/user/");
        setUsers(prevUsers => [...prevUsers, ...result.data]);
      } catch (e) {
        setLoading(false);
        setError(createErrorMessage(e));
      }
    };
    fetchUsers();
  }, []);

  let userContent = null;
  if (loading) {
    userContent = "Loading...";
  }
  let errorModal = null;
  if (error) {
    errorModal = (
      <Modal show={error} modalClosed={() => setError(false)}>
        <p>{error}</p>
      </Modal>
    );
  }
  if (users) {
    userContent = (
      <UserList
        onDelete={removeUserHandler}
        users={users}
        onUpdate={updateUserHandler}
      />
    );
  }

  const handleUserAddWithModal = user => {
    addUserHandler(user);
    setShowCreateUser(!showCreateUser);
  };

  return (
    <div>
      {errorModal}
      <button
        onClick={() =>
          setShowCreateUser(prevShowCreateUser => !prevShowCreateUser)
        }
      >
        {" "}
        Show add user!
      </button>
      {userContent}
      {showCreateUser && (
        <Modal
          show={showCreateUser}
          modalClosed={() => setShowCreateUser(!showCreateUser)}
        >
          <UserForm
            onFormSubmit={handleUserAddWithModal}
            buttonText={"Create User"}
          />
        </Modal>
      )}
    </div>
  );
};

export default MainPage;
