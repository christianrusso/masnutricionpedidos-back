const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const conexion = require('../database');

class Servidor {
  constructor() {
    //Iniciamos express
    this.app = express();

    //Puerto
    this.port = process.env.PORT || 3000;
    this.app.use(cors());

    // Llamar a la base de datos
    this.conectarDB();

    //MiddleWares
    this.middlewares();

    //Rutas del archivo
    this.rutas();
  }

  async conectarDB() {
    await conexion;
  }

  middlewares() {
    //Directorio publico (public)
    this.app.use(cors());
    this.app.use(express.json());
    //para procesar datos enviados desde forms
    this.app.use(express.urlencoded({ extended: true }));
    //para poder trabajar con las cookies
    this.app.use(cookieParser());
    //Para eliminar la cache
    this.app.use(function (req, res, next) {
      if (!req.user) res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      next();
    });
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    this.app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      );
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
      next();
    });
  }

  rutas() {
    //rutas de canal
    this.app.use('/api/canal', require('../routes/canal'));
    //rutas de clientes
    this.app.use('/api/cliente', require('../routes/cliente'));
    //rutas de condiciones de venta
    this.app.use('/api/condiciones', require('../routes/condicionesVenta'));
    //rutas de familia de producto
    this.app.use('/api/familia', require('../routes/familiaProducto'));
    //rutas de iva
    this.app.use('/api/iva', require('../routes/iva'));
    //rutas de permiso
    this.app.use('/api/permiso', require('../routes/permiso'));
    //rutas de productos
    this.app.use('/api/producto', require('../routes/producto'));
    //rutas de regla comercial
    this.app.use('/api/reglaComercial', require('../routes/reglaComercial'));
    //rutas de telefono
    this.app.use('/api/telefono', require('../routes/telefono'));
    //rutas de usuario
    this.app.use('/api/usuario', require('../routes/usuario'));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log('El servidor esta corriendo en el puerto', this.port);
    });
  }
}

module.exports = Servidor;
