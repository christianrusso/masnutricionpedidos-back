const express = require('express');
const conexion = require('../database');
const router = express.Router();
const { format } = require('date-fns');




router.post('/crear', async (req, res, next) => {
  const { descripcion, usuarioGraba} = req.body;
  const fechaCambiada = format(Date.parse(new Date()), 'yyyy-MM-dd');
  conexion.query(
    'INSERT INTO tipotelefono (descripcion, fechaGraba, usuarioGraba) VALUES (?, ?, ?); ',
    [descripcion, fechaCambiada, usuarioGraba],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      res.json({ Status: 'Tipo Telefono creado' });
    }
  );
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  conexion.query('SELECT * FROM tipotelefono WHERE idTipoTelefono  = ?', [id], (err, rows, fields) => {
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
  const { id } = req.params;
  const { descripcion, usuarioModifica} = req.body;
  const fechaCambiada = format(Date.parse(new Date()), 'yyyy-MM-dd');
  conexion.query(
    'UPDATE tipotelefono SET descripcion = ?, fechaModifica = ?, usuarioModifica = ? WHERE idTipoTelefono = ?',
    [descripcion, fechaCambiada, usuarioModifica, id ],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Tipo Telefono Actualizado' });
      } else {
        console.log(err);
      }
    }
  );
});

router.delete('/:id', (req, res) => {
  const { id} = req.params;
  conexion.query('DELETE FROM tipotelefono WHERE idTipoTelefono = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: 'Tipo Telefono eliminado' });
    } else {
      console.log(err);
    }
  });
});



module.exports = router;
