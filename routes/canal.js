const express = require('express');
const conexion = require('../database');
const router = express.Router();
const { format } = require('date-fns');

router.post('/crear', async (req, res, next) => {
  console.log(req.body);
  const {Descripcion,usuarioGraba } = req.body;
  // let fechaHoy = new Date();
  // const options = {
  //   day: 'numeric',
  //   month: 'numeric',
  //   year: 'numeric',
  //   hour: 'numeric',
  //   minute: 'numeric',
  //   second: 'numeric'
  // };
  // fechaHoy = fechaHoy.toLocaleString('es-AR', options)
  // console.log(fechaHoy);
  const fechaCambiada = format(Date.parse(new Date()), 'yyyy-MM-dd');
  conexion.query(
    'INSERT INTO tipocanal (Descripcion, fechaGraba,usuarioGraba) VALUES (?,?,?); ',
    [Descripcion, fechaCambiada, usuarioGraba],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      res.json({ Status: 'Tipo Canal creado' });
    }
  );
});

router.get('', (req, res, next) => {
  conexion.query('SELECT * FROM tipocanal ORDER BY idTipoCanal DESC', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  conexion.query('SELECT * FROM tipocanal WHERE idTipoCanal = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { Descripcion, usuarioModifica} = req.body;
  //mismo problema que en post  
  const fechaCambiada = format(Date.parse(new Date()), 'yyyy-MM-dd');
  conexion.query(
    'UPDATE tipocanal SET Descripcion = ?, fechaModifica = ?,usuarioModifica = ? WHERE idTipoCanal = ?',
    [ Descripcion, fechaCambiada,usuarioModifica, id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Tipo Canal Actualizado' });
      } else {
        console.log(err);
      }
    }
  );
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  conexion.query('DELETE FROM tipocanal WHERE idTipoCanal = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: 'Tipo Canal eliminado' });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;