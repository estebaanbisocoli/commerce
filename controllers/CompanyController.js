const { Company } = require('../models');

//TODO: arreglar todos los codigos de error
const create = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const body = req.body;
  try {
    let company = await Company.create(body);
    return ReS(res, company, 200);
  } catch (error) {
    return ReE(res, error, 400);
  }
};

module.exports.create = create;

const getAll = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    let companies = await Company.find({});
    return ReS(res, companies);
  } catch (error) {
    return ReE(res, err, 400);
  }
};

module.exports.getAll = getAll;

const get = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const url_key = req.params.url_key;
  try {
    let company = await Company.findOne({ url_key }).populate('productos');
    if (!company) {
      return ReE(res, 'No se encontro compania', 400);
    }
    return ReS(res, company, 200);
  } catch (error) {
    return ReE(res, error, 400);
  }
};

module.exports.get = get;

const update = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const url_key = req.params.url_key;
  const body = { ...req.body };

  body.nombre_fantasia && (body.url_key = NSTR(body.nombre_fantasia));

  try {
    let company = await Company.findOneAndUpdate(
      { url_key },
      { ...body },
      { new: true }
    );
    if (!company) {
      ReE(res, 'no se encontro empresa', 400);
    }
    return ReS(res, company, 200);
  } catch (error) {
    return ReE(res, error, 400);
  }
};

module.exports.update = update;

//TODO: Cuando se elimina una compania se debe pullear de cada array de companias de los productos
const remove = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const url_key = req.params.url_key;
  try {
    let company = await Company.findOneAndRemove({ url_key });
    if (!company) {
      return ReE(res, { messsage: 'no existe compania' }, 400);
    }

    const message = `La compania ${company.nombre_fantasia} fue eliminada`;
    return ReS(res, { message }, 200);
  } catch (error) {
    return ReE(res, err, 400);
  }
};

module.exports.remove = remove;
