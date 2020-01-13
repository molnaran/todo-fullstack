import React, { Fragment } from "react";
import Todo from "./Todo/Todo";
import styles from "./Todo/Todo";
import TodoForm from "../../UI/Forms/TodoForm/TodoForm";

const TodoList = props => {
  const { userId, onUpdate, onDelete, onAdd, todos } = props;
  let todoList = "No todos found! Start by adding them!";

  const addUserHandler = todo => {
    onAdd(userId, todo);
  };

  if (todos) {
    todoList = todos.map(todo => (
      <Todo
        key={todo.id}
        id={todo.id}
        dueDate={todo.dueDate}
        title={todo.title}
        description={todo.description}
        done={todo.done}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    ));
  }
  return (
    <Fragment>
      <div className={styles.Todo}>
        <TodoForm
          class
          onFormSubmit={addUserHandler}
          buttonText={"Add new todo!"}
        />
      </div>

      {todoList}
    </Fragment>
  );
};

export default TodoList;
