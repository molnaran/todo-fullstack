import React, { useState, Fragment } from "react";

import TodoForm from "../../../UI/Forms/TodoForm/TodoForm";
import TodoDetails from "./TodoDetails/TodoDetails";
import styles from "./Todo.module.css";

const Todo = props => {
  const [edit, setEdit] = useState(false);
  const { id, dueDate, title, description, done, onDelete } = props;

  const handleUpdateTodo = todo => {
    props.onUpdate(props.id, todo);
    setEdit(false);
  };

  const handleToogleTodo = () => {
    props.onUpdate(props.id, { done: !done });
  };
  let content = (
    <Fragment>
      <div className={styles.Check} onClick={() => handleToogleTodo()}>
        {done ? String.fromCharCode(10003) : String.fromCharCode(215)}
      </div>
      <div className={styles.TodoContent}>
        <TodoDetails
          title={title}
          dueDate={dueDate}
          description={description}
          done={done}
        />
      </div>
    </Fragment>
  );

  if (edit) {
    content = (
      <TodoForm
        buttonText={"Edit!"}
        title={title}
        dueDate={dueDate}
        description={description}
        onFormSubmit={handleUpdateTodo}
        className={styles.Todo}
      />
    );
  }
  return (
    <div className={styles.Todo}>
      {content}
      <div className={styles.TodoActions}>
        {" "}
        <button onClick={() => setEdit(!edit)}>
          {!edit ? "Edit" : "View"}
        </button>
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
    </div>
  );
};
export default Todo;
