const express = require('express');
const conexion = require('../database');
const router = express.Router();

router.post('/crear', async (req, res, next) => {
  const {Descripcion, fechaGraba,usuarioGraba } = req.body;
  conexion.query(
    'INSERT INTO tipocanal (Descripcion, fechaGraba,usuarioGraba) VALUES (?,?,?); ',
    [Descripcion, fechaGraba,usuarioGraba],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      res.json({ Status: 'Tipo Canal creado' });
    }
  );
});

router.get('', (req, res, next) => {
  conexion.query('SELECT * FROM tipocanal ORDER BY idTipoCanal DESC', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.get('/:id', (req, res, next) => {
  const { idTipoCanal } = req.params;
  conexion.query('SELECT * FROM tipocanal WHERE idTipoCanal = ?', [idTipoCanal], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.put('/:id', (req, res) => {
  const { idTipoCanal } = req.params;
  const { Descripcion, fechaModifica,usuarioModifica} = req.body;
  conexion.query(
    'UPDATE tipocanal SET Descripcion = ?, fechaModifica = ?,usuarioModifica = ? WHERE idTipoCanal = ?',
    [ Descripcion, fechaModifica,usuarioModifica, idTipoCanal],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Tipo Canal Actualizado' });
      } else {
        console.log(err);
      }
    }
  );
});

router.delete('/:id', (req, res) => {
  const { idTipoCanal } = req.params;
  conexion.query('DELETE FROM tipocanal WHERE idTipoCanal = ?', [idTipoCanal], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: 'Tipo Canal eliminado' });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;