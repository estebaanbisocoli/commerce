require('dotenv').config();

//crear una variable config para que pueda ser utiliza en toda la aplicacion
CONFIG = {};

CONFIG.app = process.env.APP;
CONFIG.port = process.env.port;
CONFIG.dbUri = process.env.DB_URI;
