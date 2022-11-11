const express = require('express');
const conexion = require('../database');
const router = express.Router();




router.post('/crear', async (req, res, next) => {
  const { Descripcion, fechaGraba, usuarioGraba} = req.body;
  conexion.query(
    'INSERT INTO tipopermiso (Descripcion, fechaGraba, usuarioGraba) VALUES (?, ?, ?); ',
    [Descripcion, fechaGraba, usuarioGraba],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      res.json({ Status: 'Tipo Permiso creado' });
    }
  );
});

router.get('/:id', (req, res, next) => {
  const { idTipoPermiso   } = req.params;
  conexion.query('SELECT * FROM tipopermiso WHERE idTipoPermiso   = ?', [idTipoPermiso  ], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.get('', (req, res, next) => {
  conexion.query('SELECT * FROM tipopermiso ORDER BY idTipoCliente DESC', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.put('/:id', (req, res) => {
  const { idTipoPermiso   } = req.params;
  const { Descripcion, fechaModifica, usuarioModifica} = req.body;
  conexion.query(
    'UPDATE tipopermiso SET Descripcion = ?, fechaModifica = ?, usuarioModifica = ? WHERE idTipoPermiso  = ?',
    [Descripcion, fechaModifica, usuarioModifica, idTipoPermiso  ],
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
  const { idTipoPermiso  } = req.params;
  conexion.query('DELETE FROM tipopermiso WHERE idTipoPermiso = ?', [idTipoPermiso ], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: 'Tipo Permiso eliminado' });
    } else {
      console.log(err);
    }
  });
});



module.exports = router;
