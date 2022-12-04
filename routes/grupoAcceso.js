const express = require('express');
const conexion = require('../database');
const router = express.Router();
const { format } = require('date-fns');

router.post('/crear', async (req, res, next) => {
  console.log(req.body);
  const {Descripcion, usuarioGraba} = req.body;
  const isBorrado = 0
  const fechaGraba = new Date();
  conexion.query(
    'INSERT INTO grupoacceso (Descripcion,isBorrado, fechaGraba, usuarioGraba) VALUES (?,?,?,?); ',
    [Descripcion,isBorrado, fechaGraba, usuarioGraba],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      res.json({ Status: 'Acceso creado' });
    }
  );
});

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    conexion.query(
      'SELECT * FROM grupoacceso WHERE idGrupoAcceso = ?',
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
  conexion.query('SELECT * FROM grupoacceso ORDER BY idGrupoAcceso DESC', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const {Descripcion, usuarioModifica } = req.body;
  const fechaModifica = new Date();
  conexion.query(
    'UPDATE grupoacceso SET Descripcion = ?, fechaModifica = ?, usuarioModifica = ? WHERE idGrupoAcceso = ?',
    [Descripcion,fechaModifica, usuarioModifica, id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Acceso Actualizado' });
      } else {
        console.log(err);
      }
    }
  );
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    conexion.query('DELETE FROM grupoacceso WHERE idGrupoAcceso = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Acceso eliminado' });
      } else {
        console.log(err);
      }
    });
});

module.exports = router;