import bcrypt from 'bcrypt';

export default (sequelize, type) => sequelize.define('user', {
  id: {
    type: type.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pseudo: {
    type: type.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: type.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: type.STRING,
    allowNull: false
  }
}, {
  hooks: {
    beforeCreate: (user) => {
      const salt = bcrypt.genSaltSync();
      // eslint-disable-next-line no-param-reassign
      user.password = bcrypt.hashSync(user.password, salt);
    }
  },
  instanceMethods: {
    validPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
  }
});
