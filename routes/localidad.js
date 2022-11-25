const express = require('express');
const conexion = require('../database');
const router = express.Router();
const { format } = require('date-fns');


router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    conexion.query(
      'SELECT * FROM localidad WHERE idLocalidad = ?',
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
  conexion.query('SELECT * FROM localidad ORDER BY idLocalidad DESC', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    conexion.query('DELETE FROM localidad WHERE idLocalidad = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Localidad eliminada' });
      } else {
        console.log(err);
      }
    });
});

module.exports = router;