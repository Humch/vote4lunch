import Sequelize from 'sequelize';

import {
  PlaceModel,
  VoteModel,
  VoiceModel,
  UserModel,
} from './models';

require('dotenv').config();

const development = process.env.ENV;

let config;

// add SSL support for production
if (development !== 'production') {
  config = {
    dialect: 'postgresql',
    logging: false,
  };
} else {
  config = {
    dialect: 'postgresql',
    dialectOptions: {
      ssl: true
    }
  };
}

export const sequelize = new Sequelize(process.env.POSTGRES_DB_URL, config);

// Model's initialization
export const Place = PlaceModel(sequelize, Sequelize);
export const Vote = VoteModel(sequelize, Sequelize);
export const Voice = VoiceModel(sequelize, Sequelize);
export const User = UserModel(sequelize, Sequelize);

// Relationship between tables
Voice.belongsTo(Vote);
Voice.belongsTo(Place);
Vote.belongsTo(User);

// M2M relationship between Vote and Place
const VotePlace = sequelize.define('vote_place', {});

Vote.belongsToMany(Place, { through: VotePlace });
Place.belongsToMany(Vote, { through: VotePlace });

// Database initialization
sequelize.sync()
  .then(() => {
    if (development === 'test') {
      return sequelize.close();
    }
    return false;
  });
