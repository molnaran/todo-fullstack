import React from "react";
import User from "./User/User";

const UserList = props => {
  let userList = "No users found! Start adding them!";

  if (props.users !== null && props.users.length !== 0) {
    userList = props.users.map(user => (
      <User
        key={user.id}
        user={user}
        onDelete={props.onDelete}
        onUpdate={props.onUpdate}
      />
    ));
  }
  return <div>{userList}</div>;
};

export default UserList;
