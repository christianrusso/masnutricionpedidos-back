const express = require('express');
const conexion = require('../database');
const router = express.Router();
const { format } = require('date-fns');

router.post('/crear', async (req, res, next) => {
  console.log(req.body);
  const {idPedido,cantidad, detalle,porcDescuentoItem,precioUnitario,importe,isEntregadoItem, usuarioGraba} = req.body;
  const fechaGraba = new Date();
  conexion.query(
    'INSERT INTO detallepedido (idPedido,cantidad, detalle,porcDescuentoItem,precioUnitario,importe,isEntregadoItem,fechaGraba, usuarioGraba) VALUES (?,?,?,?,?,?,?,?,?); ',
    [idPedido,cantidad, detalle,porcDescuentoItem,precioUnitario,importe,isEntregadoItem,fechaGraba, usuarioGraba],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      res.json({ Status: 'Detalle Pedido creado' });
    }
  );
});

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    conexion.query(
      'SELECT * FROM detallepedido WHERE idDetallePedido = ?',
      [id],
      (err, rows, fields) => {
        if (!err) {
          res.json(rows);
        } else {
          console.log(err);
        }
      }
    );
  });
  
router.get('', (req, res, next) => {
  conexion.query('SELECT * FROM detallepedido ORDER BY idDetallePedido DESC', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { idPedido,cantidad, detalle,porcDescuentoItem,precioUnitario,importe,isEntregadoItem, usuarioModifica } = req.body;
  const fechaModifica = new Date();
  conexion.query(
    'UPDATE detallepedido SET idPedido = ?, cantidad = ?, detalle = ?, porcDescuentoItem = ?, precioUnitario = ?, importe = ?, isEntregadoItem = ?, fechaModifica = ?, usuarioModifica = ? WHERE idDetallePedido = ?',
    [idPedido,cantidad, detalle,porcDescuentoItem,precioUnitario,importe,isEntregadoItem,fechaModifica, usuarioModifica, id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Detalle Pedido Actualizado' });
      } else {
        console.log(err);
      }
    }
  );
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    conexion.query('DELETE FROM detallepedido WHERE idDetallePedido = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Detalle Pedido eliminado' });
      } else {
        console.log(err);
      }
    });
});

module.exports = router;