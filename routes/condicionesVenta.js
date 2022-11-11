const express = require('express');
const conexion = require('../database');
const router = express.Router();

router.post('/crear', async (req, res, next) => {
  const {descripcion, fechaGraba,usuarioGraba } = req.body;
  conexion.query(
    'INSERT INTO tipocondicionesdeventa (descripcion, fechaGraba,usuarioGraba) VALUES (?,?,?); ',
    [descripcion, fechaGraba,usuarioGraba],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      res.json({ Status: 'Tipo Condiciones Venta creado' });
    }
  );
});

router.get('', (req, res, next) => {
  conexion.query('SELECT * FROM tipocondicionesdeventa ORDER BY idTipoCondicionesDeVenta DESC', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.get('/:id', (req, res, next) => {
  const { idTipoCondicionesDeVenta } = req.params;
  conexion.query('SELECT * FROM tipocondicionesdeventa WHERE idTipoCondicionesDeVenta = ?', [idTipoCondicionesDeVenta], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.put('/:id', (req, res) => {
  const { idTipoCondicionesDeVenta } = req.params;
  const { descripcion, fechaModifica,usuarioModifica } = req.body;
  conexion.query(
    'UPDATE tipocondicionesdeventa SET descripcion = ?, idTipoProducto = ?,idTipoFamiliaProducto = ?,unidadesFijasPallet = ?,porcRelacionPallet = ?,precioReferencia = ?, fechaModifica = ?, usuarioModifica = ? WHERE idTipoCondicionesDeVenta = ?',
    [descripcion, fechaModifica,usuarioModifica, idTipoCondicionesDeVenta],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Tipo Condiciones Venta Actualizado' });
      } else {
        console.log(err);
      }
    }
  );
});

router.delete('/:id', (req, res) => {
  const { idTipoCondicionesDeVenta } = req.params;
  conexion.query('DELETE FROM tipocondicionesdeventa WHERE idTipoCondicionesDeVenta = ?', [idTipoCondicionesDeVenta], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: 'Tipo Condiciones de Venta eliminado' });
    } else {
      console.log(err);
    }
  });
});



module.exports = router;