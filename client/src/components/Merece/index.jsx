import React from "react";
import { useState } from "react";
import styles from "./index.module.css";
import { BiSearchAlt2 } from "react-icons/bi";

//todo --> Como voy a limpiar los input luego de la busqueda
//todo --> Este componente no debe estar aquí toca moverlo y llamarlo a MEReC junto con la tabla con todos los caso.

function Merece() {
  const [autorizacion, setAutorizacion] = useState("");
  const [nombre, setNombre] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(autorizacion, nombre);
  };

  return (
    <div className={styles.contenedor}>
      <div className={styles.busqueda}>
        <form className={styles.campos} onSubmit={handleSubmit}>
          <label className={styles.inputs}>
            <input
              type="text"
              placeholder="Número de Autorización"
              className={styles.input}
              value={autorizacion}
              onChange={(e) => setAutorizacion(e.target.value)}
            />
          </label>

          <label className={styles.inputs}>
            <input
              type="text"
              placeholder="Nombre del Usuario"
              className={styles.input}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </label>
          <button className={styles.btn}>
            <BiSearchAlt2 class="" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Merece;
