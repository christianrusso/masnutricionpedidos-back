const express = require('express');
const conexion = require('../database');
const router = express.Router();




router.post('/crear', async (req, res, next) => {
  const { Descripcion, fechaGraba, usuarioGraba} = req.body;
  conexion.query(
    'INSERT INTO tiporeglacomercial (Descripcion, fechaGraba, usuarioGraba) VALUES (?, ?, ?); ',
    [Descripcion, fechaGraba, usuarioGraba],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      res.json({ Status: 'Tipo Regla Comercial creado' });
    }
  );
});

router.get('/:id', (req, res, next) => {
  const { idTipoReglaComercial    } = req.params;
  conexion.query('SELECT * FROM tiporeglacomercial WHERE idTipoReglaComercial = ?', [idTipoReglaComercial   ], (err, rows, fields) => {
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
  const { idTipoReglaComercial } = req.params;
  const { Descripcion, fechaModifica, usuarioModifica} = req.body;
  conexion.query(
    'UPDATE tiporeglacomercial SET Descripcion = ?, fechaModifica = ?, usuarioModifica = ? WHERE idTipoReglaComercial  = ?',
    [Descripcion, fechaModifica, usuarioModifica, idTipoReglaComercial  ],
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
  const { idTipoReglaComercial  } = req.params;
  conexion.query('DELETE FROM tiporeglacomercial WHERE idTipoReglaComercial = ?', [idTipoReglaComercial ], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: 'Tipo Regla Comercial eliminado' });
    } else {
      console.log(err);
    }
  });
});



module.exports = router;
