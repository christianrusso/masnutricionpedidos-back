const express = require('express');
const conexion = require('../database');
const router = express.Router();
const { format } = require('date-fns');


router.post('/crear', async (req, res, next) => {
  console.log(req.body);
  const { 
    NickName,
    CUIT,
    RazonSocial,
    Direccion,
    Email,
    Icono,
    usuarioGraba
  } = req.body;
  const fechaGraba = new Date();
  conexion.query(
    'INSERT INTO empresa (NickName, CUIT, RazonSocial, Direccion, Email, Icono, fechaGraba, usuarioGraba ) VALUES (?,?,?,?,?,?,?,?); ',
    [
      NickName,
      CUIT,
      RazonSocial,
      Direccion,
      Email,
      Icono,
      fechaGraba,
      usuarioGraba
    ],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      res.json({ Status: 'Empresa creada' });
    }
  );
});

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    conexion.query(
      'SELECT * FROM empresa WHERE idEmpresa = ?',
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
  conexion.query('SELECT * FROM empresa ORDER BY idEmpresa DESC', (err, rows, fields) => {
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
    NickName,
    CUIT,
    RazonSocial,
    Direccion,
    Email,
    Icono,
    usuarioModifica
  } = req.body;
  const fechaCambiada = format(Date.parse(new Date()), 'yyyy-MM-dd');
  conexion.query(
    'UPDATE empresa SET NickName = ?, CUIT = ?,  RazonSocial = ?,  Direccion = ?,  Email = ?,  Icono = ?, fechaModifica = ?, usuarioModifica = ? WHERE idEmpresa = ?',
    [
      NickName,
      CUIT,
      RazonSocial,
      Direccion,
      Email,
      Icono,
      fechaCambiada,
      usuarioModifica,
      id
    ],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Empresa Actualizada' });
      } else {
        console.log(err);
      }
    }
  );
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    conexion.query('DELETE FROM empresa WHERE idEmpresa = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Empresa eliminada' });
      } else {
        console.log(err);
      }
    });
});
  
module.exports = router;