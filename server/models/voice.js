export default (sequelize, type) => sequelize.define('voice', {
  id: {
    type: type.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pseudo: {
    type: type.STRING,
    allowNull: false
  },
  email: {
    type: type.STRING,
    allowNull: false
  },
});
