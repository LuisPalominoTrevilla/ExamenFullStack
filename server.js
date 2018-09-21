const express = require('express');
const path = require('path');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, './public')));

const standardRouting = require('./routes/pages/index');
const apiRouting = require('./routes/api/api.js');

app.get('/', standardRouting);
app.use('/api', apiRouting);

app.listen(3000);