const {
    Router
} = require('express');
const router = Router()
const connection = require('../database')
const moment = require('moment')

//Listar clientes
router.get('/clientes', (req, res) => {
    connection.query("select id,nombre,apellido,email,date_format(fec_crea, '%d/%m/%Y') as fecCrea from clientes", (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

//Obtener cliente por id
router.get('/clientes/:id', (req, res) => {
    const {
        id
    } = req.params;
    connection.query("select id,nombre,apellido,email,date_format(fec_crea, '%d/%m/%Y') as fecCrea from clientes where id=?", [id], (err, rows) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
})

//Insertar cliente
router.post('/clientes', (req, res) => {
    const {
        nombre,
        apellido,
        email
    } = req.body;

    if (nombre && apellido && email) {

        connection.query("INSERT INTO clientes (nombre,apellido,email,fec_crea) VALUES (?,?,?,?)", [nombre, apellido, email, moment().format("YYYY-MM-DD")], (err) => {
            if (!err) {
                res.json({
                    estado: "Cliente ingresado con éxito"
                });
            } else {
                console.log(err);
                res.status(400).json({
                    estado: err.sqlMessage
                });
            }
        })
    } else {
        res.status(204).json();
    }
})

//Actualizar cliente
router.put('/clientes/:id', (req, res) => {
    const {
        id
    } = req.params;
    const {
        nombre,
        apellido,
        email
    } = req.body;

    if (id && nombre && apellido && email) {
        connection.query("update clientes set nombre=?,apellido=?,email=? where id=?", [nombre, apellido, email, id], (err) => {
            if (!err) {
                res.json({
                    estado: "Cliente actualizado con éxito"
                });
            } else {
                console.log(err);
            }
        })
    } else {
        res.status(204).json();
    }
})

//Eliminar cliente
router.delete('/clientes/:id', (req, res) => {
    const {
        id
    } = req.params;
    connection.query('delete from clientes where id = ?', [id], (err) => {
        if (!err) {
            res.json({
                status: 'Employee Deleted'
            });
        } else {
            console.log(err);
        }
    });
})

router.get('/clientes/buscar/:nomape', (req, res) => {
    const {
        nomape
    } = req.params;

    if (nomape) {
        connection.query("SELECT * from clientes WHERE concat(nombre,' ',apellido) like concat(?,'%') or concat(apellido,' ',nombre) like concat(?,'%')", [nomape, nomape], (err, rows) => {
            if (!err) {
                res.json(rows);
            } else {
                console.log(err);
            }
        })
    } else {
        res.status(204).json();
    }
})

module.exports = router