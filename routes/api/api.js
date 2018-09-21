const express = require('express');
const router = express.Router();
const pool = require('../../db');

const routeEmpresas = require('./empresa');
const routeUsuarios = require('./usuarios');

router.get('/', (req, res, next) => {
    res.send("API is alive");
});

// Get roles
router.get('/gRoles', (req, res, next) => {
    pool.getConnection((err, con)=>{
        if (err) throw err;
        con.query("SELECT * FROM role;", (err, result)=> {
            con.release();
            if (err) throw err;
            res.json(result);
        });
    });
});

router.use(routeEmpresas);
router.use(routeUsuarios);

module.exports = router;