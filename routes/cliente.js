const express = require('express');
const conexion = require('../database');
const router = express.Router();
const { format } = require('date-fns');




router.post('/crear', async (req, res, next) => {
  console.log(req.body);
  const {Descripcion,usuarioGraba } = req.body;
  const fechaCambiada = format(Date.parse(new Date()), 'yyyy-MM-dd');
  conexion.query(
    'INSERT INTO tipocliente (Descripcion, fechaGraba,usuarioGraba) VALUES (?,?,?); ',
    [Descripcion, fechaCambiada, usuarioGraba],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      res.json({ Status: 'Tipo Cliente creado' });
    }
  );
});

router.get('/:id', (req, res, next) => {
  const { id  } = req.params;
  conexion.query('SELECT * FROM tipocliente WHERE idTipoCliente  = ?', [id ], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.get('', (req, res, next) => {
  conexion.query('SELECT * FROM tipocliente ORDER BY idTipoCliente DESC', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.put('/:id', (req, res) => {
  const { id  } = req.params;
  const { Descripcion, usuarioModifica} = req.body;
  const fechaCambiada = format(Date.parse(new Date()), 'yyyy-MM-dd');
  conexion.query(
    'UPDATE tipocliente SET Descripcion = ?, fechaModifica = ?, usuarioModifica = ? WHERE idTipoCliente = ?',
    [Descripcion, fechaCambiada, usuarioModifica, id ],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Tipo Cliente Actualizado' });
      } else {
        console.log(err);
      }
    }
  );
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  conexion.query('DELETE FROM tipocliente WHERE idTipoCliente = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: 'Tipo Cliente eliminado' });
    } else {
      console.log(err);
    }
  });
});



module.exports = router;
