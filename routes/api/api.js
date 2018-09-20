const express = require('express');
const router = express.Router();
const pool = require('../../db');

router.get('/', (req, res, next) => {
    res.send("API is alive");
});

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

module.exports = router;