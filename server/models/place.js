export default (sequelize, type) => sequelize.define('place', {
  id: {
    type: type.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: type.STRING,
    allowNull: false,
  },
  lat: {
    type: type.FLOAT,
    allowNull: false
  },
  lng: {
    type: type.FLOAT,
    allowNull: false
  },
  type: {
    type: type.STRING,
    allowNull: false
  },
});
