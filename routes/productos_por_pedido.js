const express = require('express');
const conexion = require('../database');
const router = express.Router();
const { format } = require('date-fns');

router.post('/crear', async (req, res, next) => {
  console.log(req.body);
  const {
    idPedido,
    idProducto,
    idCategoria,
    codigo,
    descripcion,
    precio,
    cantidad,
    unidades_bulto,
    pallets,
    condicion,
    total,
    usuarioGraba
  } = req.body;
  const fechaGraba = new Date();
  conexion.query(
    'INSERT INTO productos_por_pedido (idPedido,idCategoria, cantidad, detalle,porcDescuentoItem,precioUnitario,importe,isEntregadoItem,fechaGraba, usuarioGraba) VALUES (?,?,?,?,?,?,?,?,?,?); ',
    [
      idPedido,
      idCategoria,
      cantidad,
      detalle,
      porcDescuentoItem,
      precioUnitario,
      importe,
      isEntregadoItem,
      fechaGraba,
      usuarioGraba
    ],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      res.json({ Status: 'Producto por pedido creado' });
    }
  );
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  conexion.query(
    'SELECT * FROM productos_por_pedido WHERE idPedido = ?',
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
  conexion.query('SELECT * FROM productos_por_pedido ORDER BY id DESC', (err, rows, fields) => {
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
    idPedido,
    idCategoria,
    cantidad,
    detalle,
    porcDescuentoItem,
    precioUnitario,
    importe,
    isEntregadoItem,
    usuarioModifica
  } = req.body;
  const fechaModifica = new Date();
  conexion.query(
    'UPDATE productos_por_pedido SET idPedido = ?, cantidad = ?, detalle = ?, porcDescuentoItem = ?, precioUnitario = ?, importe = ?, isEntregadoItem = ?, fechaModifica = ?, usuarioModifica = ? WHERE id = ?',
    [
      idPedido,
      idCategoria,
      cantidad,
      detalle,
      porcDescuentoItem,
      precioUnitario,
      importe,
      isEntregadoItem,
      fechaModifica,
      usuarioModifica,
      id
    ],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Producto por pedido Actualizado' });
      } else {
        console.log(err);
      }
    }
  );
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  //id = idPedido
  const { idProducto } = req.body;

  let totalProductoPorPedido;
  let totalPedido;
  //habria que obtener de alguna forma el fechaModifica y el usuarioModifica
  // para que no tire error en la segunda query

  conexion.query(
    'SELECT total FROM productos_por_pedido WHERE idPedido = ? AND idProducto = ?',
    [id, idProducto],
    (err, rows, fields) => {
      if (!err) {
        //aca obtenes el total del producto que queres eliminar
        // seria obtener el precio del producto * cantidad
        console.log("rows primer query");
        rows.forEach(element => {
          totalProductoPorPedido = element.total;
        });
        console.log(totalProductoPorPedido);
        //res.json(rows);
        //hay que cambiar el total del pedido,
        //habria que restarle el total de ese prodcucto que se quiere eliminar
        conexion.query('SELECT total FROM pedido WHERE idPedido = ?', [id], (err, rows, fields) => {
          if (!err) {
            //res.json(rows);
            console.log("rows segunda query");
            rows.forEach(element => {
              totalPedido = element.total - totalProductoPorPedido;;
            });
            console.log(totalPedido);
            // fechaModifica = ?, usuarioModifica = ?
            // fechaModifica, usuarioModifica,
            conexion.query(
              'UPDATE pedido SET total = ? WHERE idPedido = ?',
              [totalPedido, id],
              (err, rows, fields) => {
                if (err) {
                  console.log(err);
                } else {
                  conexion.query(
                    'DELETE FROM productos_por_pedido WHERE idPedido = ? AND idProducto = ?',
                    [id, idProducto],
                    (err, rows, fields) => {
                      if (!err) {
                        res.json({ Status: 'Producto por pedido eliminado' });
                      } else {
                        console.log(err);
                      }
                    }
                  );
                }
              }
            );
          } else {
            console.log(err);
          }
        });
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
