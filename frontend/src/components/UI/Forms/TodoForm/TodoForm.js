import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "../Form.module.css";
import moment from "moment";
import { datetimeformat } from "../../../../config/constants";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const TodoForm = props => {
  const [date, setDate] = useState(null);
  const { handleSubmit, errors, register, reset, setValue } = useForm();

  useEffect(() => {
    const initDate = () => {
      register({ name: "date" }, { required: "Date is required!" });
      const parsedDate = Date.parse(props.dueDate);
      if (!isNaN(parsedDate)) {
        setValue("date", parsedDate);
        setDate(parsedDate);
      }
    };
    initDate();
  }, [props.dueDate, register, setValue]);

  let intialValues = {
    title: props.title ? props.title : "",
    description: props.description ? props.description : ""
  };

  let titleValidation = {
    required: "Title is required",
    maxLength: { value: 20, message: "Title too long!" }
  };
  let descriptionValidation = {
    maxLength: { value: 250, message: "Description too long!" }
  };

  const onFormSubmit = async (todo, e) => {
    e.preventDefault();
    const dueDateString = moment(todo.date).format(datetimeformat);

    const todoObject = {
      title: todo.title,
      description: todo.description,
      dueDate: dueDateString
    };
    props.onFormSubmit(todoObject);
    reset({
      title: "",
      description: ""
    });
    e.target.reset();
    setValue("date", null);
    setDate(null);
  };

  let content = (
    <div className={styles.Form}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className={styles.FormControl}>
          <input
            defaultValue={intialValues.title}
            type="text"
            placeholder="Title"
            name="title"
            ref={register(titleValidation)}
          />
          <div className={styles.ErrorField}>
            {errors.title && errors.title.message}
          </div>
        </div>

        <div className={styles.FormControl}>
          <textarea
            defaultValue={intialValues.description}
            placeholder="Description"
            name="description"
            ref={register(descriptionValidation)}
          />

          <div className={styles.ErrorField}>
            {errors.description && errors.description.message}
          </div>
        </div>
        <div>
          <label className={styles.Label} htmlFor="dateInput">
            Pick a date:
          </label>
          <DatePicker
            name="dateInput"
            selected={date}
            onChange={val => {
              setDate(val);
              setValue("date", val);
            }}
            showTimeSelect
            dateFormat="Pp"
          />
          <div className={styles.ErrorField}>
            {errors.date && errors.date.message}
          </div>
        </div>

        <div className={styles.FormActions}>
          <button className={styles.Button} type="submit">
            {props.buttonText}
          </button>
        </div>
      </form>
    </div>
  );
  return <div>{content}</div>;
};
export default TodoForm;
