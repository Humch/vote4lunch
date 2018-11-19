import { sequelize } from './sequelize';

// Database initialization
sequelize.sync()
  .then(() => sequelize.close());
