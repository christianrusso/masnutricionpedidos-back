const express = require('express');
const conexion = require('../database');
const router = express.Router();
const { format } = require('date-fns');


router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    conexion.query(
      'SELECT * FROM pedido WHERE idPedido = ?',
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
  conexion.query('SELECT * FROM pedido ORDER BY idPedido DESC', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
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