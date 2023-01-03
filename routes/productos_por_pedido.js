const express = require('express');
const conexion = require('../database');
const router = express.Router();
const { format } = require('date-fns');


router.post('/crear', async (req, res, next) => {
  console.log(req.body);
  const {
    idPedido,
    idProducto,
    codigo,
    descripcion,
    precio,
    cantidad,
    unidades_bulto,
    pallets,
    condicion,
    total,
    usuarioGraba
  } = req.body;
  const fechaGraba = new Date();
  conexion.query(
    'INSERT INTO productos_por_pedido (idPedido,cantidad, detalle,porcDescuentoItem,precioUnitario,importe,isEntregadoItem,fechaGraba, usuarioGraba) VALUES (?,?,?,?,?,?,?,?,?); ',
    [
      idPedido,
      cantidad,
      detalle,
      porcDescuentoItem,
      precioUnitario,
      importe,
      isEntregadoItem,
      fechaGraba,
      usuarioGraba
    ],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      res.json({ Status: 'Producto por pedido creado' });
    }
  );
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  conexion.query('SELECT * FROM productos_por_pedido WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.get('', (req, res, next) => {
  conexion.query('SELECT * FROM productos_por_pedido ORDER BY id DESC', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const {
    idPedido,
    cantidad,
    detalle,
    porcDescuentoItem,
    precioUnitario,
    importe,
    isEntregadoItem,
    usuarioModifica
  } = req.body;
  const fechaModifica = new Date();
  conexion.query(
    'UPDATE productos_por_pedido SET idPedido = ?, cantidad = ?, detalle = ?, porcDescuentoItem = ?, precioUnitario = ?, importe = ?, isEntregadoItem = ?, fechaModifica = ?, usuarioModifica = ? WHERE id = ?',
    [
      idPedido,
      cantidad,
      detalle,
      porcDescuentoItem,
      precioUnitario,
      importe,
      isEntregadoItem,
      fechaModifica,
      usuarioModifica,
      id
    ],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Producto por pedido Actualizado' });
      } else {
        console.log(err);
      }
    }
  );
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  conexion.query('DELETE FROM productos_por_pedido WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: 'Producto por pedido eliminado' });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
