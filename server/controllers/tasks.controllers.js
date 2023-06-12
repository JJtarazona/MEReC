const getTaks = (req, res) => {
  res.send("Obteniendo tarea");
};

const getTak = (req, res) => {
  res.send("Obteniendo una tarea");
};

const createTaks = (req, res) => {
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
