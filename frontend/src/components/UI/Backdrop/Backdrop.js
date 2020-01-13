import React from "react";
import styles from "./Backdrop.module.css";

const Backdrop = props => {
  return (
    <div>
      {props.show ? (
        <div className={styles.Backdrop} onClick={props.clicked}></div>
      ) : null}
    </div>
  );
};
export default Backdrop;
