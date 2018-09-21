const express = require('express');
const router = express.Router();

router.get('/landing', (req, res, next) => {
    res.send("ALDNIGN");
});

module.exports = router;