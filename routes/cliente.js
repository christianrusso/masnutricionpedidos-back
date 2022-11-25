const express = require('express');
const conexion = require('../database');
const router = express.Router();
const { format } = require('date-fns');

router.post('/crear', async (req, res, next) => {
  console.log(req.body);
  const { 
    idTipoCliente, 
    idTipoCanal, 
    razonSocial, 
    nombreFantasia, 
    idTipoIVA, 
    CUIT, 
    fechaAlta,
    score,
    aniosActividad,
    montoCredito,
    idVendedorAsignado,
    calle,
    calle1,
    calle2,
    nroPuerta,
    piso,
    dpto,
    idLocalidad,
    idProvincia,
    CP,
    horarioAtencion,
    horarioCobranza,
    isBorrado,
    web,
    usuarioGraba 
  } = req.body;
  const fechaGraba = new Date();
  conexion.query(
    'INSERT INTO cliente (idTipoCliente, idTipoCanal, razonSocial, nombreFantasia, idTipoIVA, CUIT, fechaAlta,score,aniosActividad,montoCredito,idVendedorAsignado,calle,calle1,calle2,nroPuerta,piso,dpto,idLocalidad,idProvincia,CP,horarioAtencion,horarioCobranza,isBorrado,web,fechaGraba,usuarioGraba ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?); ',
    [
      idTipoCliente, 
      idTipoCanal, 
      razonSocial, 
      nombreFantasia, 
      idTipoIVA, 
      CUIT, 
      fechaAlta,
      score,
      aniosActividad,
      montoCredito,
      idVendedorAsignado,
      calle,
      calle1,
      calle2,
      nroPuerta,
      piso,
      dpto,
      idLocalidad,
      idProvincia,
      CP,
      horarioAtencion,
      horarioCobranza,
      isBorrado,
      web,
      fechaGraba,
      usuarioGraba 
    ],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      res.json({ Status: 'Cliente creado' });
    }
  );
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  conexion.query(
    'SELECT * FROM cliente WHERE idCliente = ?',
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
  conexion.query('SELECT * FROM cliente ORDER BY idCliente DESC', (err, rows, fields) => {
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
    idTipoCliente, 
    idTipoCanal, 
    razonSocial, 
    nombreFantasia, 
    idTipoIVA, 
    CUIT, 
    fechaAlta,
    score,
    aniosActividad,
    montoCredito,
    idVendedorAsignado,
    calle,
    calle1,
    calle2,
    nroPuerta,
    piso,
    dpto,
    idLocalidad,
    idProvincia,
    CP,
    horarioAtencion,
    horarioCobranza,
    isBorrado,
    web,
    usuarioModifica
  } = req.body;
  const fechaCambiada = format(Date.parse(new Date()), 'yyyy-MM-dd');
  conexion.query(
    'UPDATE cliente SET idTipoCliente = ?,  idTipoCanal = ?,  razonSocial = ?,  nombreFantasia = ?,  idTipoIVA = ?,  CUIT = ?,  fechaAlta = ?, score = ?, aniosActividad = ?, montoCredito = ?, idVendedorAsignado = ?, calle = ?, calle1 = ?, calle2 = ?, nroPuerta = ?, piso = ?, dpto = ?, idLocalidad = ?, idProvincia = ?, CP = ?, horarioAtencion = ?, horarioCobranza = ?, isBorrado = ?, web = ? ,fechaModifica = ?, usuarioModifica = ? WHERE idCliente = ?',
    [
      idTipoCliente, 
      idTipoCanal, 
      razonSocial, 
      nombreFantasia, 
      idTipoIVA, 
      CUIT, 
      fechaAlta,
      score,
      aniosActividad,
      montoCredito,
      idVendedorAsignado,
      calle,
      calle1,
      calle2,
      nroPuerta,
      piso,
      dpto,
      idLocalidad,
      idProvincia,
      CP,
      horarioAtencion,
      horarioCobranza,
      isBorrado,
      web,
      fechaCambiada,
      usuarioModifica,
      id
    ],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Cliente Actualizado' });
      } else {
        console.log(err);
      }
    }
  );
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  conexion.query('DELETE FROM cliente WHERE idCliente = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: 'Cliente eliminado' });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
