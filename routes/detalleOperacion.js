const express = require('express');
const conexion = require('../database');
const router = express.Router();
const { format } = require('date-fns');

router.post('/crear', async (req, res, next) => {
  console.log(req.body);
  const {idPedido,idDetallePedido,cantidad, detalle,porcDescuentoItem,precioUnitario,importe, usuarioGraba} = req.body;
  const fechaGraba = new Date();
  conexion.query(
    'INSERT INTO detalleoperacion (idPedido,idDetallePedido,cantidad, detalle,porcDescuentoItem,precioUnitario,importe,fechaGraba, usuarioGraba) VALUES (?,?,?,?,?,?,?,?,?); ',
    [idPedido,idDetallePedido,cantidad, detalle,porcDescuentoItem,precioUnitario,importe,fechaGraba, usuarioGraba],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      res.json({ Status: 'Detalle Operacion creado' });
    }
  );
});

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    conexion.query(
      'SELECT * FROM detalleoperacion WHERE idOperacion = ?',
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
  conexion.query('SELECT * FROM detalleoperacion ORDER BY idOperacion DESC', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { idPedido,idDetallePedido,cantidad, detalle,porcDescuentoItem,precioUnitario,importe, usuarioModifica } = req.body;
  const fechaModifica = new Date();
  conexion.query(
    'UPDATE detalleoperacion SET idPedido = ?, idDetallePedido = ?, cantidad = ?, detalle = ?, porcDescuentoItem = ?, precioUnitario = ?, importe = ?, fechaModifica = ?, usuarioModifica = ? WHERE idOperacion = ?',
    [idPedido,idDetallePedido,cantidad, detalle,porcDescuentoItem,precioUnitario,importe,fechaModifica, usuarioModifica, id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Detalle Operacion Actualizado' });
      } else {
        console.log(err);
      }
    }
  );
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    conexion.query('DELETE FROM detalleoperacion WHERE idOperacion = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Detalle Operacion eliminado' });
      } else {
        console.log(err);
      }
    });
});

module.exports = router;