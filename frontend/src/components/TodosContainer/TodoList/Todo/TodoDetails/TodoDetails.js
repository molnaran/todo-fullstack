import React, { Fragment } from "react";

const TodoDetails = props => {
  const { title, description, dueDate } = props;
  return (
    <Fragment>
      <p>Title: {title}</p>
      <p>Description: {description}</p>
      <p>Duedate: {dueDate} </p>
    </Fragment>
  );
};
export default TodoDetails;
