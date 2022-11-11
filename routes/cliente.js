const express = require('express');
const conexion = require('../database');
const router = express.Router();




router.post('/crear', async (req, res, next) => {
  const { Descripcion, fechaGraba, usuarioGraba} = req.body;
  conexion.query(
    'INSERT INTO tipocliente (Descripcion, fechaGraba, usuarioGraba) VALUES (?, ?, ?); ',
    [Descripcion, fechaGraba, usuarioGraba],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      res.json({ Status: 'Tipo Cliente creado' });
    }
  );
});

router.get('/:id', (req, res, next) => {
  const { idTipoCliente  } = req.params;
  conexion.query('SELECT * FROM tipocliente WHERE idTipoCliente  = ?', [idTipoCliente ], (err, rows, fields) => {
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
  const { idTipoCliente  } = req.params;
  const { Descripcion, fechaModifica, usuarioModifica} = req.body;
  conexion.query(
    'UPDATE tipocliente SET Descripcion = ?, fechaModifica = ?, usuarioModifica = ? WHERE idTipoCliente = ?',
    [Descripcion, fechaModifica, usuarioModifica, idTipoCliente ],
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
  const { idTipoCliente } = req.params;
  conexion.query('DELETE FROM tipocliente WHERE idTipoCliente = ?', [idTipoCliente], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: 'Tipo Cliente eliminado' });
    } else {
      console.log(err);
    }
  });
});



module.exports = router;
