const express = require('express');
const conexion = require('../database');
const router = express.Router();
const { format } = require('date-fns');

router.post('/crear', async (req, res, next) => {
  console.log(req.body);
  const {idProvincia,DescBreve, Descripcion,CodigoPostal } = req.body;
  conexion.query(
    'INSERT INTO localidad (idProvincia,DescBreve, Descripcion,CodigoPostal) VALUES (?,?,?,?); ',
    [idProvincia,DescBreve, Descripcion,CodigoPostal],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      res.json({ Status: 'Localidad creada' });
    }
  );
});

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

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { idProvincia,DescBreve, Descripcion,CodigoPostal } = req.body;
  conexion.query(
    'UPDATE localidad SET idProvincia = ?, DescBreve = ?, Descripcion = ?, CodigoPostal = ? WHERE idLocalidad = ?',
    [idProvincia,DescBreve, Descripcion,CodigoPostal, id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Localidad Actualizada' });
      } else {
        console.log(err);
      }
    }
  );
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