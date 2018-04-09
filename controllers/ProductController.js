const { Product } = require('../models');

const create = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const body = {};
  body = { ...req.body };

  let err;
  let product;

  [err, product] = await to(Product.create(body));

  if (err) {
    console.log(err);
    return ReE(res, err, 500);
  }

  return ReS(res, product, 200);
};

module.exports.create = create;

const getAll = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  let err;
  let products;

  // console.log(to);
  [err, products] = await to(Product.find({}));

  if (err) {
    return ReE(res, err, 500);
  }

  return ReS(res, products, 200);
};

module.exports.getAll = getAll;

const get = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const product_id = req.params.product_id;

  let err;
  let product;

  [err, product] = await to(Product.findById(product_id));

  if (err) {
    return ReE(res, err, 400);
  }

  if (!product) {
    return ReE(res, `No se encontro producto con id ${product_id}`, 400);
  }
  return ReS(res, product, 200);
};

module.exports.get = get;

const update = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const product_id = req.params.product_id;
  let body = {};
  body = { ...req.body };

  let err;
  let product;

  [err, product] = await to(
    Product.findByIdAndUpdate(product_id, body, { new: true })
  );

  if (err) {
    return ReE(res, err, 400);
  }

  if (!product) {
    return ReE(res, `No se encontro producto con id ${product_id}`, 400);
  }
  return ReS(res, product, 200);
};

module.exports.update = update;

const remove = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const product_id = req.params.product_id;

  [err, product] = await to(Product.findByIdAndRemove(product_id));

  if (err) {
    return ReE(res, err, 400);
  }
  if (!product) {
    return ReE(res, { messsage: 'no se pudo eliminar' }, 400);
  }

  const message = `El producto ${product._id} fue eliminada`;
  return ReS(res, { message }, 200);
};

module.exports.remove = remove;
