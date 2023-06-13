const { pool } = require("../db");

const getTaks = (req, res) => {
  res.send("Obteniendo tarea");
};

const getTak = (req, res) => {
  res.send("Obteniendo una tarea");
};

const createTaks = async (req, res) => {
  const {
    date_rel,
    name_user,
    type_doc,
    number_doc,
    eps,
    number_auto,
    date_auto,
    date_venci,
    copago,
    recibo,
    Servicio,
    date_start_tera,
    date_end_tera,
  } = req.body;
  const result = await pool
    .promise()
    .query(
      "INSERT INTO tasks (date_rel, name_user, type_doc, number_doc, eps, number_auto, date_auto, date_venci, copago, recibo, Servicio, date_start_tera, date_end_tera) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        date_rel,
        name_user,
        type_doc,
        number_doc,
        eps,
        number_auto,
        date_auto,
        date_venci,
        copago,
        recibo,
        JSON.stringify(Servicio),
        date_start_tera,
        date_end_tera,
      ]
    );

  console.log(result);
  res.send("Creando Tarea");
};

const updateTaks = (req, res) => {
  res.send("Actualizando Tarea");
};

const deleteTaks = (req, res) => {
  res.send("Eliminando Tarea");
};

module.exports = {
  getTaks,
  getTak,
  createTaks,
  updateTaks,
  deleteTaks,
};
