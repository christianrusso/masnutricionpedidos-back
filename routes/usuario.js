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
            const email = rows[0].email;
            const password = rows[0].password;
            // se crea el token
            const token = jwt.sign({ email, password }, 'secret_this_should_be_longer', {
              expiresIn: '1d'
            });
            res.json({
              token,
              expiresIn: 21600
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
