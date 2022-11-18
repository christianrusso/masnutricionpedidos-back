const express = require('express');
const conexion = require('../database');
const router = express.Router();
const { format } = require('date-fns');




router.post('/crear', async (req, res, next) => {
  const { Descripcion, usuarioGraba} = req.body;
  const fechaCambiada = format(Date.parse(new Date()), 'yyyy-MM-dd');
  conexion.query(
    'INSERT INTO tiporeglacomercial (Descripcion, fechaGraba, usuarioGraba) VALUES (?, ?, ?); ',
    [Descripcion, fechaCambiada, usuarioGraba],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      res.json({ Status: 'Tipo Regla Comercial creado' });
    }
  );
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  conexion.query('SELECT * FROM tiporeglacomercial WHERE idTipoReglaComercial = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.get('', (req, res, next) => {
  conexion.query('SELECT * FROM tiporeglacomercial ORDER BY idTipoReglaComercial DESC', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { Descripcion, fechaModifica, usuarioModifica, usuarioGraba} = req.body;
  conexion.query(
    'UPDATE tiporeglacomercial SET Descripcion = ?,usuarioGraba = ? , fechaModifica = ?, usuarioModifica = ? WHERE idTipoReglaComercial  = ?',
    [Descripcion,usuarioGraba, fechaModifica, usuarioModifica, id  ],
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
  const { id } = req.params;
  conexion.query('DELETE FROM tiporeglacomercial WHERE idTipoReglaComercial = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: 'Tipo Regla Comercial eliminado' });
    } else {
      console.log(err);
    }
  });
});



module.exports = router;
