const express = require('express');
const conexion = require('../database');
const router = express.Router();
const { format } = require('date-fns');

router.post('/crear', async (req, res, next) => {
  console.log(req.body);
  const {idCliente,idTipoTelefono,descripcion, usuarioGraba} = req.body;
  const fechaGraba = new Date();
  conexion.query(
    'INSERT INTO telefono (idCliente,idTipoTelefono,descripcion,fechaGraba, usuarioGraba) VALUES (?,?,?,?,?); ',
    [idCliente,idTipoTelefono,descripcion,fechaGraba, usuarioGraba],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      res.json({ Status: 'Telefono creado' });
    }
  );
});

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    conexion.query(
      'SELECT * FROM telefono WHERE idTelefono = ?',
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
  conexion.query('SELECT * FROM telefono ORDER BY idTelefono DESC', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { idCliente,idTipoTelefono,descripcion, usuarioModifica } = req.body;
  const fechaModifica = new Date();
  conexion.query(
    'UPDATE telefono SET idCliente = ?, idTipoTelefono = ?, descripcion = ?, fechaModifica = ?, usuarioModifica = ? WHERE idTelefono = ?',
    [idCliente,idTipoTelefono,descripcion,fechaModifica, usuarioModifica, id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Telefono Actualizado' });
      } else {
        console.log(err);
      }
    }
  );
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    conexion.query('DELETE FROM telefono WHERE idTelefono = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Telefono eliminado' });
      } else {
        console.log(err);
      }
    });
});

module.exports = router;