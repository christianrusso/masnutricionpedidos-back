const express = require('express');
const conexion = require('../database');
const router = express.Router();
const { format } = require('date-fns');


router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    conexion.query(
      'SELECT * FROM provincia WHERE idProvincia = ?',
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
  conexion.query('SELECT * FROM provincia ORDER BY idProvincia DESC', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

module.exports = router;