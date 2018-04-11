require('./config/config');
require('./global_functions');

console.log('enviroment', CONFIG.app);

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const path = require('path');

const v1 = require('./routes/v1');

const app = express();

//express middleware
app.use(favicon(path.join(__dirname, 'assets', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());

//DATABASE
const models = require('./models');

//Las rutas del API
app.use('/v1', v1);

//ROOT
app.get('/', (req, res) => {
  ReS(res, { path: '/', message: 'root' }, 200);
});

// Todas las urls que no matchean lo anterior pasan por este middleware
app.use((req, res) => {
  let err = new Error('Not Found');
  err.status = 404;
  ReE(res, err, err.status);
});

console.log(process.env.IP);
module.exports = app;
