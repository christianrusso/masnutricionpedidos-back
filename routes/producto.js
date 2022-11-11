const express = require('express');
const conexion = require('../database');
const router = express.Router();

router.post('/crear', async (req, res, next) => {
  const {descripcion,DescBreve, fechaGraba,usuarioGraba } = req.body;
  conexion.query(
    'INSERT INTO tipoproducto (descripcion,DescBreve, fechaGraba,usuarioGraba ) VALUES (?,?,?,?); ',
    [descripcion,DescBreve, fechaGraba,usuarioGraba],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      res.json({ Status: 'Tipo Producto creado' });
    }
  );
});

router.get('', (req, res, next) => {
  conexion.query('SELECT * FROM tipoproducto ORDER BY idTipoProducto  DESC', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.get('/:id', (req, res, next) => {
  const { idTipoProducto   } = req.params;
  conexion.query('SELECT * FROM tipoproducto WHERE idTipoProducto   = ?', [idTipoProducto ], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.put('/:id', (req, res) => {
  const { idTipoProducto   } = req.params;
  const { descripcion,DescBreve, fechaModifica,usuarioModifica } = req.body;
  conexion.query(
    'UPDATE  tipoproducto SET descripcion = ?, DescBreve = ?, fechaModifica = ?, usuarioModifica = ? WHERE idTipoProducto = ?',
    [ descripcion,DescBreve, fechaModifica,usuarioModifica, idTipoProducto  ],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Tipo Producto Actualizado' });
      } else {
        console.log(err);
      }
    }
  );
});

router.delete('/:id', (req, res) => {
  const { idTipoProducto  } = req.params;
  conexion.query('DELETE FROM tipoproducto WHERE idTipoProducto  = ?', [idTipoProducto], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: 'Tipo Producto eliminado' });
    } else {
      console.log(err);
    }
  });
});


module.exports = router;