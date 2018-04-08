require('./config/config');
require('./global_functions');

console.log('enviroment', CONFIG.app);

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const v1 = require('./routes/v1');

const app = express();

//express middleware

app.use(logger('dev'));
app.use(bodyParser.json());

//DATABASE
const models = require('./models');

app.use('/v1', v1);

app.get('/', (req, res) => {
  ReS(res, { path: '/', message: 'root' }, 200);
});

// Todas las urls que no matchean lo anterior pasan por este middleware
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  ReE(res, err, err.status);
});
module.exports = app;
