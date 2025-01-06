import { forwardRef } from "react";
import styles from "./Input.module.scss";

function Input(props, ref) {
  return <input className={`${styles.input} ${props.className}`} ref={ref} {...props} />;
}

export default forwardRef(Input);
