const { Company } = require('../models');

const create = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  let err;
  let company;
  const body = req.body;
  const url_key = body.nombre_fantasia
    .split(' ')
    .join('')
    .trim()
    .toLowerCase();

  [err, company] = await to(Company.create({ ...body, url_key }));

  if (err) {
    return ReE(res, err, 400);
  }

  return ReS(res, company, 200);
};

module.exports.create = create;

const getAll = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  let err;
  let companies;

  [err, companies] = await to(Company.find({}));
  if (err) {
    return ReE(res, err, 400);
  }
  return ReS(res, companies);
};

module.exports.getAll = getAll;

const get = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const url_key = req.params.url_key;

  let err;
  let company;

  [err, company] = await to(Company.findOne({ url_key }));
  company.find({}).then(res => {
    console.log(res);
  });
  if (err) {
    return ReE(res, err, 400);
  }
  return ReS(res, company, 200);
};

module.exports.get = get;

const update = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  //no hay data
  const url_key = req.params.url_key;
  const body = { ...req.body };
  if (body.nombre_fantasia) {
    body.url_key = NSTR(body.nombre_fantasia);
  }

  let err;
  let company;
  console.log(url_key);
  [err, company] = await to(
    Company.findOneAndUpdate({ url_key }, body, { new: true })
  );

  if (err) {
    return ReE(res, err, 400);
  }
  if (!company) {
    ReE(res, 'no se encontro empresa', 400);
  }
  return ReS(res, company, 200);
};

module.exports.update = update;

const remove = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const url_key = req.params.url_key;

  [err, company] = await to(Company.findOneAndRemove({ url_key }));

  if (err) {
    return ReE(res, err, 400);
  }
  if (!company) {
    return ReE(res, { messsage: 'no se pudo eliminar' }, 400);
  }

  const message = `La compania ${company.nombre_fantasia} fue eliminada`;
  return ReS(res, { message }, 200);
};

module.exports.remove = remove;
