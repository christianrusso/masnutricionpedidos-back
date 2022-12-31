const express = require('express');
const conexion = require('../database');
const router = express.Router();
const { format } = require('date-fns');

router.post('/crear', async (req, res, next) => {
  console.log(req.body);
  const {descripcion, usuarioGraba} = req.body;
  const fechaGraba = new Date();
  conexion.query(
    'INSERT INTO categoriaproducto (descripcion,fechaGraba, usuarioGraba) VALUES (?,?,?,?); ',
    [descripcion,fechaGraba, usuarioGraba],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      res.json({ Status: 'Categoria de Producto creada' });
    }
  );
});

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    conexion.query(
      'SELECT * FROM categoriaproducto WHERE idCategoriaProducto = ?',
      [id],
      (err, rows, fields) => {
        if (!err) {
          res.json(rows);
        } else {
          console.log(err);
        }
      }
    );
  });
  
router.get('', (req, res, next) => {
  conexion.query('SELECT * FROM categoriaproducto ORDER BY idCategoriaProducto DESC', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { descripcion, usuarioModifica } = req.body;
  const fechaModifica = new Date();
  conexion.query(
    'UPDATE categoriaproducto SET descripcion = ?, fechaModifica = ?, usuarioModifica = ? WHERE idCategoriaProducto = ?',
    [descripcion,fechaModifica, usuarioModifica, id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Categoria de Producto Actualizada' });
      } else {
        console.log(err);
      }
    }
  );
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    conexion.query('DELETE FROM categoriaproducto WHERE idCategoriaProducto = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Categoria de Producto eliminada' });
      } else {
        console.log(err);
      }
    });
});

module.exports = router;