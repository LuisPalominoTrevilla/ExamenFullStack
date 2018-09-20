const express = require('express');
const router = express.Router();

const standardRouting = require('./pages/index');
const apiRouting = require('./api/api.js');

router.use('/api', apiRouting);
router.use('/', standardRouting);

module.exports = router;