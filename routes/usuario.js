const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { format } = require('date-fns');

const conexion = require('../database');

const router = express.Router();
router.post('/signup', async (req, res, next) => {
  const {
    idEmpresa,
    idGrupoAcceso,
    NickName,
    Password,
    NombreApellido,
    CodInterno,
    Email,
    isAdmin,
    isInactivo,
    isBorrado,
    usuarioGraba
  } = req.body;
  const passHash = await bcryptjs.hash(Password, 10);
  const fechaCambiada = format(Date.parse(new Date()), 'yyyy-MM-dd');
  conexion.query(
    'INSERT INTO usuario (idEmpresa, idGrupoAcceso, NickName, Password, NombreApellido, CodInterno,Email, isAdmin, isInactivo, isBorrado, fechaGraba, usuarioGraba) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); ',
    [
      idEmpresa,
      idGrupoAcceso,
      NickName,
      passHash,
      NombreApellido,
      CodInterno,
      Email,
      isAdmin,
      isInactivo,
      isBorrado,
      fechaCambiada,
      usuarioGraba
    ],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      res.json({ Status: 'Usuario registrado' });
    }
  );
});

router.post('/login', (req, res, next) => {
  try {
    const { NickName, Password } = req.body;
    //si no te manda email o pass
    if (!NickName || !Password) {
      res.json({ Status: 'Ingrese el email y/o password o esta inactivo' });
    } else {
      conexion.query(
        'SELECT * FROM usuario WHERE NickName = ?',
        [NickName],
        async (error, rows) => {
          if (rows.length == 0 || !(await bcryptjs.compare(Password, rows[0].Password))) {
            res.json({ Status: 'Email y/o password incorrectos' });
          } else {
            //inicio de sesión OK
            const idEmpresa = rows[0].idEmpresa;
            const idUsuario = rows[0].idUsuario;
            const idGrupoAcceso = rows[0].idGrupoAcceso;
            const NickName = rows[0].NickName;
            const NombreApellido = rows[0].NombreApellido;
            const CodInterno = rows[0].CodInterno;
            const Email = rows[0].Email;
            const isAdmin = rows[0].isAdmin;
            const isInactivo = rows[0].isInactivo;
            const isBorrado = rows[0].isBorrado;
            const fechaGraba = rows[0].fechaGraba;
            const usuarioGraba = rows[0].usuarioGraba;
            // se crea el token
            const token = jwt.sign(
              { NickName, NombreApellido, Email },
              'mas_nutricion?pedidos',
              {
                expiresIn: '1d'
              }
            );
            res.json({
              token,
              expiresIn: 21600,
              idEmpresa,
              idUsuario,
              idGrupoAcceso,
              NickName,
              NombreApellido,
              CodInterno,
              Email,
              isAdmin,
              isInactivo,
              isBorrado,
              fechaGraba,
              usuarioGraba
            });
          }
        }
      );
    }
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed'
    });
  }
});

router.get('', (req, res, next) => {
  conexion.query('SELECT * FROM usuario ORDER BY id DESC', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  conexion.query('SELECT * FROM usuario WHERE idUsuario = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  conexion.query('DELETE FROM usuario WHERE idUsuario = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: 'Usuario eliminado' });
    } else {
      console.log(err);
    }
  });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    idEmpresa,
    idGrupoAcceso,
    NickName,
    Password,
    NombreApellido,
    CodInterno,
    Email,
    isAdmin,
    isInactivo,
    isBorrado,
    usuarioModifica
  } = req.body;
  const passHash = await bcryptjs.hash(Password, 10);
  const fechaCambiada = format(Date.parse(new Date()), 'yyyy-MM-dd');
  conexion.query(
    'UPDATE usuario SET idEmpresa = ?, idGrupoAcceso =? , NickName =? , Password =? , NombreApellido =? , CodInterno = ?,Email =? , isAdmin =?, isInactivo =? , isBorrado =? , fechaModifica =?, usuarioModifica =?  WHERE id = ?',
    [
      idEmpresa,
      idGrupoAcceso,
      NickName,
      passHash,
      NombreApellido,
      CodInterno,
      Email,
      isAdmin,
      isInactivo,
      isBorrado,
      fechaCambiada,
      usuarioModifica,
      id
    ],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Usuario Actualizado' });
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
