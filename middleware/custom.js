const { Company } = require('../models');

const company = async (req, res, next) => {
  let company_id, err, company;
  company_id = req.params.company_id;

  [err, company] = await to(Company.findById(company_id));
  if (err) {
    return ReE(res, err, 400);
  }
  if (!company) {
    return ReE(res, `No se encontro compania con id ${company_id}`);
  }

  req.company = company;
  next();
};

module.exports.company = company;
