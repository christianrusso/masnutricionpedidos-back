const express = require('express');
const conexion = require('../database');
const router = express.Router();




router.post('/crear', async (req, res, next) => {
  const { descripcion, fechaGraba, usuarioGraba} = req.body;
  conexion.query(
    'INSERT INTO tipotelefono (descripcion, fechaGraba, usuarioGraba) VALUES (?, ?, ?); ',
    [descripcion, fechaGraba, usuarioGraba],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      res.json({ Status: 'Tipo Regla Comercial creado' });
    }
  );
});

router.get('/:id', (req, res, next) => {
  const { idTipoTelefono } = req.params;
  conexion.query('SELECT * FROM tipotelefono WHERE idTipoTelefono  = ?', [idTipoTelefono], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.get('', (req, res, next) => {
  conexion.query('SELECT * FROM tipotelefono ORDER BY idTipoTelefono DESC', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.put('/:id', (req, res) => {
  const { idTipoTelefono } = req.params;
  const { descripcion, fechaModifica, usuarioModifica} = req.body;
  conexion.query(
    'UPDATE tipotelefono SET descripcion = ?, fechaModifica = ?, usuarioModifica = ? WHERE idTipoTelefono = ?',
    [descripcion, fechaModifica, usuarioModifica, idTipoTelefono ],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Tipo Regla Comercial Actualizado' });
      } else {
        console.log(err);
      }
    }
  );
});

router.delete('/:id', (req, res) => {
  const { idTipoTelefono   } = req.params;
  conexion.query('DELETE FROM tipotelefono WHERE idTipoTelefono = ?', [idTipoTelefono], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: 'Tipo Regla Comercial eliminado' });
    } else {
      console.log(err);
    }
  });
});



module.exports = router;
