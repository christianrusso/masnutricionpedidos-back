const express = require('express');
const conexion = require('../database');
const router = express.Router();
const { format } = require('date-fns');

router.post('/crear', async (req, res, next) => {
  console.log(req.body);
  const {idCliente,descripcion, usuarioGraba} = req.body;
  const fechaGraba = new Date();
  conexion.query(
    'INSERT INTO email (idCliente,descripcion,fechaGraba, usuarioGraba) VALUES (?,?,?,?); ',
    [idCliente,descripcion,fechaGraba, usuarioGraba],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      res.json({ Status: 'Email creado' });
    }
  );
});

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    conexion.query(
      'SELECT * FROM email WHERE idEmail = ?',
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
  conexion.query('SELECT * FROM email ORDER BY idEmail DESC', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { idCliente,descripcion, usuarioModifica } = req.body;
  const fechaModifica = new Date();
  conexion.query(
    'UPDATE email SET idCliente = ?, descripcion = ?, fechaModifica = ?, usuarioModifica = ? WHERE idEmail = ?',
    [idCliente,descripcion,fechaModifica, usuarioModifica, id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Email Actualizado' });
      } else {
        console.log(err);
      }
    }
  );
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    conexion.query('DELETE FROM email WHERE idEmail = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Email eliminado' });
      } else {
        console.log(err);
      }
    });
});

module.exports = router;