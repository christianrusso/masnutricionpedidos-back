const mysql = require('mysql');

const conexion = mysql.createPool({
  host: 'us-cdbr-east-05.cleardb.net',
  user: 'b45d2c3c7dab74',
  password: 'fb1a5735',
  database: 'heroku_2c952474016e43f'
});
// conexion.connect(error => {
//   if (error) {
//     throw error;
//   }
//   console.log('¡Conectado a la base de datos MySQL!');
// });

module.exports = conexion;
