const express = require('express');
const conexion = require('../database');
const router = express.Router();

router.post('/crear', async (req, res, next) => {
  const {descripcion,DescBreve, unidadesFijasPallet, porcRelacionPallet, fechaGraba,usuarioGraba } = req.body;
  conexion.query(
    'INSERT INTO tipofamiliaproducto (descripcion,DescBreve, unidadesFijasPallet, porcRelacionPallet, fechaGraba,usuarioGraba) VALUES (?,?,?,?,?,?); ',
    [descripcion,DescBreve, unidadesFijasPallet, porcRelacionPallet, fechaGraba,usuarioGraba],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      res.json({ Status: 'Tipo Familia Producto creado' });
    }
  );
});

router.get('', (req, res, next) => {
  conexion.query('SELECT * FROM tipofamiliaproducto ORDER BY idTipoFamiliaProducto  DESC', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.get('/:id', (req, res, next) => {
  const { idTipoFamiliaProducto  } = req.params;
  conexion.query('SELECT * FROM tipofamiliaproducto WHERE idTipoFamiliaProducto  = ?', [idTipoFamiliaProducto ], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.put('/:id', (req, res) => {
  const { idTipoFamiliaProducto  } = req.params;
  const { descripcion,DescBreve, unidadesFijasPallet, porcRelacionPallet, fechaModifica,usuarioModifica } = req.body;
  conexion.query(
    'UPDATE tipofamiliaproducto SET descripcion = ?, DescBreve = ?, unidadesFijasPallet = ?,porcRelacionPallet = ?, fechaModifica = ?, usuarioModifica = ? WHERE idTipoFamiliaProducto  = ?',
    [ descripcion,DescBreve, unidadesFijasPallet, porcRelacionPallet, fechaModifica,usuarioModifica, idTipoFamiliaProducto ],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Tipo Familia Producto Actualizado' });
      } else {
        console.log(err);
      }
    }
  );
});

router.delete('/:id', (req, res) => {
  const { idTipoFamiliaProducto  } = req.params;
  conexion.query('DELETE FROM tipofamiliaproducto WHERE idTipoFamiliaProducto  = ?', [idTipoFamiliaProducto], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: 'Tipo Familia Producto eliminado' });
    } else {
      console.log(err);
    }
  });
});


module.exports = router;