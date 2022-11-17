const express = require('express');
const conexion = require('../database');
const router = express.Router();
const { format } = require('date-fns');




router.post('/crear', async (req, res, next) => {
  const { Descripcion, usuarioGraba} = req.body;
  const fechaCambiada = format(Date.parse(new Date()), 'yyyy-MM-dd');
  conexion.query(
    'INSERT INTO tipopermiso (Descripcion, fechaGraba, usuarioGraba) VALUES (?, ?, ?); ',
    [Descripcion, fechaCambiada, usuarioGraba],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      res.json({ Status: 'Tipo Permiso creado' });
    }
  );
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  conexion.query('SELECT * FROM tipopermiso WHERE idTipoPermiso   = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.get('', (req, res, next) => {
  conexion.query('SELECT * FROM tipopermiso ORDER BY idTipoPermiso DESC', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { Descripcion, usuarioModifica,  usuarioGraba } = req.body;
  const fechaCambiada = format(Date.parse(new Date()), 'yyyy-MM-dd');
  conexion.query(
    'UPDATE tipopermiso SET Descripcion = ?,  usuarioGraba = ? ,fechaModifica = ?, usuarioModifica = ? WHERE idTipoPermiso  = ?',
    [Descripcion,  usuarioGraba ,fechaCambiada, usuarioModifica, id  ],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Tipo Permiso Actualizado' });
      } else {
        console.log(err);
      }
    }
  );
});

router.delete('/:id', (req, res) => {
  const { id  } = req.params;
  conexion.query('DELETE FROM tipopermiso WHERE idTipoPermiso = ?', [id ], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: 'Tipo Permiso eliminado' });
    } else {
      console.log(err);
    }
  });
});



module.exports = router;
