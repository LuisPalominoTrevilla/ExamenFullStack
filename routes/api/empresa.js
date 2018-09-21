const express = require('express');
const router = express.Router();
const pool = require('../../db');

// Create Empresas
router.post('/cEmpresa', (req, res, next) => {
    const nombre_legal = req.body.legal_name;
    const nombre_comercial = (req.body.name)? req.body.name:"";
    const rfc = req.body.rfc;
    const tel = req.body.phone;
    pool.getConnection((err, con) => {
        if (err) throw err;
        let qry = "INSERT INTO company (nombre_legal, nombre_comercial, rfc, telefono, fecha_registro) VALUES ("+pool.escape(nombre_legal)+", "+pool.escape(nombre_comercial)+", "+pool.escape(rfc)+", "+pool.escape(tel)+", NOW())";
        con.query(qry, (err, result)=>{
            con.release();
            if (err) throw err;
            res.send(result);
        });
    });
});

// Read Empresas
router.get('/gEmpresas', (req, res, next)=>{
    pool.getConnection((err, con)=>{
        if (err) throw err;
        con.query("SELECT * FROM company;", (err, result)=> {
            con.release();
            if (err) throw err;
            res.json(result);
        });
    });
});
router.get('/gEmpresa/:id', (req, res, next)=>{
    const empresa_id = req.params.id;
    pool.getConnection((err, con)=>{
        if (err) throw err;
        con.query(`SELECT * FROM company WHERE id = ${empresa_id}`, (err, result)=> {
            con.release();
            if (err) throw err;
            res.json(result);
        });
    });
});

// Update Empresa
router.put('/uEmpresa', (req, res, next)=>{
    const empresa_id = req.body.id;
    const nombre_legal = req.body.legal_name;
    const nombre_comercial = (req.body.name)? req.body.name:"";
    const rfc = req.body.rfc;
    const tel = req.body.phone;
    pool.getConnection((err, con) => {
        if (err) throw err;
        let qry = `UPDATE company SET nombre_legal = ${pool.escape(nombre_legal)}, nombre_comercial = ${pool.escape(nombre_comercial)},
         rfc = ${pool.escape(rfc)}, telefono = ${pool.escape(tel)} WHERE id = ${pool.escape(empresa_id)}`;
        con.query(qry, (err, result)=>{
            con.release();
            if (err) throw err;
            res.send(result);
        });
    });
});

// Delete Empresa
router.delete('/dEmpresa/:id', (req, res, next)=>{
    const empresa_id = req.params.id;
    pool.getConnection((err, con) => {
        if (err) throw err;
        let qry = `DELETE FROM company WHERE id = ${pool.escape(empresa_id)}`;
        con.query(qry, (err, result)=>{
            con.release();
            if (err) throw err;
            res.send(result);
        });
    });
});

module.exports = router;