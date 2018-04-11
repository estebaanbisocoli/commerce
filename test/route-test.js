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
before(done => {
  db.once('open', () => {
    done();
  });
});

after(async () => {
  await db.collections.companies.remove({});
});

describe('Default Routes', () => {
  it('Main route', done => {
    client.get('', (err, res, body) => {
      expect(err).to.equal(null);
      expect(res.statusCode).to.equal(200);

      expect(body).to.eql({
        success: true,
        data: { path: '/', message: 'root' }
      });

      done();
    });
  });

  it('404 route', done => {
    client.get(`/${Math.random()}`, (err, res, body) => {
      expect(err).to.equal(null);
      expect(res.statusCode).to.equal(404);
      expect(body).to.eql({ success: false, error: 'Not Found' });
      done();
    });
  });
});

// CRUD

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

  it('crear una compania POST /companies', done => {
    client.post('/v1/companies', mockCompany(0), async (err, res, body) => {
      expect(err).to.equal(null);
      expect(res.statusCode).to.equal(200, body.error || null);

      let [error, company] = await to(Company.findById(res.body.data._id));

      expect(error).to.equal(null);
      expect(company._id.toString()).to.equal(res.body.data._id);
      console.log(company.url_key);
      expect(company.url_key).to.equal(NSTR(mockCompany(0).nombre_fantasia));
      done();
    });
  });

  it('no deberia crear dos companias iguales POST /companies', done => {
    Company.create(mockCompany(1)).then(company => {
      client.post('/v1/companies', mockCompany(1), async (err, res, body) => {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(400);
        let [, companies] = await to(Company.find({}));
        expect(companies.length).to.equal(1);
        expect(companies[0]._id).to.eql(company._id);
        done();
      });
    });
  });

  // cuidado con la de prod!!
  it('devolver todas las companias GET /companies', function(done) {
    this.timeout(5000);
    const newCompanies = [];
    for (let i = 0; i < 10; i++) {
      newCompanies.push(mockCompany(i));
    }
    Company.create(newCompanies).then(res => {
      client.get('/v1/companies', (err, res, body) => {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        expect(body.data.length).to.equal(10);
        done();
      });
    });
  });

  it('Devolver una compania GET /companies/url_key', done => {
    Company.create(mockCompany(0)).then(company => {
      client.get(
        `/v1/companies/${NSTR(mockCompany(0).nombre_fantasia)}`,
        (err, res, body) => {
          expect(err).to.equal(null);
          expect(res.statusCode).to.equal(200);
          expect(body.data._id).to.equal(company._id.toString());
          done();
        }
      );
    });
  });

  it('No encontrar compania GET /companies/url_key', done => {
    client.get(`/v1/companies/${Math.random()}`, (err, res, body) => {
      expect(err).to.equal(null);
      expect(res.statusCode).to.equal(400);
      expect(body.success).to.equal(false);
      expect(body.error).to.not.equal(null);
      done();
    });
  });

  it('Actulizar compania PUT /companies/url_key', done => {
    Company.create(mockCompany(0)).then(company => {
      client.put(
        `/v1/companies/${NSTR(mockCompany(0).nombre_fantasia)}`,
        { nombre_fantasia: 'New Name' },
        async (err, res, body) => {
          expect(err).to.equal(null);
          expect(res.statusCode).to.equal(200);
          expect(body.success).to.equal(true);
          expect(body.data.nombre_fantasia).to.equal('New Name');
          expect(body.data.url_key).to.equal('newname');
          let [, company] = await to(Company.findOne({ url_key: 'newname' }));
          expect(company).to.not.equal(null);
          expect(company._id.toString()).to.eql(body.data._id);
          done();
        }
      );
    });
  });

  it('Eliminar compania DEL /companies/url_key', done => {
    Company.create(mockCompany(0)).then(success => {
      client.del(
        `/v1/companies/${NSTR(mockCompany(0).nombre_fantasia)}`,
        async (err, res, body) => {
          expect(err).to.equal(null);
          expect(res.statusCode).to.equal(200);
          expect(body.success).to.equal(true);
          let [, companies] = await to(Company.find({}));
          expect(companies.length).to.equal(0);
          expect(companies).to.eql([]);
          done();
        }
      );
    });
  });
});
