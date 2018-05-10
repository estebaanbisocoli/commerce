const multer = require('multer');
const memoryStorage = require('multer').memoryStorage;
const m = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  }
});

module.exports = m;
