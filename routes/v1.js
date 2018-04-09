const express = require('express');
const router = express.Router();

const CompanyController = require('../controllers/CompanyController');
const ProductController = require('../controllers/ProductController');

router.get('/', (req, res) => {
  res.json({ status: 'success', message: 'api v1 root' });
});

// CRUD companies
router.post('/companies', CompanyController.create);
router.get('/companies', CompanyController.getAll);

// url_key es el nombre de la empresa sin espacios y en miniscula
router.get('/companies/:url_key', CompanyController.get);
router.put('/companies/:url_key', CompanyController.update);
router.delete('/companies/:url_key', CompanyController.remove);

// CRUD products

router.post('/products', ProductController.create);
router.get('/products', ProductController.getAll);

router.get('/products/:product_id', ProductController.get);
router.put('/products/:product_id', ProductController.update);
router.delete('/products/:product_id', ProductController.remove);
module.exports = router;
