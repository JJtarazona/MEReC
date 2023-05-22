import React from "react";
import PathRoutes from "../../helpers/Routes.helper";
import { Link } from "react-router-dom";
import styles from "./Index.module.css";

function NavBar() {
  return (
    <div className={styles.linkNavBar}>
      <Link to={PathRoutes.MERECE}>MEReC</Link>
      <Link to={PathRoutes.HOME}>Inicio</Link>
    </div>
  );
}

export default NavBar;
