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
    codigo,
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
  console.log( req.body.pedido);
  conexion.query(
    'INSERT INTO pedido (isAnulado, isEnviadoxMail, isCobrado, isFinalizado, idCliente, idVendedor, idTipoReglaComercial, idAbono, idTipoCondicionesDeVenta, num_interno, representante, codigo, cuit, domicilio, telefono, transporte, observaciones, fechaPedido, porcDescuentoGeneral, descripcion, nroRemito, subtotal, impuestos, subtotal2, ivaInscriptoPorc, ivaInscripto, total, fechaGraba, usuarioGraba) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?); ',
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
      codigo,
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
              Number(producto.codigo),
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
    codigo,
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
  } = req.body.pedido;
  const fechaModifica = new Date();
  console.log("query modificar producto por pedido");
  conexion.query(
    'UPDATE pedido SET isAnulado = ?, isEnviadoxMail = ?, isCobrado = ?, isFinalizado = ?, idCliente = ?, idVendedor = ?, idTipoReglaComercial = ?, idAbono = ?, idTipoCondicionesDeVenta = ?, num_interno = ?, representante = ?, codigo = ?, cuit = ?, domicilio = ?, telefono = ?, transporte = ?, observaciones = ?, fechaPedido = ?, porcDescuentoGeneral = ?, descripcion = ?, nroRemito = ?, subtotal = ?, impuestos = ?, subtotal2 = ?, ivaInscriptoPorc = ?, ivaInscripto = ?, total = ?, fechaModifica = ?, usuarioModifica = ? WHERE idPedido = ?',
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
      codigo,
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
      fechaModifica,
      usuarioModifica,
      id
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
            'UPDATE productos_por_pedido SET idProducto =? , idCategoria =? , codigo =?, descripcion =? ,precio =? , cantidad =? , unidades_bulto =? , pallets =? , condicion =?, total =? , usuarioModifica =? , fechaModifica =? WHERE idPedido =?',
            [
              producto.idProducto,
              producto.idCategoria,
              producto.codigo,
              producto.descripcion,
              Number(producto.precio),
              producto.cantidad,
              producto.unidades_bulto,
              producto.pallets,
              producto.condicion,
              producto.total,
              producto.usuarioModifica,
              fechaModifica,
              idParseado
            ],
            (error, rows) => {
              console.log(rows);
              res.json(rows);
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
