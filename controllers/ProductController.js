const { Product } = require('../models');

const create = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  let err;
  let product;
  const body = req.body;

  [err, product] = await to(Product.create(body));

  if (err) {
    console.log(err);
    return ReE(res, err, 400);
  }

  return ReS(res, product, 200);
};

module.exports.create = create;

// const getAll = async (req, res) => {
//   res.setHeader('Content-Type', 'application/json');
//   let err;
//   let companies;

//   [err, companies] = await to(Product.find({}));
//   if (err) {
//     return ReE(res, err, 400);
//   }
//   return ReS(res, companies);
// };

// module.exports.getAll = getAll;

// const get = async (req, res) => {
//   res.setHeader('Content-Type', 'application/json');
//   const Product = req.Product;
//   return ReS(res, { Product });
// };

// module.exports.get = get;

// const update = async (req, res) => {
//   res.setHeader('Content-Type', 'application/json');
//   const Product_id = req.params.Product_id;
//   const fieldsToUpdate = req.body;
//   [err, Product] = await to(
//     Product.findByIdAndUpdate(Product_id, fieldsToUpdate, { new: true })
//   );

//   if (err) {
//     return ReE(res, err, 400);
//   }
//   return ReS(res, Product, 200);
// };

// module.exports.update = update;

// const remove = async (req, res) => {
//   res.setHeader('Content-Type', 'application/json');
//   const Product_id = req.params.Product_id;

//   [err, Product] = await to(Product.findByIdAndRemove(Product_id));

//   if (err) {
//     return ReE(res, err, 400);
//   }
//   return ReS(res, null, 204);
// };

// module.exports.remove = remove;
