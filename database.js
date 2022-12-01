const mysql = require('mysql');

const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'masnutricionpedidos',
  password: 'masnutricionpedidos', //'1682951!Abmtoba',
  database: 'masnutricionpedidos'
});
conexion.connect(error => {
  if (error) {
    throw error;
  }
  console.log('¡Conectado a la base de datos MySQL!');
});

module.exports = conexion;
