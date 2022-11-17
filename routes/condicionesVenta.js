const express = require('express');
const conexion = require('../database');
const router = express.Router();
const { format } = require('date-fns');

router.post('/crear', async (req, res, next) => {
  const {descripcion, usuarioGraba } = req.body;
  const fechaCambiada = format(Date.parse(new Date()), 'yyyy-MM-dd');
  conexion.query(
    'INSERT INTO tipocondicionesdeventa (descripcion, fechaGraba,usuarioGraba) VALUES (?,?,?); ',
    [descripcion, fechaCambiada,usuarioGraba],
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
  const { id } = req.params;
  conexion.query('SELECT * FROM tipocondicionesdeventa WHERE idTipoCondicionesDeVenta = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { descripcion, usuarioGraba, usuarioModifica } = req.body;
  const fechaCambiada = format(Date.parse(new Date()), 'yyyy-MM-dd');
  conexion.query(
    'UPDATE tipocondicionesdeventa SET descripcion = ?, usuarioGraba = ?,fechaModifica = ?, usuarioModifica = ? WHERE idTipoCondicionesDeVenta = ?',
    [descripcion, usuarioGraba, fechaCambiada,usuarioModifica, id],
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
  const { id } = req.params;
  conexion.query('DELETE FROM tipocondicionesdeventa WHERE idTipoCondicionesDeVenta = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: 'Tipo Condiciones de Venta eliminado' });
    } else {
      console.log(err);
    }
  });
});



module.exports = router;