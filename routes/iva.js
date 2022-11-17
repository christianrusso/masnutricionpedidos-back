const express = require('express');
const conexion = require('../database');
const router = express.Router();
const { format } = require('date-fns');

router.post('/crear', async (req, res, next) => {
  const { Descripcion, DescBreve, usuarioGraba } = req.body;
  const fechaCambiada = format(Date.parse(new Date()), 'yyyy-MM-dd');
  conexion.query(
    'INSERT INTO tipoiva (Descripcion,DescBreve, fechaGraba,usuarioGraba ) VALUES (?,?,?,?); ',
    [Descripcion, DescBreve, fechaCambiada, usuarioGraba],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      res.json({ Status: 'Tipo IVA creado' });
    }
  );
});

router.get('', (req, res, next) => {
  conexion.query('SELECT * FROM tipoiva ORDER BY idTipoIVA  DESC', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  conexion.query('SELECT * FROM tipoiva WHERE idTipoIVA   = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { Descripcion, DescBreve, fechaModifica, usuarioModifica, usuarioGraba } = req.body;
  conexion.query(
    'UPDATE  tipoiva SET Descripcion = ?, DescBreve = ?, usuarioGraba = ?, fechaModifica = ?, usuarioModifica = ? WHERE idTipoIVA = ?',
    [Descripcion, DescBreve,usuarioGraba, fechaModifica, usuarioModifica, id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Tipo IVA Actualizado' });
      } else {
        console.log(err);
      }
    }
  );
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  conexion.query('DELETE FROM tipoiva WHERE idTipoIVA  = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: 'Tipo IVA eliminado' });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
