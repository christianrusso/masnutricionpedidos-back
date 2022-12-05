const express = require('express');
const conexion = require('../database');
const router = express.Router();
const { format } = require('date-fns');

router.post('/crear', async (req, res, next) => {
  console.log(req.body);
  const {
    descripcion,
    idTipoProducto,
    idTipoFamiliaProducto,
    unidadesFijasPallet,
    porcRelacionPallet,
    precioReferencia,
    usuarioGraba
  } = req.body;
  const fechaGraba = format(Date.parse(new Date()), 'yyyy-MM-dd');
  conexion.query(
    'INSERT INTO producto (descripcion, idTipoProducto, idTipoFamiliaProducto, unidadesFijasPallet, porcRelacionPallet, precioReferencia, fechaGraba, usuarioGraba ) VALUES (?,?,?,?,?,?,?,?); ',
    [
      descripcion,
      idTipoProducto,
      idTipoFamiliaProducto,
      unidadesFijasPallet,
      porcRelacionPallet,
      precioReferencia,
      fechaGraba,
      usuarioGraba
    ],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      res.json({ Status: 'Producto creado' });
    }
  );
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  conexion.query('SELECT * FROM producto WHERE id_producto = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.get('', (req, res, next) => {
  conexion.query('SELECT * FROM producto ORDER BY id_producto DESC', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const {
    descripcion,
    idTipoProducto,
    idTipoFamiliaProducto,
    unidadesFijasPallet,
    porcRelacionPallet,
    precioReferencia,
    usuarioModifica
  } = req.body;
  const fechaCambiada = format(Date.parse(new Date()), 'yyyy-MM-dd');
  conexion.query(
    'UPDATE producto SET descripcion = ?, idTipoProducto = ?,  idTipoFamiliaProducto = ?,  unidadesFijasPallet = ?,  precioReferencia = ?, fechaModifica = ?, usuarioModifica = ? WHERE id_producto = ?',
    [
      descripcion,
      idTipoProducto,
      idTipoFamiliaProducto,
      unidadesFijasPallet,
      porcRelacionPallet,
      precioReferencia,
      fechaCambiada,
      usuarioModifica,
      id
    ],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Producto Actualizado' });
      } else {
        console.log(err);
      }
    }
  );
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  conexion.query('DELETE FROM producto WHERE id_producto = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: 'Producto eliminado' });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
