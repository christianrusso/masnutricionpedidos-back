const express = require('express');
const conexion = require('../database');
const router = express.Router();
const { format } = require('date-fns');

router.post('/crear', async (req, res, next) => {
  console.log(req.body);
  const {idGrupoAcceso,idTipoPermiso} = req.body;
  const fechaGraba = new Date();
  conexion.query(
    'INSERT INTO grupoaccesopermiso (idGrupoAcceso,idTipoPermiso, fechaGraba, usuarioGraba) VALUES (?,?,?,?); ',
    [idGrupoAcceso,idTipoPermiso, fechaGraba, usuarioGraba],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      res.json({ Status: 'Acceso Permiso creado' });
    }
  );
});

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    conexion.query(
      'SELECT * FROM grupoaccesopermiso WHERE idGrupoAcceso = ?',
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
  conexion.query('SELECT * FROM grupoaccesopermiso ORDER BY idGrupoAcceso DESC', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const {idGrupoAcceso, idTipoPermiso, usuarioModifica } = req.body;
  const fechaModifica = new Date();
  conexion.query(
    'UPDATE grupoaccesopermiso SET idGrupoAcceso = ?, idTipoPermiso = ?, fechaModifica = ?, usuarioModifica = ? WHERE idGrupoAcceso = ?',
    [idGrupoAcceso, idTipoPermiso, fechaModifica, usuarioModifica, id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Acceso Permiso Actualizado' });
      } else {
        console.log(err);
      }
    }
  );
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    conexion.query('DELETE FROM grupoaccesopermiso WHERE idGrupoAcceso = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Acceso Permiso eliminado' });
      } else {
        console.log(err);
      }
    });
});

module.exports = router;