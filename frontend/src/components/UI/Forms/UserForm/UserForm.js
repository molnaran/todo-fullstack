import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import styles from "../Form.module.css";

const UserForm = props => {
  const { handleSubmit, errors, watch, register } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  let intialValues = {
    name: props.name ? props.name : "",
    email: props.email ? props.email : ""
  };

  const onFormSubmit = async (user, e) => {
    e.preventDefault();
    props.onFormSubmit(user);
    e.target.reset();
  };

  let inputValidation = {
    required: "Name is required",
    max: { value: 100, message: "Name is too long!" },
    min: { value: 1, message: "Name is too short!" },
    maxLength: 80,
    pattern: {
      value: /[\p{L} ]*/,
      message: "The name has invalid characters!"
    }
  };
  let emailValidation = {
    required: { value: props.required, message: "Email is required!" },
    pattern: { value: /^\S+@\S+$/i, message: "Invalid email!" }
  };
  let passwordValidation = {
    required: { value: props.required, message: "Password is required!" },
    validate: value =>
      value.length > 6 || "Password must be at leas 6 characters long!"
  };
  let confirmPasswordValidation = {
    validate: value =>
      value === password.current || "The passwords do not match!"
  };
  let content = (
    <div className={styles.Form}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className={styles.FormControl}>
          <input
            defaultValue={intialValues.name}
            id="name"
            type="text"
            placeholder="Name"
            name="name"
            ref={register(inputValidation)}
          />
          <div className={styles.ErrorField}>
            {errors.name && errors.name.message}
          </div>
        </div>
        <div className={styles.FormControl}>
          <input
            defaultValue={intialValues.email}
            type="text"
            placeholder="Email"
            name="email"
            ref={register(emailValidation)}
          />
          <div className={styles.ErrorField}>
            {errors.email && errors.email.message}
          </div>
        </div>
        <div className={styles.FormControl}>
          <input
            type="text"
            placeholder="Password"
            name="password"
            ref={register(passwordValidation)}
          />
          <div className={styles.ErrorField}>
            {errors.password && errors.password.message}
          </div>
        </div>
        <div className={styles.FormControl}>
          <input
            name="confirmPassword"
            type="text"
            placeholder="Confirm password"
            ref={register(confirmPasswordValidation)}
          />
        </div>
        <div className={styles.ErrorField}>
          {errors.confirmPassword && errors.confirmPassword.message}
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

export default UserForm;
