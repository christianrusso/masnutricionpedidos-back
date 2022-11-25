const express = require('express');
const conexion = require('../database');
const router = express.Router();
const { format } = require('date-fns');

router.post('/crear', async (req, res, next) => {
  const {descripcion,DescBreve, unidadesFijasPallet, porcRelacionPallet,usuarioGraba } = req.body;
  const fechaCambiada = format(Date.parse(new Date()), 'yyyy-MM-dd');
  conexion.query(
    'INSERT INTO tipofamiliaproducto (descripcion,DescBreve, unidadesFijasPallet, porcRelacionPallet, fechaGraba,usuarioGraba) VALUES (?,?,?,?,?,?); ',
    [descripcion,DescBreve, unidadesFijasPallet, porcRelacionPallet, fechaCambiada,usuarioGraba],
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
  const { id  } = req.params;
  conexion.query('SELECT * FROM tipofamiliaproducto WHERE idTipoFamiliaProducto  = ?', [id ], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.put('/:id', (req, res) => {
  const { id  } = req.params;
  const { descripcion,DescBreve, unidadesFijasPallet, porcRelacionPallet,usuarioModifica } = req.body;
  const fechaCambiada = format(Date.parse(new Date()), 'yyyy-MM-dd');
  conexion.query(
    'UPDATE tipofamiliaproducto SET descripcion = ?, DescBreve = ?, unidadesFijasPallet = ?,porcRelacionPallet = ?, fechaModifica = ?, usuarioModifica = ? WHERE idTipoFamiliaProducto  = ?',
    [ descripcion,DescBreve, unidadesFijasPallet, porcRelacionPallet, fechaCambiada,usuarioModifica, id ],
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
  const { id  } = req.params;
  conexion.query('DELETE FROM tipofamiliaproducto WHERE idTipoFamiliaProducto  = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: 'Tipo Familia Producto eliminado' });
    } else {
      console.log(err);
    }
  });
});


module.exports = router;