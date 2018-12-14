/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import { User } from '../../sequelize';

// eslint-disable-next-line no-unused-vars
chai.use(chaiHttp);

const timeout = 10000;

describe('Test Users Routes', () => {
  beforeAll(() => {
    jest.setTimeout(timeout);
  });

  describe('add a user route - /api/user/add', () => {
    let user;

    beforeEach(() => {
      user = {
        pseudo: 'bob',
        email: 'bob@bob.com',
        password: 'fakepassword',
        password_repeat: 'fakepassword',
      };
    });

    afterAll(() => {
      User.findOne({
        where: {
          pseudo: 'bob'
        }
      })
        .then(obj => obj.destroy());
    });

    it('POST request, create a user must fail with differents passwords', (done) => {
      user.password_repeat = 'lapin';
      chai.request(server)
        .post('/api/user/add')
        .send(user)
        .end((err, res) => {
          expect(res.status).toBe(200);
          res.body.should.be.a('object');
          res.body.should.have.property('created').to.be.false;
          res.body.should.have.property('message').equal('Submitted passwords are differents');
          done();
        });
    });

    it('POST request, create a user must fail with missing parameters', (done) => {
      user = {
        email: 'bob@bob.com',
        password: 'fakepassword',
        password_repeat: 'fakepassword',
      };
      chai.request(server)
        .post('/api/user/add')
        .send(user)
        .end((err, res) => {
          expect(res.status).toBe(400);
          done();
        });
    });

    it('POST request, create a user', (done) => {
      chai.request(server)
        .post('/api/user/add')
        .send(user)
        .end((err, res) => {
          expect(res.status).toBe(200);
          res.body.should.have.property('created').to.be.true;
          done();
        });
    });

    it('POST request, create a user must fail, user already exists', (done) => {
      chai.request(server)
        .post('/api/user/add')
        .send(user)
        .end((err, res) => {
          expect(res.status).toBe(200);
          res.body.should.be.a('object');
          res.body.should.have.property('created').to.be.false;
          done();
        });
    });
  });

  describe('test if user exists route - /api/user/exists', () => {
    let user;

    beforeEach(() => {
      user = {
        pseudo: 'marc',
        email: 'marc@marc.com',
        password: 'fakepassword',
        password_repeat: 'fakepassword',
      };
    });

    afterAll(() => {
      User.findOne({
        where: {
          pseudo: 'marc'
        }
      })
        .then(obj => obj.destroy());
    });

    it('GET request, expect user with pseudo not exists', (done) => {
      chai.request(server)
        .get('/api/user/exists?pseudo=marc')
        .end((err, res) => {
          expect(res.status).toBe(200);
          res.body.should.be.a('object');
          res.body.should.have.property('exist').to.be.false;
          done();
        });
    });

    it('GET request, expect user with email not exists', (done) => {
      chai.request(server)
        .get('/api/user/exists?email=marc@marc.com')
        .end((err, res) => {
          expect(res.status).toBe(200);
          res.body.should.be.a('object');
          res.body.should.have.property('exist').to.be.false;
          done();
        });
    });

    it('GET request, without pseudo or email param', (done) => {
      chai.request(server)
        .get('/api/user/exists')
        .end((err, res) => {
          expect(res.status).toBe(400);
          done();
        });
    });

    it('GET request, expect user exists', (done) => {
      User
        .create({
          pseudo: user.pseudo,
          email: user.email,
          password: user.password,
        })
        .then(() => {
          chai.request(server)
            .get('/api/user/exists?pseudo=marc')
            .end((err, res) => {
              expect(res.status).toBe(200);
              res.body.should.be.a('object');
              res.body.should.have.property('exist').to.be.true;
              // done();
            });
          chai.request(server)
            .get('/api/user/exists?email=marc@marc.com')
            .end((err, res) => {
              expect(res.status).toBe(200);
              res.body.should.be.a('object');
              res.body.should.have.property('exist').to.be.true;
              done();
            });
        });
    });
  });
});
