const express = require('express');
const conexion = require('../database');
const router = express.Router();
const { format } = require('date-fns');

router.post('/crear', async (req, res, next) => {
  console.log(req.body);
  console.log('asdfasdfasdfasdfasdfasdfasdfa');
  const {
    isAnulado,
    isEnviadoxMail,
    isCobrado,
    isFinalizado,
    idCliente,
    idVendedor,
    idTipoReglaComercial,
    idAbono,
    idTipoCondicionesDeVenta,
    num_interno,
    representante,
    cod,
    cuit,
    domicilio,
    telefono,
    transporte,
    observaciones,
    fechaPedido,
    porcDescuentoGeneral,
    descripcion,
    nroRemito,
    subtotal,
    impuestos,
    subtotal2,
    ivaInscriptoPorc,
    ivaInscripto,
    total,
    usuarioGraba
  } = req.body.pedido;
  const fechaGraba = new Date();
  conexion.query(
    'INSERT INTO pedido (isAnulado, isEnviadoxMail, isCobrado, isFinalizado, idCliente, idVendedor, idTipoReglaComercial, idAbono, idTipoCondicionesDeVenta, num_interno, representante, cod, cuit, domicilio,telefono, transporte, observaciones,  fechaPedido, porcDescuentoGeneral, descripcion, nroRemito, subtotal, impuestos, subtotal2, ivaInscriptoPorc, ivaInscripto, total, fechaGraba, usuarioGraba ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?); ',
    [
      isAnulado,
      isEnviadoxMail,
      isCobrado,
      isFinalizado,
      idCliente,
      idVendedor,
      idTipoReglaComercial,
      idAbono,
      idTipoCondicionesDeVenta,
      num_interno,
      representante,
      cod,
      cuit,
      domicilio,
      telefono,
      transporte,
      observaciones,
      fechaPedido,
      porcDescuentoGeneral,
      descripcion,
      nroRemito,
      subtotal,
      impuestos,
      subtotal2,
      ivaInscriptoPorc,
      ivaInscripto,
      total,
      fechaGraba,
      usuarioGraba
    ],
    (error, rows) => {
      if (error) {
        console.log(error);
      } else {
        console.log(req.body.productos);
        req.body.productos.forEach(producto => {
          if (!producto.cantidad) {
            producto.cantidad = 1;
          }
          conexion.query(
            'INSERT INTO productos_por_pedido (idPedido, idProducto,idCategoria, codigo, descripcion, precio, cantidad, unidades_bulto, pallets, condicion, total, usuarioGraba, fechaGraba) VALUES (?, ?,?, ?,?,?,?,?,?,?,?,?,?);',
            [
              rows.insertId,
              producto.id_producto,
              producto.categoria,
              producto.codigo,
              producto.descripcion,
              producto.precioReferencia,
              producto.cantidad,
              producto.unidadesFijasPallet,
              producto.porcRelacionPallet,
              producto.condicion,
              producto.total,
              usuarioGraba,
              fechaGraba
            ],
            (error, rows) => {
              console.log(rows);
              if (error) {
                console.log(error);
              }
            }
          );
        });
      }
      res.json({ idVentaCreada: rows.insertId, Status: 200 });
    }
  );
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  conexion.query('SELECT * FROM pedido WHERE idPedido = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.get('', (req, res, next) => {
  conexion.query('SELECT * FROM pedido ORDER BY idPedido DESC', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const idParseado = parseInt(id);
  const {
    isAnulado,
    isEnviadoxMail,
    isCobrado,
    isFinalizado,
    idCliente,
    idVendedor,
    idTipoReglaComercial,
    idAbono,
    idTipoCondicionesDeVenta,
    num_interno,
    representante,
    cod,
    cuit,
    domicilio,
    telefono,
    transporte,
    observaciones,
    fechaPedido,
    porcDescuentoGeneral,
    descripcion,
    nroRemito,
    subtotal,
    impuestos,
    subtotal2,
    ivaInscriptoPorc,
    ivaInscripto,
    total,
    usuarioModifica
  } = req.body;
  const fechaCambiada = new Date();
  conexion.query(
    'UPDATE pedido SET isAnulado = ?, isEnviadoxMail = ?, isCobrado = ?, isFinalizado = ?, idCliente = ?, idVendedor = ?, idTipoReglaComercial = ?, idAbono = ?, idTipoCondicionesDeVenta = ?,  num_interno = ?, representante = ?, cod = ?, cuit = ?, domicilio = ? ,telefono = ?, transporte = ?, observaciones = ?,fechaPedido = ?, porcDescuentoGeneral = ?, descripcion = ?, nroRemito = ?, subtotal = ?, impuestos = ?, subtotal2 = ?, ivaInscriptoPorc = ?, ivaInscripto = ?, total = ?, fechaModifica = ?, usuarioModifica = ? WHERE idPedido = ?',
    [
      isAnulado,
      isEnviadoxMail,
      isCobrado,
      isFinalizado,
      idCliente,
      idVendedor,
      idTipoReglaComercial,
      idAbono,
      idTipoCondicionesDeVenta,
      num_interno,
      representante,
      cod,
      cuit,
      domicilio,
      telefono,
      transporte,
      observaciones,
      fechaPedido,
      porcDescuentoGeneral,
      descripcion,
      nroRemito,
      subtotal,
      impuestos,
      subtotal2,
      ivaInscriptoPorc,
      ivaInscripto,
      total,
      fechaCambiada,
      usuarioModifica,
      idParseado
    ],
    (err, rows, fields) => {
      if (!err) {
        console.log(req.body.productos);
        console.log(req.body);
        req.body.productos.forEach(producto => {
          if (!producto.cantidad) {
            producto.cantidad = 1;
          }
          conexion.query(
            'UPDATE INTO productos_por_pedido idProducto =? , idCategoria =? , cod =?, descripcion =? ,precio =? , cantidad =? , unidades_bulto =? , pallets =? , condicion =?, total =? , usuarioModifica =? , fechaModifica =? WHERE idPedido =?',
            [
              producto.id_producto,
              producto.categoria,
              producto.cod,
              producto.descripcion,
              producto.precio,
              producto.cantidad,
              producto.unidades_bulto,
              producto.pallets,
              producto.condicion,
              producto.total,
              usuarioModifica,
              fechaCambiada,
              rows.insertId
            ],
            (error, rows) => {
              console.log(rows);
              if (error) {
                console.log(error);
              }
            }
          );
        });
      } else {
        console.log(err);
      }
    }
  );
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  conexion.query('DELETE FROM pedido WHERE idPedido = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: 'Pedido eliminado' });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
