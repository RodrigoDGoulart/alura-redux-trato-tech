import NavBar from "components/NavBar";
import styles from "./PaginaPadrao.module.scss";
import { Outlet } from "react-router-dom";

export default function PaginaPadrao() {
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles['container-outlet']}>
        <Outlet />
      </div>
    </div>
  );
}
