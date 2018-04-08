const mongoose = require('mongoose');
let models = {};

const Company = require('./company');
const Product = require('./product');

models = { Company, Product };

mongoose.Promise = global.Promise;

const MONGO_URI = CONFIG.dbUri;

mongoose.connect(MONGO_URI).catch(err => {
  console.log('No se puede conectar a mongo');
});

let db = mongoose.connection;

module.exports = db;

db.once('open', () => {
  console.log('conectado a mongo en el puerto', CONFIG.port);
});

db.on('error', error => {
  console.log('error', error);
});

module.exports = models;
