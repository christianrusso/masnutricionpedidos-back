const express = require('express');
const conexion = require('../database');
const router = express.Router();
const { format } = require('date-fns');

router.post('/crear', async (req, res, next) => {
  console.log(req.body);
  const {
    isCliente,
    isDetalleOperacion,
    isDetallePedido,
    isEmail,
    isEmpresa,
    isGrupoAcceso,
    isGrupoAccesoPermiso,
    isLocalidad,
    isPedido,
    isProducto,
    isProvincia,
    isTelefono,
    isVendedor, 
    usuarioGraba
    } = req.body;
  const fechaGraba = new Date();
  conexion.query(
    'INSERT INTO rol (isCliente, isDetalleOperacion, isDetallePedido, isEmail, isEmpresa, isGrupoAcceso, isGrupoAccesoPermiso, isLocalidad, isPedido, isProducto, isProvincia, isTelefono, isVendedor, fechaGraba, usuarioGraba) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?); ',
    [
        isCliente,
        isDetalleOperacion,
        isDetallePedido,
        isEmail,
        isEmpresa,
        isGrupoAcceso,
        isGrupoAccesoPermiso,
        isLocalidad,
        isPedido,
        isProducto,
        isProvincia,
        isTelefono,
        isVendedor,
        fechaGraba,
        usuarioGraba
    ],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      res.json({ Status: 'Rol creado' });
    }
  );
});

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    conexion.query(
      'SELECT * FROM rol WHERE idUsuario = ?',
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
  conexion.query('SELECT * FROM rol ORDER BY idRol DESC', (err, rows, fields) => {
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
    isCliente,
    isDetalleOperacion,
    isDetallePedido,
    isEmail,
    isEmpresa,
    isGrupoAcceso,
    isGrupoAccesoPermiso,
    isLocalidad,
    isPedido,
    isProducto,
    isProvincia,
    isTelefono,
    isVendedor, 
    usuarioGraba
    } = req.body;
  const fechaGraba = new Date();
  conexion.query(
    'UPDATE rol SET isCliente = ?, isDetalleOperacion = ?,isDetallePedido = ?, isEmail = ?, isEmpresa = ?, isGrupoAcceso = ?, isGrupoAccesoPermiso = ?, isLocalidad = ?, isPedido = ?, isProducto = ?, isProvincia = ?, isTelefono = ?, isVendedor = ?, fechaGraba = ?, usuarioGraba = ? WHERE idUsuario = ?',
    [
        isCliente,
        isDetalleOperacion,
        isDetallePedido,
        isEmail,
        isEmpresa,
        isGrupoAcceso,
        isGrupoAccesoPermiso,
        isLocalidad,
        isPedido,
        isProducto,
        isProvincia,
        isTelefono,
        isVendedor,
        fechaGraba, 
        usuarioGraba, 
        id
    ],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Rol Actualizado' });
      } else {
        console.log(err);
      }
    }
  );
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    conexion.query('DELETE FROM rol WHERE idUsuario = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Rol eliminado' });
      } else {
        console.log(err);
      }
    });
});

module.exports = router;