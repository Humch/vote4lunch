/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../server';
import { User } from '../../../sequelize';

// eslint-disable-next-line no-unused-vars
chai.use(chaiHttp);

describe('Test Users routes', () => {
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
        res.body.should.have.property('created').to.be.equal('error');
        done();
      });
  });
});
