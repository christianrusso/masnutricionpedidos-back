const express = require('express');
const conexion = require('../database');
const router = express.Router();
const { format } = require('date-fns');


router.post('/crear', async (req, res, next) => {
  console.log(req.body);
  const { 
    idEmpresa,
    NickName,
    Password,
    NombreApellido,
    CodInterno,
    Email,
    isAdmin,
    usuarioGraba,
  } = req.body;
  const fechaGraba = new Date();
  conexion.query(
    'INSERT INTO vendedor (idEmpresa, NickName, Password, NombreApellido, CodInterno, Email, isAdmin, fechaGraba, usuarioGraba ) VALUES (?,?,?,?,?,?,?,?,?); ',
    [
      idEmpresa,
      NickName,
      Password,
      NombreApellido,
      CodInterno,
      Email,
      isAdmin,
      fechaGraba,
      usuarioGraba,
    ],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      res.json({ Status: 'Vendedor creado' });
    }
  );
});

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    conexion.query(
      'SELECT * FROM vendedor WHERE idVendedor = ?',
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
  conexion.query('SELECT * FROM vendedor ORDER BY idVendedor DESC', (err, rows, fields) => {
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
    idEmpresa,
    NickName,
    Password,
    NombreApellido,
    CodInterno,
    Email,
    isAdmin,
    usuarioModifica
  } = req.body;
  const fechaCambiada = new Date();
  conexion.query(
    'UPDATE vendedor SET idEmpresa = ?, NickName = ?, Password = ?, NombreApellido = ?, CodInterno = ?, Email = ?, isAdmin = ?, fechaModifica = ?, usuarioModifica = ? WHERE idVendedor = ?',
    [
      idEmpresa,
      NickName,
      Password,
      NombreApellido,
      CodInterno,
      Email,
      isAdmin,
      fechaCambiada,
      usuarioModifica,
      id
    ],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Vendedor Actualizado' });
      } else {
        console.log(err);
      }
    }
  );
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    conexion.query('DELETE FROM vendedor WHERE idVendedor = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Vendedor eliminado' });
      } else {
        console.log(err);
      }
    });
});

module.exports = router;