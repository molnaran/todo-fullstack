import React, { useEffect, useState } from "react";
import TodoList from "./TodoList/TodoList";
import axiosinstance from "../../axios-todo";
import { createErrorMessage } from "../../utils/errorHandler";

const TodoContainer = props => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setError(null);
        let result = await axiosinstance.get(
          "api/user/" + props.userId + "/todo/"
        );
        setTodos(result.data);
      } catch (e) {
        setError(createErrorMessage(e));
      }
    };
    fetchTodos();
  }, [props.userId]);

  const updateTodoHandler = async (todoId, todo) => {
    try {
      setError(null);
      let result = await axiosinstance.patch("api/todo/" + todoId, todo);
      const updatedTodo = result.data;

      setTodos(prevTodos => {
        let todoIndex = prevTodos.findIndex(todo => {
          return todo.id === todoId;
        });
        return [
          ...prevTodos.slice(0, todoIndex),
          updatedTodo,
          ...prevTodos.slice(todoIndex + 1)
        ];
      });
    } catch (e) {
      setError(createErrorMessage(e));
    }
  };

  const removeTodoHandler = async todoId => {
    try {
      setError(null);
      let result = await axiosinstance.delete("api/todo/" + todoId);

      setTodos(prevTodos =>
        prevTodos.filter(todo => todo.id !== result.data.id)
      );
    } catch (e) {
      setError(createErrorMessage(e));
    }
  };

  const addTodoHandler = async (userId, todo) => {
    try {
      setError(null);
      let result = await axiosinstance.post(
        "api/user/" + userId + "/todo/",
        todo
      );
      const addedTodo = result.data;
      setTodos(prevTodos => [...prevTodos, addedTodo]);
    } catch (e) {
      setError(createErrorMessage(e));
    }
  };

  return (
    <div>
      <TodoList
        todos={todos}
        onUpdate={updateTodoHandler}
        onDelete={removeTodoHandler}
        onAdd={addTodoHandler}
        userId={props.userId}
      />
      {error}
    </div>
  );
};

export default TodoContainer;
