const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/Empresas', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../public/empresas.html'));
});

router.get('/Usuarios', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../public/usuarios.html'));
});

module.exports = router;