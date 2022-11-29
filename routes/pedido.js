const express = require('express');
const conexion = require('../database');
const router = express.Router();
const { format } = require('date-fns');


router.post('/crear', async (req, res, next) => {
  console.log(req.body);
  const { 
    isAnulado,
    isEnviadoxMail,
    isCobrado,
    isFinalizado,
    idCliente,
    idVendedor,
    idTipoReglaComercial,
    idAbono,
    idTipoCondicionesDeVenta,
    fechaPedido,
    porcDescuentoGeneral,
    descripcion,
    nroRemito,
    subtotal,
    impuestos,
    subtotal2,
    ivaInscriptoPorc,
    ivaInscripto,
    total,
    usuarioGraba,
  } = req.body;
  const fechaGraba = new Date();
  conexion.query(
    'INSERT INTO pedido (isAnulado, isEnviadoxMail, isCobrado, isFinalizado, idCliente, idVendedor, idTipoReglaComercial, idAbono, idTipoCondicionesDeVenta, fechaPedido, porcDescuentoGeneral, descripcion, nroRemito, subtotal, impuestos, subtotal2, ivaInscriptoPorc, ivaInscripto, total, fechaGraba, usuarioGraba ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?); ',
    [
      isAnulado,
      isEnviadoxMail,
      isCobrado,
      isFinalizado,
      idCliente,
      idVendedor,
      idTipoReglaComercial,
      idAbono,
      idTipoCondicionesDeVenta,
      fechaPedido,
      porcDescuentoGeneral,
      descripcion,
      nroRemito,
      subtotal,
      impuestos,
      subtotal2,
      ivaInscriptoPorc,
      ivaInscripto,
      total,
      fechaGraba,
      usuarioGraba,
    ],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      res.json({ Status: 'Pedido creado' });
    }
  );
});

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    conexion.query(
      'SELECT * FROM pedido WHERE idPedido = ?',
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
  conexion.query('SELECT * FROM pedido ORDER BY idPedido DESC', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const idParseado = parseInt(id)
  const { 
    isAnulado,
    isEnviadoxMail,
    isCobrado,
    isFinalizado,
    idCliente,
    idVendedor,
    idTipoReglaComercial,
    idAbono,
    idTipoCondicionesDeVenta,
    fechaPedido,
    porcDescuentoGeneral,
    descripcion,
    nroRemito,
    subtotal,
    impuestos,
    subtotal2,
    ivaInscriptoPorc,
    ivaInscripto,
    total,
    usuarioModifica
  } = req.body;
  const fechaCambiada = new Date();
  conexion.query(
    'UPDATE pedido SET isAnulado = ?, isEnviadoxMail = ?, isCobrado = ?, isFinalizado = ?, idCliente = ?, idVendedor = ?, idTipoReglaComercial = ?, idAbono = ?, idTipoCondicionesDeVenta = ?, fechaPedido = ?, porcDescuentoGeneral = ?, descripcion = ?, nroRemito = ?, subtotal = ?, impuestos = ?, subtotal2 = ?, ivaInscriptoPorc = ?, ivaInscripto = ?, total = ?, fechaModifica = ?, usuarioModifica = ? WHERE idPedido = ?',
    [
      isAnulado,
      isEnviadoxMail,
      isCobrado,
      isFinalizado,
      idCliente,
      idVendedor,
      idTipoReglaComercial,
      idAbono,
      idTipoCondicionesDeVenta,
      fechaPedido,
      porcDescuentoGeneral,
      descripcion,
      nroRemito,
      subtotal,
      impuestos,
      subtotal2,
      ivaInscriptoPorc,
      ivaInscripto,
      total,
      fechaCambiada,
      usuarioModifica,
      idParseado
    ],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Pedido Actualizado' });
      } else {
        console.log(err);
      }
    }
  );
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    conexion.query('DELETE FROM pedido WHERE idPedido = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Pedido eliminado' });
      } else {
        console.log(err);
      }
    });
});

module.exports = router;