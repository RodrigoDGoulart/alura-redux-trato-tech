import styles from "./Button.module.scss";

export default function Button({ children, type, onClick, ...props }) {
  return (
    <button className={styles.button} type={type} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
