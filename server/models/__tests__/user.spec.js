/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { expect } from 'chai';

import { User } from '../../sequelize';

describe('Test User Model', () => {
  it('returns the user model', () => {
    expect(User).to.be.ok;
  });

  it('build instance of User', () => {
    const instance = User.build({ pseudo: 'bob', email: 'bob@bob.com', password: 'fakepassword' });

    expect(instance).to.be.instanceOf(User);
    expect(instance._modelOptions.hooks).to.have.property('beforeCreate');
  });
});

describe('Test User Model', () => {
  afterAll(() => {
    User.findOne({
      where: {
        pseudo: 'bob'
      }
    })
      .then(user => user.destroy());
  });

  it('create instance of user', () => User
    .create({ pseudo: 'bob', email: 'bob@bob.com', password: 'fakepassword' })
    .then(user => expect(user).to.be.instanceOf(User)));

  it('test password', () => User.findOne({
    where: {
      pseudo: 'bob'
    }
  })
    .then((user) => {
      const validPassword = user.validPassword('fakepassword', user.dataValues.password);
      expect(validPassword).to.be.true;
    }));
});
