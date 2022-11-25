const express = require('express');
const conexion = require('../database');
const router = express.Router();
const { format } = require('date-fns');


router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    conexion.query(
      'SELECT * FROM vendedor WHERE idVendedor = ?',
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
  conexion.query('SELECT * FROM vendedor ORDER BY idVendedor DESC', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

module.exports = router;