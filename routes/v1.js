const express = require('express');
const router = express.Router();

const CompanyController = require('../controllers/CompanyController');
const ProductController = require('../controllers/ProductController');
const customMiddleware = require('../middleware/custom');

router.get('/', (req, res) => {
  res.json({ status: 'success', message: 'api v1 root' });
});

// CRUD companies
router.post('/companies', CompanyController.create);
router.get('/companies', CompanyController.getAll);

router.get(
  '/companies/:company_id',
  customMiddleware.company,
  CompanyController.get
);

router.put('/companies/:company_id', CompanyController.update);
router.delete('/companies/:company_id', CompanyController.remove);

// CRUD products

router.post('/products', ProductController.create);

module.exports = router;
