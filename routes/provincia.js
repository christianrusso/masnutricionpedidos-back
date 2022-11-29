const express = require('express');
const conexion = require('../database');
const router = express.Router();
const { format } = require('date-fns');

router.post('/crear', async (req, res, next) => {
  console.log(req.body);
  const {DescBreve, Descripcion } = req.body;
  conexion.query(
    'INSERT INTO provincia (DescBreve, Descripcion) VALUES (?,?); ',
    [DescBreve, Descripcion],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      res.json({ Status: 'Provincia creada' });
    }
  );
});

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

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { DescBreve, Descripcion} = req.body;
  conexion.query(
    'UPDATE provincia SET DescBreve = ?, Descripcion = ? WHERE idProvincia = ?',
    [DescBreve, Descripcion, id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Provincia Actualizada' });
      } else {
        console.log(err);
      }
    }
  );
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    conexion.query('DELETE FROM provincia WHERE idProvincia = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Provincia eliminada' });
      } else {
        console.log(err);
      }
    });
});

module.exports = router;