import bcrypt from 'bcrypt';

const UserModel = (sequelize, type) => {
  const User = sequelize.define('user', {
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
  });

  User.prototype.validPassword = (password, testedPassword) => bcrypt.compareSync(
    password,
    testedPassword
  );

  return User;
};

export default UserModel;
