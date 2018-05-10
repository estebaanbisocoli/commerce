require('./config/config');
require('./global_functions');
console.log(process.env.NODE_ENV);
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const path = require('path');
const cors = require('cors');

const v1 = require('./routes/v1');

const app = express();

//express middleware
// app.use(express.static(path.join(__dirname, 'client', 'build')));

app.use(cors());

app.use(favicon(path.join(__dirname, 'assets', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());

//DATABASE
const models = require('./models');

//Las rutas del API
app.use('/v1', v1);

// ROOT;
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// });
app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/index.html`));
});

// Todas las urls que no matchean lo anterior pasan por este middleware
app.use((req, res) => {
  let err = new Error('Not Found');
  err.status = 404;
  ReE(res, err, err.status);
});

module.exports = app;
