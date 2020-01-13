import React, { useState, Fragment } from "react";

import styles from "./User.module.css";
import UserDetails from "./UserDetails/UserDetails";
import UploadAvatar from "./UploadAvatar/UploadAvatar";
import UserForm from "../../../../UI/Forms/UserForm/UserForm";
import Modal from "../../../../UI/Modal/Modal";
import TodosContainer from "../../../../TodosContainer/TodosContainer";

const User = props => {
  const [edit, setEdit] = useState(false);
  const [showTodoList, setShowTodoList] = useState(false);

  const { id, name, email, password, confirmPassword, avatarPath } = props.user;

  const handleUserChange = user => {
    props.onUpdate(props.user.id, user);
    setEdit(false);
  };

  let userCard = (
    <Fragment>
      <UserDetails
        name={name}
        email={email}
        handleAvatarChange={handleUserChange}
        avatarPath={avatarPath}
        id={id}
      />
    </Fragment>
  );
  if (edit) {
    userCard = (
      <UserForm
        name={name}
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        onFormSubmit={handleUserChange}
        buttonText={"Edit User"}
      />
    );
  }

  return (
    <Fragment>
      <div className={styles.UserCard}>
        {userCard}
        {showTodoList ? (
          <Modal show={showTodoList} modalClosed={() => setShowTodoList(false)}>
            <TodosContainer userId={id} />
          </Modal>
        ) : null}
        <UploadAvatar userId={id} onAvatarChange={handleUserChange} />
        <button onClick={() => props.onDelete(id)}>Delete User</button>
        <button onClick={() => setEdit(!edit)}>
          {!edit ? "Edit User" : "View User"}
        </button>
        <button onClick={() => setShowTodoList(true)}>Show Todos</button>
      </div>
    </Fragment>
  );
};

export default User;
