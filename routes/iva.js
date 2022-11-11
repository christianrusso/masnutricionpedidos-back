const express = require('express');
const conexion = require('../database');
const router = express.Router();

router.post('/crear', async (req, res, next) => {
  const {Descripcion,DescBreve, fechaGraba,usuarioGraba } = req.body;
  conexion.query(
    'INSERT INTO tipoiva (Descripcion,DescBreve, fechaGraba,usuarioGraba ) VALUES (?,?,?,?); ',
    [Descripcion,DescBreve, fechaGraba,usuarioGraba],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      res.json({ Status: 'Tipo IVA creado' });
    }
  );
});

router.get('', (req, res, next) => {
  conexion.query('SELECT * FROM tipoiva ORDER BY idTipoIVA  DESC', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.get('/:id', (req, res, next) => {
  const { idTipoIVA   } = req.params;
  conexion.query('SELECT * FROM tipoiva WHERE idTipoIVA   = ?', [idTipoIVA ], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.put('/:id', (req, res) => {
  const { idTipoIVA   } = req.params;
  const { Descripcion,DescBreve, fechaModifica,usuarioModifica } = req.body;
  conexion.query(
    'UPDATE  tipoiva SET Descripcion = ?, DescBreve = ?, fechaModifica = ?, usuarioModifica = ? WHERE idTipoIVA = ?',
    [ Descripcion,DescBreve, fechaModifica,usuarioModifica, idTipoIVA  ],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Tipo IVA Actualizado' });
      } else {
        console.log(err);
      }
    }
  );
});

router.delete('/:id', (req, res) => {
  const { idTipoIVA  } = req.params;
  conexion.query('DELETE FROM tipoiva WHERE idTipoIVA  = ?', [idTipoIVA], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: 'Tipo IVA eliminado' });
    } else {
      console.log(err);
    }
  });
});


module.exports = router;