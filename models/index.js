const mongoose = require('mongoose');
let models = {};

const Company = require('./company');
const Product = require('./product');

models = { Company, Product };

mongoose.Promise = global.Promise;

// agregar env variable
const MONGO_URI =
  CONFIG.app === 'dev'
    ? 'mongodb://admin:admin@ds139929.mlab.com:39929/commerce-dev'
    : CONFIG.dbUri;

mongoose.connect(MONGO_URI).catch(err => {
  console.log('No se puede conectar a mongo');
});

let db = mongoose.connection;

db.once('open', () => {
  console.log('conectado a mongo');
});

db.on('error', error => {
  console.log('error', error);
});

module.exports = { ...models, db };
