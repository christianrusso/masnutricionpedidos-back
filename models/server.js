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
    this.rutasTipo();
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

  rutasTipo() {
    //rutas de tipo canal
    this.app.use('/api/tipo-canal', require('../routes-tipo/canal'));
    //rutas de tipo clientes
    this.app.use('/api/tipo-cliente', require('../routes-tipo/cliente'));
    //rutas de tipo condiciones de venta
    this.app.use('/api/tipo-condiciones', require('../routes-tipo/condicionesVenta'));
    //rutas de tipo familia de producto
    this.app.use('/api/tipo-familia', require('../routes-tipo/familiaProducto'));
    //rutas de tipo iva
    this.app.use('/api/tipo-iva', require('../routes-tipo/iva'));
    //rutas de tipo permiso
    this.app.use('/api/tipo-permiso', require('../routes-tipo/permiso'));
    //rutas de tipo productos
    this.app.use('/api/tipo-producto', require('../routes-tipo/producto'));
    //rutas de tipo regla comercial
    this.app.use('/api/tipo-reglaComercial', require('../routes-tipo/reglaComercial'));
    //rutas de tipo telefono
    this.app.use('/api/tipo-telefono', require('../routes-tipo/telefono'));
  }

  rutas(){
    //rutas de usuario
    this.app.use('/api/usuario', require('../routes/usuario'));
    //rutas de clientes
    this.app.use('/api/cliente', require('../routes/cliente'));
    //rutas de empresa
    this.app.use('/api/empresa', require('../routes/empresa'));
    //rutas de vendedor
    this.app.use('/api/vendedor', require('../routes/vendedor'));
    //rutas de localidad
    this.app.use('/api/localidad', require('../routes/localidad'));
    //rutas de provincia
    this.app.use('/api/provincia', require('../routes/provincia'));
    //rutas de pedido
    this.app.use('/api/pedido', require('../routes/pedido'));
    //rutas de acceso
    this.app.use('/api/acceso', require('../routes/grupoAcceso'));
    //rutas de accesoPermiso
    this.app.use('/api/accesoPermiso', require('../routes/grupoAccesoPermiso'));
    //rutas de telefono
    this.app.use('/api/telefono', require('../routes/telefono'));
    //rutas de email
    this.app.use('/api/email', require('../routes/email'));
    //rutas de detalleOperacion
    this.app.use('/api/operacion', require('../routes/detalleOperacion'));
    //rutas de detallePedido
    this.app.use('/api/detallePedido', require('../routes/detallePedido'));
    //rutas de producto
    this.app.use('/api/producto', require('../routes/producto'));
  }


  listen() {
    this.app.listen(this.port, () => {
      console.log('El servidor esta corriendo en el puerto', this.port);
    });
  }
}

module.exports = Servidor;
