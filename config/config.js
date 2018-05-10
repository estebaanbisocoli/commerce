require('dotenv').config();

//crear una variable config para que pueda ser utiliza en toda la aplicacion
CONFIG = {};

CONFIG.app = process.env.APP;
CONFIG.port = process.env.PORT;
console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);

//arreglar esto
CONFIG.dbUri =
  CONFIG.app == 'prod'
    ? process.env.DB_URI
    : 'mongodb://admin:admin@ds139929.mlab.com:39929/commerce-dev';

CONFIG.rootUrl = 'http://localhost';

module.exports = CONFIG;
