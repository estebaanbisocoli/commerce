require('../config/config');
require('../global_functions');
const { expect } = require('chai');
const request = require('request-json');
const mongoose = require('mongoose');

const { Company, Product, db } = require('../models');

const client = request.createClient(`${CONFIG.rootUrl}:${CONFIG.port}`);

const mockCompany = number => ({
  nombre_fantasia: `test-compay ${number !== 0 ? number : ''}`,
  quienes_somos: 'ejemplo de quines somos',
  que_hacemos: 'que hacemos',
  direccion: 'belgrano 1266',
  email: `test-email${number !== 0 ? number : ''}@test.com`,
  telefono: {
    movil: 1235678,
    fijo: 12346789
  }
});

//Antes de todo esperar la conexion a mongo
before(async () => {
  await new Promise(resolve => {
    db.once('open', () => {
      resolve();
    });
  });
});

//Despues drop companies
after(async () => {
  await db.collections.companies.remove({});
});

//rutas estaticas
describe('Default Routes', () => {
  it('Main route', async () => {
    await new Promise(resolve => {
      client.get('', (err, res, body) => {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);

        expect(body).to.eql({
          success: true,
          data: { path: '/', message: 'root' }
        });

        resolve();
      });
    });
  });

  it('404 route', async () => {
    await new Promise(resolve => {
      client.get(`/${Math.random()}`, (err, res, body) => {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(404);
        expect(body).to.eql({ success: false, error: 'Not Found' });
        resolve();
      });
    });
  });
});

// CRUD

//test si se limpia la base de datos
describe('test drop collection', () => {
  it('drop companies', async () => {
    await db.collections.companies.remove({});
    let [err, companies] = await to(Company.find({}));
    console.log(1);
    expect(err).to.equal(null);
    expect(companies).to.eql([]);
  });
});

describe('Company Routes', () => {
  //vaciar coleccion antes de cada test
  beforeEach(async () => {
    await db.collections.companies.remove({});
  });

  it('crear una compania POST /companies', async () => {
    //envia request para guardar
    await new Promise(resolve => {
      client.post('/v1/companies', mockCompany(0), async (err, res, body) => {
        if (err) throw e;
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200, body.error || null);
        // la busca para ver si se guardo
        let [error, company] = await to(Company.findById(res.body.data._id));

        expect(error).to.equal(null);
        expect(company._id.toString()).to.equal(res.body.data._id);
        expect(company.url_key).to.equal(NSTR(mockCompany(0).nombre_fantasia));
        resolve();
      });
    });
  });

  it('no deberia crear dos companias iguales POST /companies', async () => {
    //crea una compania para probar si se puede agregar otra igual
    let [, company] = await to(Company.create(mockCompany(1)));
    await new Promise(resolve => {
      client.post('/v1/companies', mockCompany(1), async (err, res, body) => {
        if (err) throw err;
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(400);
        let [, companies] = await to(Company.find({}));
        expect(companies.length).to.equal(1);
        expect(companies[0]._id).to.eql(company._id);
        resolve();
      });
    });
  });

  it('devolver todas las companias GET /companies', async function() {
    // aumenta el timeout porque tarda mas de 2000ms en guardar 10 companias
    this.timeout(50000);
    const newCompanies = [];
    for (let i = 0; i < 10; i++) {
      newCompanies.push(Company.create(mockCompany(i)));
      // await Company.create(mockCompany(i));
    }
    //guarda 10 companias
    await Promise.all(newCompanies);
    //obtiene todas las companias
    await new Promise((resolve, reject) => {
      client.get('/v1/companies', (err, res, body) => {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        expect(body.data.length).to.equal(10);
        resolve();
      });
    });
  });

  it('Devolver una compania GET /companies/url_key', async () => {
    let [, company] = await to(Company.create(mockCompany(0)));
    await new Promise(resolve => {
      client.get(
        `/v1/companies/${NSTR(mockCompany(0).nombre_fantasia)}`,
        (err, res, body) => {
          if (err) throw err;
          expect(err).to.equal(null);
          expect(res.statusCode).to.equal(200);
          expect(body.data._id).to.equal(company._id.toString());
          resolve();
        }
      );
    });
  });

  it('No encontrar compania GET /companies/url_key', async () => {
    await new Promise(resolve => {
      client.get(`/v1/companies/${Math.random()}`, (err, res, body) => {
        if (err) {
          throw err;
        }
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(400);
        expect(body.success).to.equal(false);
        expect(body.error).to.not.equal(null);
        resolve();
      });
    });
  });

  it('Actulizar compania PUT /companies/url_key', async () => {
    await Company.create(mockCompany(0));
    await new Promise(resolve => {
      client.put(
        `/v1/companies/${NSTR(mockCompany(0).nombre_fantasia)}`,
        { nombre_fantasia: 'New Name' },
        async (err, res, body) => {
          if (err) throw err;
          expect(err).to.equal(null);
          expect(res.statusCode).to.equal(200);
          expect(body.success).to.equal(true);
          expect(body.data.nombre_fantasia).to.equal('New Name');
          expect(body.data.url_key).to.equal('newname');
          let [, company] = await to(Company.findOne({ url_key: 'newname' }));
          expect(company).to.not.equal(null);
          expect(company._id.toString()).to.eql(body.data._id);
          resolve();
        }
      );
    });
  });

  it('Eliminar compania DEL /companies/url_key', async () => {
    await Company.create(mockCompany(0));
    await new Promise(resolve => {
      client.del(
        `/v1/companies/${NSTR(mockCompany(0).nombre_fantasia)}`,
        async (err, res, body) => {
          if (err) throw err;
          expect(err).to.equal(null);
          expect(res.statusCode).to.equal(200);
          expect(body.success).to.equal(true);
          let [, companies] = await to(Company.find({}));
          expect(companies.length).to.equal(0);
          expect(companies).to.eql([]);
          resolve();
        }
      );
    });
  });

  it('soportar requests', async function() {
    //TODO: vulnerable
    this.timeout(10000);
    const sendRequest = () => {
      return new Promise(resolve => {
        client.get('/v1/companies', (err, res, body) => {
          resolve();
        });
      });
    };
    const promises = [];

    for (let i = 0; i < 100; i++) {
      promises.push(sendRequest());
    }
    await Promise.all(promises);
  });
});
