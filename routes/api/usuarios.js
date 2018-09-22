const express = require('express');
const router = express.Router();
const pool = require('../../db');
const bcrypt = require('bcrypt');

// Create Usuarios
router.post('/cUsuario', (req, res, next) => {
    const nombre = req.body.name;
    const apellido = req.body.last_name;
    const correo = req.body.mail;
    const password = req.body.password;
    const rol = req.body.rol;
    const company = req.body.company;
    pool.getConnection((err, con) => {
        if (err) throw err;
        bcrypt.hash(password, 10, (err, hash) => {
            let qry = `INSERT INTO user (nombre, apellido, correo, password, rol_id, company_id)
                        VALUES (${pool.escape(nombre)}, ${pool.escape(apellido)}, ${pool.escape(correo)},
                        ${pool.escape(hash)}, ${pool.escape(rol)}, ${pool.escape(company)})`;
            con.query(qry, (err, result)=>{
                con.release();
                if (err) throw err;
                res.send(result);
            }); 
        });
    });
});

// Read Usuarios
router.get('/gUsuarios', (req, res, next) => {
    pool.getConnection((err, con)=>{
        if (err) throw err;
        con.query(`SELECT u.id, nombre, apellido, 
        correo, password, r.description AS puesto, c.nombre_legal AS empresa 
        FROM user u JOIN role r ON u.rol_id = r.id JOIN company c ON u.company_id = c.id`, (err, result)=> {
            con.release();
            if (err) throw err;
            res.json(result);
        });
    });
});
router.get('/gUsuario/:id', (req, res, next) => {
    user_id = req.params.id;
    pool.getConnection((err, con)=>{
        if (err) throw err;
        con.query(`SELECT u.id, nombre, apellido, 
        correo, password, r.description AS puesto, c.nombre_legal AS empresa 
        FROM user u JOIN role r ON u.rol_id = r.id JOIN company c ON u.company_id = c.id WHERE u.id = ${user_id}`, (err, result)=> {
            con.release();
            if (err) throw err;
            res.json(result);
        });
    });
});

// Update Usuario
router.put('/uUsuario', (req, res, next)=>{
    const usuario_id = req.body.id;
    const nombre = req.body.name;
    const apellido = req.body.last_name;
    const correo = req.body.mail;
    const password = req.body.password;
    const rol = req.body.rol;
    const company = req.body.company;
    pool.getConnection((err, con) => {
        if (err) throw err;
        bcrypt.hash(password, 10, (err, hash) => {
            let qry = `UPDATE user SET nombre = ${pool.escape(nombre)}, apellido = ${pool.escape(apellido)},
            correo = ${pool.escape(correo)}, password = ${pool.escape(hash)},rol_id = ${pool.escape(rol)},
            company_id = ${pool.escape(company)} WHERE id = ${pool.escape(usuario_id)}`;
            console.log(qry);
            con.query(qry, (err, result)=>{
               con.release();
               if (err) throw err;
               res.send(result);
           }); 
        });
    });
});

// Delete Usuario
router.delete('/dUsuario/:id', (req, res, next) => {
    const usuario_id = req.params.id;
    pool.getConnection((err, con) => {
        if (err) throw err;
        let qry = `DELETE FROM user WHERE id = ${pool.escape(usuario_id)}`;
        con.query(qry, (err, result)=>{
            con.release();
            if (err) throw err;
            res.send(result);
        });
    });
});

module.exports = router;